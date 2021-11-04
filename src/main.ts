import * as THREE from 'three';
import { Vector3 } from 'three';

class Cube {
  speed: THREE.Vector3;
  mesh: THREE.Mesh;

  constructor() {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = -2;
    this.mesh = cube;

    this.speed = new THREE.Vector3(0, 0, 0);
  }
}

const sceneCanvas = document.getElementById('sceneCanvas') as HTMLCanvasElement;
sceneCanvas.width = window.innerWidth;
sceneCanvas.height = 800;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 800, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ canvas: sceneCanvas });

const cube = new Cube();
scene.add(cube.mesh);

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
  update(deltaTime);
  renderer.render(scene, camera);
  window.requestAnimationFrame(animationFrame);
}

function update(deltaTime: number) {
  const rotationSpeed = 0.001;
  cube.mesh.rotation.x += deltaTime * rotationSpeed;
  cube.mesh.rotation.y += deltaTime * rotationSpeed;

  const frequency = 0.002;
  const accelerationX = -cube.mesh.position.x * frequency;
  cube.speed.x += accelerationX;
  cube.mesh.position.x += cube.speed.x;
}

window.requestAnimationFrame(animationFrame);
