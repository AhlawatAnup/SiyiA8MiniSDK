const dgram = require("dgram");
const siYiCameraClient = dgram.createSocket("udp4"); //CREATING A UDP SOCKET TO CONNECT TO THE CAMERA

const SIYI_CAMERA_UDP_IP_ADDRESS = "10.42.0.1"; // REPLACE WITH THE CAMERA's IP ADDRESS
const SIYI_CAMERA_UDP_PORT = 37260; // THIS IS THE DEFAULT PORT CHANGE AS PER NEED

siYiCameraClient.connect(SIYI_CAMERA_UDP_PORT, SIYI_CAMERA_UDP_IP_ADDRESS);

module.exports = { siYiCameraClient };
