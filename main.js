import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

import { Robot } from "./robot";
import { degreesToRadians } from "./helperFunctions";

//****************************** Creating Scene ***************/
// Get canvas from index.html
const canvas = document.querySelector("[data-canvas]");

const scene = new THREE.Scene();
scene.background = new THREE.TextureLoader().load("/xp.jpg");

// create camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 8;
scene.add(camera);

// create renderer & render the scene+camera
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth / 2, window.innerHeight / 2, false);
renderer.render(scene, camera);

//****************************** Creating Light Source ***************/
const ambientLight = new THREE.AmbientLight(0x9eaeff, 0.4);
const spotlight = new THREE.DirectionalLight(0xffffff, 0.7);
spotlight.position.set(2, 2, 4); // move spotlight
scene.add(spotlight, ambientLight);

const spotlightHelper = new THREE.DirectionalLightHelper(spotlight);
// scene.add(spotlightHelper);

//****************************** Creating a new robot and adding to the scene ***************/
const myRobot = new Robot({ scene, x: -4, y: -2, ry: degreesToRadians(25) });
const anotherRobot = new Robot({
  scene,
  x: 4,
  y: -2,
  ry: degreesToRadians(-25),
});
myRobot.init(); // Calls all the createBodyPart methods
anotherRobot.init();

//****************************** GSAP ***************/
gsap.to(myRobot.params, {
  ry: degreesToRadians(360),
  repeat: -1,
  duration: 20,
});

gsap.ticker.add(() => {
  // Update the rotation value
  myRobot.group.rotation.y = myRobot.params.ry;
  // Render the scene
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
});

//****************************** ANIMATION LOOP ***************/
const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update(); // orbit controls
}
animate();

//****************************** **************** EOF *****************************/
