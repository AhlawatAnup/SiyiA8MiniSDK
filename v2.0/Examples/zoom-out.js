const dgram = require("dgram");
const siYiCameraClient = dgram.createSocket("udp4"); //CREATING A UDP SOCKET TO CONNECT TO THE CAMERA

const SiyiA8SDK = require("../SiyiCameraSDK"); //IMPORTING SIYI CLASS
const mySiyiCamera = new SiyiA8SDK();

const {
  SIYI_CAMERA_UDP_IP_ADDRESS,
  SIYI_CAMERA_UDP_PORT,
} = require("./camera.config");

siYiCameraClient.connect(SIYI_CAMERA_UDP_PORT, SIYI_CAMERA_UDP_IP_ADDRESS);

siYiCameraClient.on("connect", () => {
  console.log("Connected to Camera");
});

siYiCameraClient.on("error", () => {
  console.log("Error Connecting to Camera");
});

console.log("Starting Zooming Out");
siYiCameraClient.send(mySiyiCamera.zoom_out());

//TO HAVE TO STOP ZOOM OTHER WISE IT WILL STOP AT FULL ZOOM. YOU CAN REDUCE THE TIMEOUT
setTimeout(() => {
  console.log("Stopping Zoom-out");
  siYiCameraClient.send(mySiyiCamera.stop_zoom());
}, 500);

siYiCameraClient.on("message", (response) => {
  console.log("Received Response Buffer from Camera : ", response);
});
