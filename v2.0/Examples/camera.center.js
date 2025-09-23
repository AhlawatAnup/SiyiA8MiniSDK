const dgram = require("dgram");
const siYiCameraClient = dgram.createSocket("udp4"); //CREATING A UDP SOCKET TO CONNECT TO THE CAMERA

const { Siyi_camera } = require("../siyi.camera_sdk"); //IMPORTING SiYi CLASS
const camera = new Siyi_camera();

const {
  SIYI_CAMERA_UDP_IP_ADDRESS,
  SIYI_CAMERA_UDP_PORT,
} = require("./camera.config");

siYiCameraClient.connect(SIYI_CAMERA_UDP_PORT, SIYI_CAMERA_UDP_IP_ADDRESS);

siYiCameraClient.on("connect", () => {
  console.log("Connected to Camera");
  siYiCameraClient.send(camera.center(1));
});

siYiCameraClient.on("error", () => {
  console.log("Error Connecting to Camera");
});

console.log("Getting FW Version");

camera.on("center", (data) => {
  console.log("center : ", data);
});

siYiCameraClient.on("message", (response) => {
  console.log("Received Response Buffer from Camera : ", response);
  camera.buffer_parser(response);
});
