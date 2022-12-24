import "./style.css";
import * as THREE from "three";
// Get canvas from index.html
const canvas = document.querySelector("[data-canvas]");

//***** Helper function to let us give rotation values like 'degrees' (eg rotate 90 degrees) */
const degreesToRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};

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
renderer.setSize(500, 500);
renderer.render(scene, camera);

//****************************** Creating Cube ***************/
const geo = new THREE.BoxGeometry(1, 1, 1);
const mat = new THREE.MeshLambertMaterial({ color: 0x33ffff });
const mesh = new THREE.Mesh(geo, mat);
mesh.rotation.x = degreesToRadians(30);
mesh.rotation.y = degreesToRadians(45);
scene.add(mesh);

//****************************** Creating Light Source ***************/
const spotlight = new THREE.DirectionalLight(0xffffff, 1);
spotlight.position.set(0, 2, 2); // move spotlight
scene.add(spotlight);
const spotlightHelper = new THREE.DirectionalLightHelper(spotlight);
scene.add(spotlightHelper);

// FINALLY -  Re render all the stuff we added!
renderer.render(scene, camera);
