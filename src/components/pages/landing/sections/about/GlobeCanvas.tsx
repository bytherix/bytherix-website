"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });

    const getPixelRatio = () =>
      Math.min(
        window.devicePixelRatio || 1,
        window.innerWidth < 768 ? 1.25 : 1.5,
      );
    renderer.setPixelRatio(getPixelRatio());

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const group = new THREE.Group();

    scene.add(group);

    const wireGeo = new THREE.IcosahedronGeometry(2.1, 3);

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });

    const wireGlobe = new THREE.Mesh(wireGeo, wireMat);

    group.add(wireGlobe);

    const positionAttribute = wireGeo.attributes.position;

    const nodeGeo = new THREE.SphereGeometry(0.028, 8, 8);

    const nodeMat = new THREE.MeshBasicMaterial({
      color: 0xf87171,
      transparent: true,
      opacity: 0.9,
    });

    const nodeCount = Math.ceil(positionAttribute.count / 8);
    const nodes = new THREE.InstancedMesh(nodeGeo, nodeMat, nodeCount);
    const nodeTransform = new THREE.Object3D();
    let nodeIndex = 0;

    for (let i = 0; i < positionAttribute.count; i += 8) {
      nodeTransform.position.set(
        positionAttribute.getX(i),
        positionAttribute.getY(i),
        positionAttribute.getZ(i)
      );
      nodeTransform.updateMatrix();
      nodes.setMatrixAt(nodeIndex, nodeTransform.matrix);
      nodeIndex += 1;
    }

    nodes.instanceMatrix.needsUpdate = true;
    group.add(nodes);

    const shellGeo = new THREE.SphereGeometry(2.55, 32, 32);

    const shellMat = new THREE.MeshBasicMaterial({
      color: 0x93c5fd,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });

    const shell = new THREE.Mesh(shellGeo, shellMat);

    group.add(shell);

    const updateGlobeSize = (): void => {
      const width = window.innerWidth;

      if (width < 640) {
        group.scale.setScalar(0.58);
      } else if (width < 1024) {
        group.scale.setScalar(0.72);
      } else if (width < 1280) {
        group.scale.setScalar(0.85);
      } else {
        group.scale.setScalar(1.12);
      }
    };

    let frameId = 0;
    let inViewport = false;
    let pageVisible = document.visibilityState === "visible";
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let reducedMotion = reducedMotionQuery.matches;

    const renderStatic = (): void => {
      renderer.render(scene, camera);
    };

    const animate = (): void => {
      frameId = 0;
      if (!inViewport || !pageVisible || reducedMotion) return;

      group.rotation.y += 0.0025;
      group.rotation.x += 0.0007;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    const updateAnimation = (): void => {
      if (inViewport && pageVisible && !reducedMotion) {
        if (frameId === 0) {
          frameId = requestAnimationFrame(animate);
        }
      } else {
        cancelAnimationFrame(frameId);
        frameId = 0;
        if (inViewport && pageVisible) renderStatic();
      }
    };

    const resize = (): void => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (width === 0 || height === 0) {
        return;
      }

      renderer.setPixelRatio(getPixelRatio());
      renderer.setSize(width, height, false);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      updateGlobeSize();
      renderStatic();
    };

    resize();

    window.addEventListener("resize", resize);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        inViewport = entry.isIntersecting;
        updateAnimation();
      },
      { threshold: 0.01 },
    );
    intersectionObserver.observe(canvas);

    const handlePageVisibility = () => {
      pageVisible = document.visibilityState === "visible";
      updateAnimation();
    };
    const handleMotionPreference = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      updateAnimation();
    };

    document.addEventListener("visibilitychange", handlePageVisibility);
    reducedMotionQuery.addEventListener("change", handleMotionPreference);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handlePageVisibility);
      reducedMotionQuery.removeEventListener("change", handleMotionPreference);

      renderer.dispose();

      wireGeo.dispose();
      wireMat.dispose();

      nodeGeo.dispose();
      nodeMat.dispose();

      shellGeo.dispose();
      shellMat.dispose();

      scene.remove(group);
    };
  }, []);

  return (
    <div className="relative h-full w-full overflow-visible">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}