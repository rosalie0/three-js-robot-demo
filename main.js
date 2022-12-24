import "./style.css";

// Get canvas from index.html
const canvas = document.querySelector("[data-canvas]");

//****************************** Creating Scene ***************/
// create scene
const scene = new THREE.Scene();

// create camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
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

//****************************** Creating Light Source ***************/
