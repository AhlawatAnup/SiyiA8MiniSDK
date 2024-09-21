const dgram = require("dgram");
const siYiCameraClient = dgram.createSocket("udp4"); //CREATING A UDP SOCKET TO CONNECT TO THE CAMERA

const SiyiA8SDK = require("../SiyiCameraSDK"); //IMPORTING SIYI CALSS
const mySiyiCamera = new SiyiA8SDK();

const {
  SIYI_CAMERA_UDP_IP_ADDERSS,
  SIYI_CAMERA_UDP_PORT,
} = require("./camera.config");

siYiCameraClient.connect(SIYI_CAMERA_UDP_PORT, SIYI_CAMERA_UDP_IP_ADDERSS);

siYiCameraClient.on("connect", () => {
  console.log("Connected to Camera");
});

siYiCameraClient.on("error", () => {
  console.log("Error Connecting to Camera");
});

console.log("Starting cw yaw");
siYiCameraClient.send(mySiyiCamera.gimbal_rotate_command("d8", "00"));

setTimeout(() => {
  siYiCameraClient.send(mySiyiCamera.stop_gimbal_rotation());
}, 200);

siYiCameraClient.on("message", (response) => {
  console.log("Received Response Buffer from Camera : ", response);
});
