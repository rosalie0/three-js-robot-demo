//****************************** Creating Cube ***************/
const geo = new THREE.BoxGeometry(1, 1, 1);
const blueRobotMaterial = new THREE.MeshLambertMaterial({ color: 0x33ffff });
const mesh = new THREE.Mesh(geo, blueRobotMaterial);
mesh.rotation.x = degreesToRadians(30);
mesh.rotation.y = degreesToRadians(45);
scene.add(mesh);
