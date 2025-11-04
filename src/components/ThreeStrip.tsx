"use client";
import * as React from "react";
import * as THREE from "three";

type Props = {
  height?: number; // optional fixed height; omit to fill parent
  fill?: boolean; // when true, fills parent size
  className?: string;
  audioMode?: "none" | "mic" | "demo"; // audio-reactive wave
};

/**
 * Minimal three.js animated strip: a gently undulating wireframe plane.
 * Optimized for a short, full-width banner.
 */
export default function ThreeStrip({ height = 220, fill, className, audioMode = "none" }: Props) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const rafRef = React.useRef<number | null>(null);
  const analyserRef = React.useRef<AnalyserNode | null>(null);
  const audioSrcCleanupRef = React.useRef<() => void>(() => {});

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = globalThis.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Scene
    const scene = new THREE.Scene();

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // transparent
    container.appendChild(renderer.domElement);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0.8, 4.2);
    camera.lookAt(0, 0, 0);
    scene.add(camera);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dir = new THREE.DirectionalLight(0xffffff, 0.6);
    dir.position.set(-2, 3, 5);
    scene.add(dir);

    // Colors: blue with transparency (match CSS primary/ring)
    const isDark = document.documentElement.classList.contains("dark");
    const mainBlue = new THREE.Color(isDark ? 0x7da2ff : 0x2563eb); // blue-600-ish
    const glowBlue = new THREE.Color(isDark ? 0xaec6ff : 0x60a5fa); // blue-400-ish

    // Geometry: a traveling “sound wave” line across the banner
    const width = 14; // world units
    const segments = 600; // resolution of the line
    const positions = new Float32Array((segments + 1) * 3);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Precompute X positions
    const xs: number[] = [];
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      xs[i] = (t - 0.5) * width;
    }

    // Line materials
    const lineMat = new THREE.LineBasicMaterial({ color: mainBlue, transparent: true, opacity: 0.95 });
    const line = new THREE.Line(geometry, lineMat);
    scene.add(line);

    // A soft glow line slightly offset for a subtle depth
    const glowPositions = new Float32Array((segments + 1) * 3);
    const glowGeo = new THREE.BufferGeometry();
    glowGeo.setAttribute("position", new THREE.BufferAttribute(glowPositions, 3));
    const glowMat = new THREE.LineBasicMaterial({ color: glowBlue, transparent: true, opacity: 0.35 });
    const glowLine = new THREE.Line(glowGeo, glowMat);
    scene.add(glowLine);

    // Subtle group rotation for depth
    const group = new THREE.Group();
    group.add(line);
    group.add(glowLine);
    scene.add(group);

    // Sizing
    const resize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = fill ? (container.clientHeight || height) : height;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    // Animate
    const start = performance.now();
    const pos = geometry.getAttribute("position") as THREE.BufferAttribute;
    const glowPos = glowGeo.getAttribute("position") as THREE.BufferAttribute;

    const render = () => {
      const t = (performance.now() - start) / 1000;
      const speed = prefersReducedMotion ? 0 : 1;

      // Sample audio amplitude (0..1)
      let ampBoost = 1;
      const analyser = analyserRef.current;
      if (analyser && speed > 0) {
        const arr = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(arr);
        const avg = arr.reduce((a, b) => a + b, 0) / (arr.length || 1);
        ampBoost = 0.6 + (avg / 255) * 1.2; // 0.6..1.8
      }

      // 3D traveling wave: gaussian pulse moving across X, sine carrier, gentle Z sway
      const carrierFreq = 1.8; // base wavelength density
      const carrierAmp = 0.28 * ampBoost;
      const pulseWidth = 2.8; // spread of the gaussian envelope
      const travel = ((t * 1.2 * speed) % 6) - 3; // loops -3..+3 world units

      for (let i = 0; i <= segments; i++) {
        const x = xs[i];
        const k = carrierFreq;
        const env = Math.exp(-((x - travel) * (x - travel)) / (2 * (pulseWidth * pulseWidth)));
        const y = Math.sin(x * k - t * 3.0 * speed) * carrierAmp * (0.35 + 0.65 * env);
        const z = Math.cos(x * 0.45 + t * 0.9 * speed) * 0.6; // depth sway for 3D
        const idx = i * 3;
        positions[idx + 0] = x;
        positions[idx + 1] = y;
        positions[idx + 2] = z;

        // Glow line with slightly larger amplitude and tiny vertical offset
        glowPositions[idx + 0] = x;
        glowPositions[idx + 1] = y * 1.08 + 0.02;
        glowPositions[idx + 2] = z + 0.03;
      }
      pos.needsUpdate = true;
      glowPos.needsUpdate = true;

      group.rotation.y = Math.sin(t * 0.15) * 0.12;
      group.position.y = Math.sin(t * 0.6) * 0.04;

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      geometry.dispose();
      glowGeo.dispose();
      lineMat.dispose();
      glowMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [height, fill]);

  // Audio setup/teardown
  React.useEffect(() => {
    if (audioMode === "none") {
      audioSrcCleanupRef.current?.();
      analyserRef.current = null;
      return;
    }
    let stopped = false;
    type AudioContextConstructor = new () => AudioContext;
    type ExtendedWindow = Window & { webkitAudioContext?: AudioContextConstructor };
    const audioWindow = window as ExtendedWindow;
    const AudioContextCtor = window.AudioContext ?? audioWindow.webkitAudioContext;
    if (!AudioContextCtor) {
      console.warn("AudioContext is not supported in this browser.");
      return;
    }
    const ac = new AudioContextCtor();
    const analyser = ac.createAnalyser();
    analyser.fftSize = 512;
    analyserRef.current = analyser;

    const connectSource = async () => {
      if (audioMode === "mic") {
        try {
          if (!navigator.mediaDevices?.getUserMedia) {
            console.warn("mediaDevices.getUserMedia is not supported in this browser.");
            return;
          }
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const src = ac.createMediaStreamSource(stream);
          src.connect(analyser);
          audioSrcCleanupRef.current = () => {
            stream.getTracks().forEach((t) => t.stop());
            src.disconnect();
            ac.close();
          };
        } catch (error) {
          console.warn("Microphone access denied", error);
        }
      } else if (audioMode === "demo") {
        const osc = ac.createOscillator();
        const gain = ac.createGain();
        osc.type = "sine";
        osc.frequency.value = 220;
        gain.gain.value = 0.2;
        osc.connect(gain).connect(analyser);
        osc.start();
        audioSrcCleanupRef.current = () => {
          try { osc.stop(); } catch {}
          osc.disconnect();
          gain.disconnect();
          ac.close();
        };
      }
    };
    connectSource();
    return () => {
      if (stopped) return;
      stopped = true;
      audioSrcCleanupRef.current?.();
      analyserRef.current = null;
    };
  }, [audioMode]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: "100%", height: fill ? "100%" : height }}
      aria-hidden
    />
  );
}
