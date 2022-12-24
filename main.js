import "./style.css";
import * as THREE from "three";
// Get canvas from index.html
const canvas = document.querySelector("[data-canvas]");

//****************************** Creating Scene ***************/
// create scene
const scene = new THREE.Scene();

// create camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;
scene.add(camera);

// create renderer
const renderer = new THREE.WebGLRenderer({ canvas });

// render the scene
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

//****************************** Creating Cube ***************/
const geo = new THREE.BoxGeometry(1, 1, 1);
const mat = new THREE.MeshLambertMaterial({ color: 0xffffff });
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

//****************************** Creating Light Source ***************/
