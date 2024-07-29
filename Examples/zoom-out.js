const dgram = require("dgram");
const siYiCameraClient = dgram.createSocket("udp4"); //CREATING A UDP SOCKET TO CONNECT TO THE CAMERA

const SiyiA8SDK = require("../SiyiCameraSDK"); //IMPORTING SIYI CALSS
const mySiyiCamera = new SiyiA8SDK();

const SIYI_CAMERA_UDP_IP_ADDERSS = "YOUR_SIYI_IP_ADDRESS"; // REPLACE WITH THE CAMERA's IP ADDRESS
const SIYI_CAMERA_UDP_PORT = 37260; // THIS IS THE DEFAULT PORT CHANGE AS PER NEED

siYiCameraClient.connect(SIYI_CAMERA_UDP_PORT, SIYI_CAMERA_UDP_IP_ADDERSS);

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
