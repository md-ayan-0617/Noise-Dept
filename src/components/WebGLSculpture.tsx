import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const WebGLSculpture: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    let isVisible = true;

    // IntersectionObserver to pause loop when scrolled away
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b0b0b);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    const getTargetZ = (w: number) => (w < 480 ? 11.8 : w < 768 ? 9.5 : 7.5);
    camera.position.set(0, 0, getTargetZ(width));

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Lighting: Hard direct studio light + Toxic Green rim
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);

    const toxicRim = new THREE.DirectionalLight(0xc7ff32, 3.8);
    toxicRim.position.set(-6, -4, -3);
    scene.add(toxicRim);

    // 3. Construct 3D Typographic Architectural Blocks for N, O, I, S, E
    const materialMatte = new THREE.MeshStandardMaterial({
      color: 0x1f1f1f,
      roughness: 0.35,
      metalness: 0.2,
    });

    const materialAccent = new THREE.MeshStandardMaterial({
      color: 0xec3d31,
      roughness: 0.25,
      metalness: 0.5,
    });

    const geometriesToDispose: THREE.BufferGeometry[] = [];
    const createBox = (w: number, h: number, d: number) => {
      const geom = new THREE.BoxGeometry(w, h, d);
      geometriesToDispose.push(geom);
      return geom;
    };

    const group = new THREE.Group();

    // Geometric Letter 'N'
    const nGroup = new THREE.Group();
    const nBar1 = new THREE.Mesh(createBox(0.35, 2.4, 0.4), materialMatte);
    nBar1.position.set(-0.7, 0, 0);
    const nBar2 = new THREE.Mesh(createBox(0.35, 2.4, 0.4), materialMatte);
    nBar2.position.set(0.7, 0, 0);
    const nDiag = new THREE.Mesh(createBox(0.35, 2.6, 0.4), materialAccent);
    nDiag.rotation.z = -0.55;
    nGroup.add(nBar1, nBar2, nDiag);
    nGroup.position.set(-2.8, 0, 0);

    // Geometric Letter 'O'
    const oGroup = new THREE.Group();
    const oTop = new THREE.Mesh(createBox(1.6, 0.35, 0.4), materialMatte);
    oTop.position.set(0, 1.0, 0);
    const oBottom = new THREE.Mesh(createBox(1.6, 0.35, 0.4), materialMatte);
    oBottom.position.set(0, -1.0, 0);
    const oLeft = new THREE.Mesh(createBox(0.35, 2.0, 0.4), materialMatte);
    oLeft.position.set(-0.7, 0, 0);
    const oRight = new THREE.Mesh(createBox(0.35, 2.0, 0.4), materialMatte);
    oRight.position.set(0.7, 0, 0);
    oGroup.add(oTop, oBottom, oLeft, oRight);
    oGroup.position.set(-1.4, 0, 0);

    // Geometric Letter 'I'
    const iGroup = new THREE.Group();
    const iBar = new THREE.Mesh(createBox(0.45, 2.4, 0.4), materialMatte);
    iGroup.add(iBar);
    iGroup.position.set(0, 0, 0);

    // Geometric Letter 'S'
    const sGroup = new THREE.Group();
    const sTop = new THREE.Mesh(createBox(1.5, 0.35, 0.4), materialAccent);
    sTop.position.set(0, 1.0, 0);
    const sMid = new THREE.Mesh(createBox(1.5, 0.35, 0.4), materialMatte);
    sMid.position.set(0, 0, 0);
    const sBot = new THREE.Mesh(createBox(1.5, 0.35, 0.4), materialAccent);
    sBot.position.set(0, -1.0, 0);
    const sL = new THREE.Mesh(createBox(0.35, 1.1, 0.4), materialMatte);
    sL.position.set(-0.6, 0.5, 0);
    const sR = new THREE.Mesh(createBox(0.35, 1.1, 0.4), materialMatte);
    sR.position.set(0.6, -0.5, 0);
    sGroup.add(sTop, sMid, sBot, sL, sR);
    sGroup.position.set(1.4, 0, 0);

    // Geometric Letter 'E'
    const eGroup = new THREE.Group();
    const eBack = new THREE.Mesh(createBox(0.35, 2.4, 0.4), materialMatte);
    eBack.position.set(-0.6, 0, 0);
    const eT = new THREE.Mesh(createBox(1.4, 0.35, 0.4), materialMatte);
    eT.position.set(0.1, 1.0, 0);
    const eM = new THREE.Mesh(createBox(1.0, 0.35, 0.4), materialMatte);
    eM.position.set(-0.1, 0, 0);
    const eB = new THREE.Mesh(createBox(1.4, 0.35, 0.4), materialMatte);
    eB.position.set(0.1, -1.0, 0);
    eGroup.add(eBack, eT, eM, eB);
    eGroup.position.set(2.8, 0, 0);

    group.add(nGroup, oGroup, iGroup, sGroup, eGroup);
    scene.add(group);

    // Initial abstract cluster positions
    const initialPositions = [
      { x: -1.2, y: 0.8, z: 0.6, rx: 0.4, ry: 0.6 },
      { x: 0.5, y: -0.6, z: -0.8, rx: -0.5, ry: 0.3 },
      { x: 0.0, y: 0.2, z: 0.2, rx: 0.2, ry: -0.4 },
      { x: -0.8, y: -0.7, z: 0.9, rx: 0.6, ry: 0.5 },
      { x: 1.1, y: 0.9, z: -0.4, rx: -0.3, ry: -0.7 },
    ];

    const targetPositions = [
      { x: -2.8, y: 0, z: 0, rx: 0, ry: 0 },
      { x: -1.4, y: 0, z: 0, rx: 0, ry: 0 },
      { x: 0.0, y: 0, z: 0, rx: 0, ry: 0 },
      { x: 1.4, y: 0, z: 0, rx: 0, ry: 0 },
      { x: 2.8, y: 0, z: 0, rx: 0, ry: 0 },
    ];

    const letters = [nGroup, oGroup, iGroup, sGroup, eGroup];

    // Pointer and touch tracking
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      const rect = container.getBoundingClientRect();
      mouseX = ((e.touches[0].clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.touches[0].clientY - rect.top) / rect.height) * 2 - 1);
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('touchmove', onTouchMove, { passive: true });

    // Animation Loop
    let animationFrameId: number;
    let scrollProgress = 0;

    const onScroll = () => {
      if (!isVisible) return;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
      scrollProgress = progress;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const animate = () => {
      if (isVisible) {
        // Camera parallax
        camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 1.0 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);

        // Letter separation / alignment curve based on scroll
        const alignFactor = Math.sin(scrollProgress * Math.PI);

        letters.forEach((letter, i) => {
          const init = initialPositions[i];
          const targ = targetPositions[i];

          letter.position.x = init.x + (targ.x - init.x) * alignFactor;
          letter.position.y = init.y + (targ.y - init.y) * alignFactor;
          letter.position.z = init.z + (targ.z - init.z) * alignFactor;

          letter.rotation.x = init.rx * (1 - alignFactor);
          letter.rotation.y = init.ry * (1 - alignFactor);
        });

        // Subtle slow rotation of the cluster
        group.rotation.y += 0.003;

        renderer.render(scene, camera);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.position.z = getTargetZ(w);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      materialMatte.dispose();
      materialAccent.dispose();
      geometriesToDispose.forEach((g) => g.dispose());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: 'clamp(380px, 50vh, 650px)',
        position: 'relative',
        cursor: 'grab',
        overflow: 'hidden',
      }}
    />
  );
};
