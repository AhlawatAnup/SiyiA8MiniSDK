const dgram = require("dgram");
const siYiCameraClient = dgram.createSocket("udp4"); //CREATING A UDP SOCKET TO CONNECT TO THE CAMERA

const SiyiA8SDK = require("../SiyiCameraSDK"); //IMPORTING SIYI CLASS
const mySiyiCamera = new SiyiA8SDK();

const {
  SIYI_CAMERA_UDP_IP_ADDRESS,
  SIYI_CAMERA_UDP_PORT,
} = require("./camera.config");

siYiCameraClient.connect(SIYI_CAMERA_UDP_PORT, SIYI_CAMERA_UDP_IP_ADDRESS);

// YAW: ZR10 / A8 MINI: -135.0 ~ 135.0 DEGREES
// YAW: ZT6 / ZR30: -270.0 ~ 270.0 DEGREES
// YAW: ZT30: LIMITLESS
// PITCH: ZT30 / ZT6 / ZR30 / ZR10 / A8 mini / A2 mini: -90.0 ~ 25.0 degree

siYiCameraClient.on("connect", () => {
  console.log("Connected to Camera");
  siYiCameraClient.send(mySiyiCamera.send_angle_control_gimbal(0, -900));
});

siYiCameraClient.on("error", () => {
  console.log("Error Connecting to Camera");
});

console.log("Getting Command To Gimbal  ...");

siYiCameraClient.on("message", (response) => {
  console.log("Received Response Buffer from Camera : ", response);
  mySiyiCamera.parseBuffer(response);
});

mySiyiCamera.on("GIMBAL_CONTROL_ANGLE", (data) => {
  console.log(data);
});
