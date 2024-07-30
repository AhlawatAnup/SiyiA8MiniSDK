const dgram = require("dgram");
const siYiCameraClient = dgram.createSocket("udp4"); //CREATING A UDP SOCKET TO CONNECT TO THE CAMERA

const SiyiA8SDK = require("../SiyiCameraSDK"); //IMPORTING SIYI CALSS
const mySiyiCamera = new SiyiA8SDK();

const SIYI_CAMERA_UDP_IP_ADDERSS = "192.168.144.25"; // REPLACE WITH THE CAMERA's IP ADDRESS
const SIYI_CAMERA_UDP_PORT = 37260; // THIS IS THE DEFAULT PORT CHANGE AS PER NEED

siYiCameraClient.connect(SIYI_CAMERA_UDP_PORT, SIYI_CAMERA_UDP_IP_ADDERSS);

siYiCameraClient.on("connect", () => {
  console.log("Connected to Camera");
  siYiCameraClient.send(mySiyiCamera.request_camera_codec("01"));
});

siYiCameraClient.on("error", () => {
  console.log("Error Connecting to Camera");
});

console.log("Starting Pitch");

siYiCameraClient.on("message", (response) => {
  console.log("Received Response Buffer from Camera : ", response);
});
