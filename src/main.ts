import * as THREE from 'three';
import { createPendulum } from './pendulum';

import { createGround } from './ground';

async function main() {
  const sceneCanvas = document.getElementById('sceneCanvas') as HTMLCanvasElement;
  sceneCanvas.width = window.innerWidth;
  sceneCanvas.height = window.innerHeight;

  const scene = new THREE.Scene();

  const aspect = window.innerWidth / window.innerHeight;
  const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
  camera.position.z = Math.max(8 / aspect, 6);
  camera.position.y = 0.5;
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ canvas: sceneCanvas, antialias: true });
  renderer.shadowMap.enabled = true;

  window.addEventListener('resize', () => {
    sceneCanvas.width = window.innerWidth;
    sceneCanvas.height = window.innerHeight;
    const aspect = window.innerWidth / window.innerHeight;
    camera.aspect = aspect;
    camera.position.z = Math.max(8 / aspect, 6);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  scene.background = new THREE.Color(0xeeeeee);

  const light = new THREE.AmbientLight(0xdddddd, 0.4);
  scene.add(light);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(40, 100, 40);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  const ground = await createGround();
  scene.add(ground);

  const pendulum = await createPendulum(scene);

  scene.fog = new THREE.Fog(0xffffff, 1, 80);

  let startTime: number | null = null;
  let lastFrameTime: number | null = null;
  function animationFrame(time: number) {
    if (startTime == null) {
      startTime = time;
    }
    if (lastFrameTime == null) {
      lastFrameTime = time;
    }
    const deltaTime = time - lastFrameTime;
    lastFrameTime = time;
    const totalTime = time - startTime;
    update(deltaTime, totalTime);
    renderer.render(scene, camera);
    window.requestAnimationFrame(animationFrame);
  }

  function update(deltaTime: number, totalTime: number) {
    pendulum.update(totalTime);
  }

  window.requestAnimationFrame(animationFrame);
}

main();
