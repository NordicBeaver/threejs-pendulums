import * as THREE from 'three';
import { Pendulum } from './pendulum';

const sceneCanvas = document.getElementById('sceneCanvas') as HTMLCanvasElement;
sceneCanvas.width = window.innerWidth;
sceneCanvas.height = 800;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 800, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ canvas: sceneCanvas });

const pendulum = new Pendulum(scene);

camera.position.z = 5;

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
