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
camera.position.z = 10;
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
const robot1 = new Robot({ scene, x: -4, y: -2, ry: degreesToRadians(25) });
const robot2 = new Robot({
  scene,
  x: 0,
  y: -2,
});
const robot3 = new Robot({
  scene,
  x: 4,
  y: -2,
  ry: degreesToRadians(-25),
});
robot1.init(); // Calls all the createBodyPart methods
robot2.init();
robot3.init();

//****************************** GSAP ***************/
//////// For Robot1
gsap.to(robot1.params, {
  ry: degreesToRadians(360),
  repeat: -1,
  duration: 20,
});

//////// For Robot2
// Set robot2's animation starting position
gsap.set(robot2.params, {
  y: -1.5,
});
gsap.to(robot2.params, {
  y: 0,
  armRotation: degreesToRadians(90),
  repeat: -1,
  yoyo: true, // does same animation in reverse
  duration: 0.5,
});

//////// For Robot3
gsap.to(robot3.params, {
  y: 0,
  armRotation: degreesToRadians(90),
  repeat: -1,
  yoyo: true, // does same animation in reverse
  duration: 0.5,
});

//****************************** ANIMATION LOOP USING GSAP ***************/
const controls = new OrbitControls(camera, renderer.domElement);
gsap.ticker.add(() => {
  robot1.group.rotation.y = robot1.params.ry; // robot1 - Update the rotation value
  robot2.bounce(); // robot2 bounces via its class method

  // robot3 bounces and moves its arms
  robot3.bounceWithHands();

  controls.update(); // orbit controls

  // Re-render the scene
  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2, false);
  renderer.render(scene, camera);
});

//****************************** **************** EOF *****************************/
