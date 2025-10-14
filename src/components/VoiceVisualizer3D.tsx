"use client";
import * as React from "react";
import * as THREE from "three";

type Props = {
  className?: string;
  bars?: number; // number of radial bars
};

export default function VoiceVisualizer3D({ className, bars = 96 }: Props) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const rafRef = React.useRef<number | null>(null);
  const analyserRef = React.useRef<AnalyserNode | null>(null);
  const cleanupRef = React.useRef<() => void>(() => {});

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    // Scene & renderer
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Camera
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.set(0, 1.6, 5.2);
    camera.lookAt(0, 0, 0);
    scene.add(camera);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const key = new THREE.DirectionalLight(0xffffff, 0.9);
    key.position.set(-2, 3, 5);
    scene.add(key);

    // Colors
    const isDark = document.documentElement.classList.contains("dark");
    const barColor = new THREE.Color(isDark ? 0x8ab4ff : 0x2563eb);
    const glowColor = new THREE.Color(isDark ? 0xbed3ff : 0x60a5fa);

    // Bars (instanced mesh, cylinders arranged in a circle)
    const radius = 2.0;
    const geom = new THREE.CylinderGeometry(0.03, 0.03, 1, 12, 1, true);
    const mat = new THREE.MeshStandardMaterial({ color: barColor, transparent: true, opacity: 0.95 });
    const inst = new THREE.InstancedMesh(geom, mat, bars);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < bars; i++) {
      const t = (i / bars) * Math.PI * 2;
      const x = Math.cos(t) * radius;
      const z = Math.sin(t) * radius;
      dummy.position.set(x, 0, z);
      dummy.scale.set(1, 0.6, 1);
      dummy.rotation.set(0, -t, 0);
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
    }
    scene.add(inst);

    // Glow ring
    const ringGeo = new THREE.RingGeometry(radius * 0.98, radius * 1.02, 128);
    const ringMat = new THREE.MeshBasicMaterial({ color: glowColor, transparent: true, opacity: 0.25, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    scene.add(ring);

    // Tech network: nodes + connecting lines + particles
    const nodeCount = 36;
    const nodeGeom = new THREE.SphereGeometry(0.035, 12, 12);
    const nodeMat = new THREE.MeshBasicMaterial({ color: glowColor, transparent: true, opacity: 0.9 });
    const nodes = new THREE.InstancedMesh(nodeGeom, nodeMat, nodeCount);
    const nodeDummy = new THREE.Object3D();
    const nodePositions: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const t = (i / nodeCount) * Math.PI * 2;
      const r = radius * 0.9 + Math.sin(i * 0.9) * 0.12;
      const x = Math.cos(t) * r;
      const z = Math.sin(t) * r;
      const y = Math.sin(i * 0.35) * 0.12;
      nodeDummy.position.set(x, y, z);
      nodeDummy.updateMatrix();
      nodes.setMatrixAt(i, nodeDummy.matrix);
      nodePositions.push(new THREE.Vector3(x, y, z));
    }
    scene.add(nodes);

    // Lines between nodes (ring connections + chords)
    const linePairs: [number, number][] = [];
    for (let i = 0; i < nodeCount; i++) linePairs.push([i, (i + 1) % nodeCount]);
    for (let i = 0; i < nodeCount; i += 6) linePairs.push([i, (i + 3) % nodeCount]);
    const linePos = new Float32Array(linePairs.length * 2 * 3);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
    const lineMat = new THREE.LineBasicMaterial({ color: glowColor, transparent: true, opacity: 0.25 });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    // Particles that orbit
    const ptsCount = 240;
    const ptsPos = new Float32Array(ptsCount * 3);
    const ptsGeo = new THREE.BufferGeometry();
    ptsGeo.setAttribute("position", new THREE.BufferAttribute(ptsPos, 3));
    const ptsMat = new THREE.PointsMaterial({ color: glowColor, size: 0.02, transparent: true, opacity: 0.6 });
    const points = new THREE.Points(ptsGeo, ptsMat);
    scene.add(points);

    // Data packets along lines (move between node pairs)
    const packetsPerLine = 2;
    const totalPackets = linePairs.length * packetsPerLine;
    const pktPos = new Float32Array(totalPackets * 3);
    const pktGeo = new THREE.BufferGeometry();
    pktGeo.setAttribute("position", new THREE.BufferAttribute(pktPos, 3));
    const pktMat = new THREE.PointsMaterial({ color: barColor, size: 0.03, transparent: true, opacity: 0.9 });
    const pkts = new THREE.Points(pktGeo, pktMat);
    scene.add(pkts);
    const pktProg = new Float32Array(totalPackets);
    const pktSpeed = new Float32Array(totalPackets);
    for (let i = 0; i < totalPackets; i++) { pktProg[i] = Math.random(); pktSpeed[i] = 0.12 + Math.random() * 0.25; }

    // Resize handler
    const resize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 480;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    // Audio setup: default to microphone; if denied, use demo oscillator
    const ac = new (window.AudioContext || (window as any).webkitAudioContext)();
    const analyser = ac.createAnalyser();
    analyser.fftSize = 512;
    analyserRef.current = analyser;

    const setupMic = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const src = ac.createMediaStreamSource(stream);
        src.connect(analyser);
        cleanupRef.current = () => {
          stream.getTracks().forEach((t) => t.stop());
          src.disconnect();
          ac.close();
        };
      } catch (e) {
        // Fallback to demo tone
        const osc = ac.createOscillator();
        const gain = ac.createGain();
        osc.type = "sine";
        osc.frequency.value = 180;
        gain.gain.value = 0.15;
        osc.connect(gain).connect(analyser);
        osc.start();
        cleanupRef.current = () => {
          try { osc.stop(); } catch {}
          osc.disconnect();
          gain.disconnect();
          ac.close();
        };
      }
    };
    setupMic();

    // Animate
    const bins = new Uint8Array(analyser.frequencyBinCount);
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const heights = new Float32Array(bars).fill(0.6);

    const render = () => {
      const speed = prefersReduced ? 0 : 1;
      if (speed > 0 && analyser) analyser.getByteFrequencyData(bins);
      // Map bins onto bars with smoothing and slight phase offset
      for (let i = 0; i < bars; i++) {
        const bi = Math.floor((i / bars) * bins.length);
        const v = (bins[bi] || 0) / 255; // 0..1
        const target = 0.5 + v * 2.2; // height
        heights[i] = lerp(heights[i], target, 0.18);

        inst.getMatrixAt(i, dummy.matrix);
        dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale);
        dummy.scale.y = heights[i];
        dummy.updateMatrix();
        inst.setMatrixAt(i, dummy.matrix);
      }
      inst.instanceMatrix.needsUpdate = true;

      // Update tech network lines based on current node positions (mild oscillation)
      const now = performance.now() / 1000;
      for (let i = 0; i < nodeCount; i++) {
        const p = nodePositions[i];
        const wobble = Math.sin(now * 0.9 + i * 0.6) * 0.03;
        nodeDummy.position.set(p.x * (1 + wobble * 0.05), p.y + wobble, p.z * (1 - wobble * 0.05));
        nodeDummy.updateMatrix();
        nodes.setMatrixAt(i, nodeDummy.matrix);
      }
      nodes.instanceMatrix.needsUpdate = true;

      // Update line vertices and opacity based on global amplitude
      let avg = 0; for (let i = 0; i < bins.length; i++) avg += bins[i]; avg /= Math.max(1, bins.length);
      const amp = avg / 255; // 0..1
      lineMat.opacity = 0.15 + amp * 0.4;
      for (let i = 0; i < linePairs.length; i++) {
        const [a, b] = linePairs[i];
        const A = nodePositions[a];
        const B = nodePositions[b];
        // fetch potentially wobbled transforms
        nodes.getMatrixAt(a, nodeDummy.matrix); nodeDummy.matrix.decompose(nodeDummy.position, nodeDummy.quaternion, nodeDummy.scale);
        const ax = nodeDummy.position.x, ay = nodeDummy.position.y, az = nodeDummy.position.z;
        nodes.getMatrixAt(b, nodeDummy.matrix); nodeDummy.matrix.decompose(nodeDummy.position, nodeDummy.quaternion, nodeDummy.scale);
        const bx = nodeDummy.position.x, by = nodeDummy.position.y, bz = nodeDummy.position.z;
        const idx = i * 2 * 3;
        linePos[idx + 0] = ax; linePos[idx + 1] = ay; linePos[idx + 2] = az;
        linePos[idx + 3] = bx; linePos[idx + 4] = by; linePos[idx + 5] = bz;
      }
      (lineGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;

      // Particles orbit the ring; speed reacts to amplitude
      const speedMul = 0.5 + amp * 1.2;
      for (let i = 0; i < ptsCount; i++) {
        const t = (i / ptsCount) * Math.PI * 2 + now * speedMul;
        const r = radius * (0.8 + 0.3 * Math.sin(i * 1.7));
        const x = Math.cos(t) * r;
        const z = Math.sin(t) * r;
        const y = 0.25 * Math.sin(t * 1.3 + i);
        const idx = i * 3;
        ptsPos[idx + 0] = x;
        ptsPos[idx + 1] = y;
        ptsPos[idx + 2] = z;
      }
      (ptsGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;

      // Move packets along each line A->B
      for (let i = 0; i < linePairs.length; i++) {
        const [a, b] = linePairs[i];
        nodes.getMatrixAt(a, nodeDummy.matrix); nodeDummy.matrix.decompose(nodeDummy.position, nodeDummy.quaternion, nodeDummy.scale);
        const ax = nodeDummy.position.x, ay = nodeDummy.position.y, az = nodeDummy.position.z;
        nodes.getMatrixAt(b, nodeDummy.matrix); nodeDummy.matrix.decompose(nodeDummy.position, nodeDummy.quaternion, nodeDummy.scale);
        const bx = nodeDummy.position.x, by = nodeDummy.position.y, bz = nodeDummy.position.z;
        for (let j = 0; j < packetsPerLine; j++) {
          const idxPkt = i * packetsPerLine + j;
          const base = idxPkt * 3;
          pktProg[idxPkt] += pktSpeed[idxPkt] * (0.6 + amp * 1.8) * 0.016; // frame-ish
          if (pktProg[idxPkt] > 1) pktProg[idxPkt] -= 1;
          const tL = pktProg[idxPkt];
          pktPos[base + 0] = ax + (bx - ax) * tL;
          pktPos[base + 1] = ay + (by - ay) * tL;
          pktPos[base + 2] = az + (bz - az) * tL;
        }
      }
      (pktGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;

      // Subtle camera motion
      const t = performance.now() / 1000;
      camera.position.x = Math.sin(t * 0.25) * 0.3;
      camera.position.y = 1.5 + Math.sin(t * 0.4) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      cleanupRef.current?.();
      inst.geometry.dispose();
      mat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      nodeGeom.dispose();
      nodeMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      ptsGeo.dispose();
      ptsMat.dispose();
      pktGeo.dispose();
      pktMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === container) container.removeChild(renderer.domElement);
    };
  }, [bars]);

  return <div ref={containerRef} className={className} aria-hidden style={{ width: "100%", height: "100%" }} />;
}
