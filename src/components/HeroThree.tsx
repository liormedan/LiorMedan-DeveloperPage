"use client";
import * as React from "react";
import * as THREE from "three";

function cssVarRgb(name: string, fallback: THREE.ColorRepresentation = 0x5066ff) {
  if (typeof window === "undefined") return new THREE.Color(fallback);
  const s = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  // Expect formats like: rgb(r, g, b) or oklch(...) (fallback to default)
  const m = s.match(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
  if (m) {
    const r = parseInt(m[1], 10), g = parseInt(m[2], 10), b = parseInt(m[3], 10);
    return new THREE.Color(r / 255, g / 255, b / 255);
  }
  return new THREE.Color(fallback);
}

export default function HeroThree({ step, autoRotate = true, backgroundOnly = false, travelPulse = 0, audioLevel = 0, transitionProgress = 0 }: { step?: number; autoRotate?: boolean; backgroundOnly?: boolean; travelPulse?: number; audioLevel?: number; transitionProgress?: number }) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const rendererRef = React.useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = React.useRef<number | null>(null);
  const objectsRef = React.useRef<{ center?: THREE.Mesh; orbiters?: THREE.Mesh[] }>({});
  const cameraRef = React.useRef<THREE.PerspectiveCamera | null>(null);
  const sceneRef = React.useRef<THREE.Scene | null>(null);
  const bgUniformsRef = React.useRef<{ uTime: { value: number }; uColor1: { value: THREE.Color }; uColor2: { value: THREE.Color }; uTravel: { value: number }; uAudio: { value: number }; uTrans: { value: number } } | null>(null);

  // init
  React.useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Choose camera by mode
    let camera: THREE.Camera;
    if (backgroundOnly) {
      const ortho = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      camera = ortho;
      cameraRef.current = ortho as any;
    } else {
      const persp = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      persp.position.set(0, 0.5, 3.2);
      camera = persp;
      cameraRef.current = persp;
    }

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace as any;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Colors from CSS vars
    const primary = cssVarRgb("--primary");
    const accent = cssVarRgb("--accent", 0x99aaff);

    if (backgroundOnly) {
      // Fullscreen shader quad for animated gradient/noise sky
      const uniforms = {
        uTime: { value: 0 },
        uColor1: { value: primary.clone() },
        uColor2: { value: accent.clone() },
        uTravel: { value: 0 },
        uAudio: { value: 0 },
        uTrans: { value: 0 },
      } as const;
      bgUniformsRef.current = uniforms;
      const mat = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: `
          varying vec2 vUv;
          void main(){
            vUv = uv;
            gl_Position = vec4(position.xy, 0.0, 1.0);
          }
        `,
        fragmentShader: `
          precision highp float;
          varying vec2 vUv;
          uniform float uTime;
          uniform vec3 uColor1; // primary
          uniform vec3 uColor2; // accent
          uniform float uTravel; // 0..1 pulse when switching steps
          uniform float uAudio;  // 0..1 audio energy
          uniform float uTrans;  // 0..1 slide transition progress
          // simple 2D noise
          float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
          float noise(in vec2 p){
            vec2 i = floor(p);
            vec2 f = fract(p);
            float a = hash(i);
            float b = hash(i + vec2(1.0,0.0));
            float c = hash(i + vec2(0.0,1.0));
            float d = hash(i + vec2(1.0,1.0));
            vec2 u = f*f*(3.0-2.0*f);
            return mix(a, b, u.x) + (c - a)*u.y*(1.0 - u.x) + (d - b)*u.x*u.y;
          }
          // sample the tunnel color at a given uv (shared logic)
          vec3 tunnelSample(vec2 uv, float travel, float audio, float trans){
            float g = smoothstep(0.0, 1.0, uv.y);
            vec3 base = mix(uColor2, uColor1, g);
            vec2 p = (uv - 0.5) * 2.0;
            float r = length(p) + 1e-5;
            float a = atan(p.y, p.x);
            float speed = 2.2 + travel * 12.0 + audio * 5.0 + trans * 8.0;
            float stripes = 0.5 + 0.5 * sin(18.0 * log(r + 1.0) - (uTime * speed) - a*0.6);
            float glow = smoothstep(0.8, 0.0, r);
            vec3 col = mix(base, base + vec3(0.18,0.2,0.28), stripes * (0.45 + 0.55 * travel + 0.35 * audio));
            col += vec3(0.12, 0.12, 0.16) * glow * (0.6 + 0.8 * travel + 0.45 * audio);
            float n = noise(uv * 4.0 + vec2(0.0, uTime*0.05));
            col += (n - 0.5) * (0.04 + 0.04 * travel + 0.03 * audio);
            float dv = distance(uv, vec2(0.5));
            col *= smoothstep(0.98, 0.42 - 0.08 * travel - 0.05 * audio - 0.06 * trans, dv);
            float ring = smoothstep(0.38 + 0.24 * (1.0 - trans), 0.36 + 0.22 * (1.0 - trans), r);
            col += vec3(0.15,0.18,0.25) * ring * trans;
            return col;
          }
          void main(){
            // zoom into center during travel pulse
            float zoom = 1.0 - 0.22 * uTravel - 0.28 * uTrans; // stronger zoom in transition
            vec2 uv = (vUv - 0.5) * zoom + 0.5;
            // no radial blur: crisp minimal look
            vec3 col = tunnelSample(uv, uTravel, uAudio, uTrans);

            gl_FragColor = vec4(col, 1.0);
          }
        `,
        depthWrite: false,
        depthTest: false,
      });
      const geo = new THREE.PlaneGeometry(2, 2);
      const quad = new THREE.Mesh(geo, mat);
      scene.add(quad);
    } else {
      // Lights
      const hemi = new THREE.HemisphereLight(0xffffff, 0x223344, 0.8);
      scene.add(hemi);
      const dir = new THREE.DirectionalLight(0xffffff, 0.9);
      dir.position.set(2, 3, 2);
      scene.add(dir);

      // Center sphere
      const geo = new THREE.SphereGeometry(0.9, 64, 64);
      const mat = new THREE.MeshPhysicalMaterial({ color: primary, roughness: 0.25, metalness: 0.1, emissive: primary.clone().multiplyScalar(0.05) });
      const center = new THREE.Mesh(geo, mat);
      scene.add(center);

      // Orbiting spheres
      const orbiters: THREE.Mesh[] = [];
      for (let i = 0; i < 5; i++) {
        const g = new THREE.SphereGeometry(0.18 + i * 0.02, 32, 32);
        const m = new THREE.MeshStandardMaterial({ color: accent, roughness: 0.35, metalness: 0.15 });
        const mesh = new THREE.Mesh(g, m);
        scene.add(mesh);
        orbiters.push(mesh);
      }
      objectsRef.current = { center, orbiters };
    }

    // Responsive
    const onResize = () => {
      if (!container || !cameraRef.current || !rendererRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if ((cameraRef.current as any).isPerspectiveCamera) {
        (cameraRef.current as THREE.PerspectiveCamera).aspect = w / h;
        (cameraRef.current as THREE.PerspectiveCamera).updateProjectionMatrix();
      }
      rendererRef.current.setSize(w, h);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(container);

    // Animation loop
    let t = 0;
    const animate = (now: number) => {
      frameRef.current = requestAnimationFrame(animate);
      t = now * 0.001;

      if (!backgroundOnly && autoRotate && objectsRef.current.center) {
        const c = objectsRef.current.center;
        c.rotation.y += 0.005;
        c.rotation.x = Math.sin(t * 0.2) * 0.1;
      }
      if (backgroundOnly && bgUniformsRef.current) {
        bgUniformsRef.current.uTime.value = t;
        bgUniformsRef.current.uTravel.value = travelPulse || 0;
        bgUniformsRef.current.uAudio.value = Math.max(0, Math.min(1, audioLevel || 0));
        bgUniformsRef.current.uTrans.value = Math.max(0, Math.min(1, transitionProgress || 0));
      }
      if (objectsRef.current.orbiters) {
        if (!backgroundOnly) {
          const orbs = objectsRef.current.orbiters;
          orbs.forEach((o, i) => {
            const r = 1.5 + i * 0.25;
            const s = 0.8 + i * 0.15;
            o.position.set(Math.cos(t * s + i) * r, Math.sin(t * (s * 0.6) + i) * 0.4, Math.sin(t * s + i) * r);
          });
        }
      }

      renderer.render(scene, camera);
    };
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      ro.disconnect();
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current.domElement.remove();
      }
      // Dispose geo/mats
      const { center, orbiters } = objectsRef.current;
      center?.geometry.dispose();
      (center?.material as any)?.dispose?.();
      orbiters?.forEach((m) => { m.geometry.dispose(); (m.material as any)?.dispose?.(); });
      scene.clear();
    };
  }, [autoRotate]);

  // Basic camera tween on step change
  React.useEffect(() => {
    const camera = cameraRef.current;
    if (!camera) return;
    if ((camera as any).isOrthographicCamera) return; // background-only mode uses fullscreen quad
    const idx = Number(step || 0);
    const targets = [
      new THREE.Vector3(0, 0.5, 3.2),
      new THREE.Vector3(1.2, 0.6, 3.0),
      new THREE.Vector3(-1.1, 0.7, 2.8),
      new THREE.Vector3(0.5, -0.2, 2.6),
      new THREE.Vector3(0, 0.8, 3.4),
    ];
    const to = targets[Math.max(0, Math.min(targets.length - 1, idx))];
    // Softly approach target over a few frames
    const apply = () => {
      camera.position.lerp(to, 0.1);
    };
    const id = setInterval(apply, 16);
    const timeout = setTimeout(() => clearInterval(id), 500);
    return () => { clearInterval(id); clearTimeout(timeout); };
  }, [step]);

  // Update travel pulse on prop change
  React.useEffect(() => {
    if (bgUniformsRef.current) bgUniformsRef.current.uTravel.value = travelPulse || 0;
  }, [travelPulse]);

  // Update audio uniform on prop change
  React.useEffect(() => {
    if (bgUniformsRef.current) bgUniformsRef.current.uAudio.value = Math.max(0, Math.min(1, audioLevel || 0));
  }, [audioLevel]);

  React.useEffect(() => {
    if (bgUniformsRef.current) bgUniformsRef.current.uTrans.value = Math.max(0, Math.min(1, transitionProgress || 0));
  }, [transitionProgress]);

  return <div ref={ref} className="absolute inset-0" aria-hidden />;
}
