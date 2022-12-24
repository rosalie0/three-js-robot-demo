import * as THREE from "three";
// typical import
import gsap from "gsap";
import { degreesToRadians, random } from "./helperFunctions";

const blueRobotMaterial = new THREE.MeshLambertMaterial({ color: 0x33ffff });

//****************************** The Robot Class ***************/
// This will make it easy to add any number of figures to our scene by instantiating the class.
// Start it with some default params
export class Robot {
  constructor(params) {
    this.group = new THREE.Group(); // Create a 'Group'

    // Initialize our properties
    this.params = {
      x: 0,
      y: 0,
      z: 0,
      ry: 0, // 'y-axis rotation'
      ...params,
    };

    // If coordinates and y-rotation specified via initializing, give them to this.group
    this.group.position.x = this.params.x;
    this.group.position.y = this.params.y;
    this.group.position.z = this.params.z;
    this.group.rotation.y = this.params.ry;

    //****************************** Random Colors ******************************/
    this.headHue = random(0, 360); // Random value between 0 and 360
    this.bodyHue = random(0, 360);
    // Make materials based on the random color values generated
    this.headMaterial = new THREE.MeshLambertMaterial({
      color: `hsl(${this.headHue}, 30%, 50%)`,
    });
    this.bodyMaterial = new THREE.MeshLambertMaterial({
      color: `hsl(${this.bodyHue}, 85%, 50%)`,
    });
    //****************************** Create Arm Array for Animation  ******************************/
    this.arms = [];

    //****************************** Add to Scene  ******************************/

    const { scene } = params;
    scene.add(this.group); // Add it to given scene
  }

  // Methods for creating each part of the robot
  createHead() {
    this.head = new THREE.Group(); // Create a new group for the head

    const geo = new THREE.BoxGeometry(1.4, 1.4, 1.4);
    const skull = new THREE.Mesh(geo, this.headMaterial);

    this.head.add(skull); // Add the skull to our head group
    this.group.add(this.head); // Add the 'head group' to our 'this.group'

    this.head.position.y = 1.65; // Position 'head group' above the body

    this.createEyes(); // Create eyes
  }
  createBody() {
    this.body = new THREE.Group(); // Create a group for the body
    const geo = new THREE.BoxGeometry(1, 1.5, 1); // A 'tall' box
    const bodyMain = new THREE.Mesh(geo, this.bodyMaterial); // make a new mesh called 'body'
    this.body.add(bodyMain);

    this.group.add(this.body); // this.group gets body group
  }
  createArms() {
    const height = 1; // Used for positioning the 'transform origin'
    const geo = new THREE.BoxGeometry(0.25, 1, 0.25); // A skinny box
    // Make two of them -
    for (let i = 0; i < 2; ++i) {
      // Because the pivot point cannot be changed on this geo, we need to make a new group -
      // - add this armGroup to our 'this' and Then we can rotate the group.
      const armGroup = new THREE.Group(); // Create a group for an arm
      const arm = new THREE.Mesh(geo, this.bodyMaterial);

      armGroup.add(arm); // add the arm to the armGroup
      this.group.add(armGroup); // ad the armGroup to the 'this.group'

      /* Position each armGroup on either side of the body. 
      I find it helpful here to create a variable 'multiplier'.
      This helps us position the left arm in the opposite direction on the x axis,
      Also used for rotating the arms. */
      const indexIsEven = i % 2 === 0;
      const multiplier = indexIsEven ? 1 : -1;

      arm.position.y = height * -0.5; // Translate the arm (not armGroup) down by half the height
      armGroup.position.x = multiplier * 0.8; // Other positioning is applied to the group
      armGroup.position.y = 0.6;

      // Visual Helper - goes at the END but before we rotate (or else positions are outdated)
      const box = new THREE.BoxHelper(armGroup, 0xffff00);
      //this.group.add(box); // comment back in if needed

      armGroup.rotation.z = degreesToRadians(30 * multiplier); // Have arms 'stick out'
      this.arms.push(armGroup); // Push armGroup onto 'this.arms', which is an array used for animation
    }
  }
  createEyes() {
    const geo = new THREE.SphereGeometry(0.15, 12, 8);
    const eyeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });

    // Create eye group (makes moving both at the same time easier)
    const eyes = new THREE.Group();
    for (let i = 0; i < 2; ++i) {
      const eye = new THREE.Mesh(geo, eyeMaterial);
      const m = i % 2 === 0 ? 1 : -1; // 'multiplier' for doing things to left or right accordingly
      eyes.add(eye);
      eye.position.x = 0.36 * m;
    }

    this.head.add(eyes); // add the eyes group to our head group

    // Move the eyes forwards by half of the head depth -
    // it might be a good idea to create a variable to do this!
    eyes.position.z = 0.7;
  }
  createLegs() {
    const legs = new THREE.Group(); // create legs group
    const geo = new THREE.BoxGeometry(0.25, 0.4, 0.25); // create geo for legs

    // Loop for making each leg
    for (let i = 0; i < 2; ++i) {
      const leg = new THREE.Mesh(geo, this.bodyMaterial);
      const m = i % 2 === 0 ? 1 : -1; // multiplier for left/right adjusting

      legs.add(leg);
      leg.position.x = m * 0.22; // each leg positioned horizontally
    }
    legs.position.y = -1; // position (both) legs on y-axis
    this.group.add(legs); // attach the legs group to 'this.group'
    this.body.add(legs); // attach legs to body (will make moving stuff easier)
  }
  // Method that Initializes the figure (call all the 'creates' methods)
  init() {
    this.createHead();
    this.createBody();
    this.createArms();
    // createEyes is called inside createHead
    this.createLegs();
  }

  // Used with gsap
  bounce() {
    this.group.rotation.y = this.params.ry;
    this.group.position.y = this.params.y;
  }
  // Used with gsap
  bounceWithHands() {
    this.group.rotation.y = this.params.ry;
    this.group.position.y = this.params.y;
    this.arms.forEach((arm, index) => {
      const m = index % 2 === 0 ? 1 : -1; //multiplier
      arm.rotation.z = this.params.armRotation * m;
    });
  }
}
