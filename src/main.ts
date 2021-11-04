import * as THREE from 'three';
import { Vector3 } from 'three';

class Cube {
  speed: number;
  mesh: THREE.Mesh;

  constructor() {
    const geometry = new THREE.BoxGeometry(1, 4, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    cube.translateY(2);
    cube.geometry.translate(0, -2, 0);
    cube.rotation.z = 1;
    this.mesh = cube;

    this.speed = 0;
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
  const frequency = 0.00002;
  const acceleration = -cube.mesh.rotation.z * frequency;
  cube.speed += acceleration;
  cube.mesh.rotation.z += deltaTime * cube.speed;
  // cube.mesh.rotation.y += deltaTime * cube.speed;
}

window.requestAnimationFrame(animationFrame);
