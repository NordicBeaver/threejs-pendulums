import * as THREE from 'three';
import { Pendulum } from './pendulum';

import woodTextureColorPath from 'url:./public/wood_color.jpg';

async function main() {
  const loader = new THREE.TextureLoader();
  const woodTextureColor = await loader.loadAsync(woodTextureColorPath);
  woodTextureColor.wrapS = THREE.RepeatWrapping;
  woodTextureColor.wrapT = THREE.RepeatWrapping;
  woodTextureColor.repeat.set(100, 10);

  const sceneCanvas = document.getElementById('sceneCanvas') as HTMLCanvasElement;
  sceneCanvas.width = window.innerWidth;
  sceneCanvas.height = 800;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 800, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: sceneCanvas });
  renderer.shadowMap.enabled = true;

  scene.background = new THREE.Color(0xeeeeee);

  const light = new THREE.AmbientLight(0xdddddd, 0.4);
  scene.add(light);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(40, 100, 40);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  const planeGeometry = new THREE.PlaneGeometry(1000, 100);
  const planeMaterial = new THREE.MeshStandardMaterial({
    map: woodTextureColor,
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -5;
  scene.add(plane);

  const pendulum = new Pendulum(scene);

  camera.position.z = 4;
  camera.position.y = 1.5;

  camera.rotation.x = -Math.PI / 6;

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
