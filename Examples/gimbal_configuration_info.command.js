const dgram = require("dgram");
const siYiCameraClient = dgram.createSocket("udp4"); //CREATING A UDP SOCKET TO CONNECT TO THE CAMERA

const SiyiA8SDK = require("../SiyiCameraSDK"); //IMPORTING SIYI CLASS
const mySiyiCamera = new SiyiA8SDK();

const {
  SIYI_CAMERA_UDP_IP_ADDERSS,
  SIYI_CAMERA_UDP_PORT,
} = require("./camera.config");

siYiCameraClient.connect(SIYI_CAMERA_UDP_PORT, SIYI_CAMERA_UDP_IP_ADDERSS);

siYiCameraClient.on("connect", () => {
  console.log("Connected to Camera");
  siYiCameraClient.send(mySiyiCamera.request_gimbal_configuaration_info());
});

siYiCameraClient.on("error", () => {
  console.log("Error Connecting to Camera");
});

console.log("Getting Camera Codec ...");

siYiCameraClient.on("message", (response) => {
  console.log("Received Response Buffer from Camera : ", response);
  mySiyiCamera.parseBuffer(response);
});

mySiyiCamera.on("GIMBAL_CONFIG_INFO", (data) => {
  console.log(data);
});
