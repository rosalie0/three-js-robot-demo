import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//***** Helper function to let us give rotation values like 'degrees' (eg rotate 90 degrees) */
const degreesToRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};

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
renderer.setSize(window.innerWidth / 2, window.innerHeight / 2, false);
renderer.render(scene, camera);

//****************************** Creating Cube ***************/
const geo = new THREE.BoxGeometry(1, 1, 1);
const blueRobotMaterial = new THREE.MeshLambertMaterial({ color: 0x33ffff });
const mesh = new THREE.Mesh(geo, blueRobotMaterial);
mesh.rotation.x = degreesToRadians(30);
mesh.rotation.y = degreesToRadians(45);
// scene.add(mesh);

//****************************** Creating Light Source ***************/
const ambientLight = new THREE.AmbientLight(0x9eaeff, 0.2);
const spotlight = new THREE.DirectionalLight(0xffffff, 1);
spotlight.position.set(0, 2, 2); // move spotlight
scene.add(spotlight, ambientLight);
const spotlightHelper = new THREE.DirectionalLightHelper(spotlight);
scene.add(spotlightHelper);

//****************************** The Robot Class ***************/
// This will make it easy to add any number of figures to our scene by instantiating the class.
// Start it with some default params

class Robot {
  constructor(params) {
    // used later to position the chr
    this.params = {
      x: 0,
      y: 0,
      z: 0,
      ry: 0,
      ...params,
    };

    this.group = new THREE.Group(); // Create a 'Group'
    scene.add(this.group); // Add it to scene
  }

  // Methods for creating each part of the robot
  createHead() {
    const geo = new THREE.BoxGeometry(1.4, 1.4, 1.4);
    const head = new THREE.Mesh(geo, blueRobotMaterial);
    head.position.y = 1.65; // Position it above the body
    this.group.add(head); // Add it to our group
  }
  createBody() {
    const geo = new THREE.BoxGeometry(1, 1.5, 1); // A 'tall' box
    const body = new THREE.Mesh(geo, blueRobotMaterial); // make a new mesh called 'body'
    body.name = "robot body"; // not needed but for organizing/debugging w console logs
    this.group.add(body); // Add it to this Robot's group.
  }
  createArms() {
    const geo = new THREE.BoxGeometry(0.25, 1, 0.25); // A skinny box
    // Make two of them -
    for (let i = 0; i < 2; ++i) {
      const arm = new THREE.Mesh(geo, blueRobotMaterial);
      this.group.add(arm);

      /* Position each arm on either side of the body. 
      I find it helpful here to create a variable 'multiplier'.
      This helps us position the left arm in the opposite direction on the x axis,
      Also used for rotating the arms. */
      const indexIsEven = i % 2 === 0;
      const multiplier = indexIsEven ? 1 : -1;
      arm.position.x = multiplier * 0.8;
      arm.position.y = 0.1;
      arm.rotation.z = degreesToRadians(30 * multiplier); // Have arms 'stick out'
    }
  }
  // Method that Initializes the figure (call all the 'creates' methods)
  init() {
    this.createHead();
    this.createBody();
    this.createArms();
  }
}

//****************************** Creating a new robot and adding to the scene ***************/
const myRobot = new Robot();
myRobot.init();
console.log(myRobot);

//****************************** ANIMATION LOOP ***************/
const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update(); // orbit controls
}
animate();
