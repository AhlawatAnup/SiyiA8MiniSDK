const dgram = require("dgram");
const siYiCameraClient = dgram.createSocket("udp4"); //CREATING A UDP SOCKET TO CONNECT TO THE CAMERA
const net = require("net");
const camera_tcp_client = new net.Socket();

const SiyiA8SDK = require("../SiyiCameraSDK"); //IMPORTING SIYI CLASS
const mySiyiCamera = new SiyiA8SDK();

const {
  SIYI_CAMERA_UDP_IP_ADDRESS,
  SIYI_CAMERA_UDP_PORT,
} = require("./camera.config");

// siYiCameraClient.connect(SIYI_CAMERA_UDP_PORT, SIYI_CAMERA_UDP_IP_ADDRESS);
camera_tcp_client.setKeepAlive(true);
camera_tcp_client.connect(
  SIYI_CAMERA_UDP_PORT,
  SIYI_CAMERA_UDP_IP_ADDRESS,
  () => {
    console.log(
      `Connected to server at ${SIYI_CAMERA_UDP_IP_ADDRESS}:${SIYI_CAMERA_UDP_PORT}`
    );
    // camera_tcp_client.write(mySiyiCamera.center_command());
    camera_tcp_client.write(mySiyiCamera.request_gimbal_configuration_info());

    setInterval(() => {
      camera_tcp_client.write(mySiyiCamera.request_gimbal_configuration_info());
    }, 1000);
    // Send a message to the server once connected
    //   client.write("Hello, server!");
  }
);

// Listen for data from the server
camera_tcp_client.on("data", (data) => {
  console.log(`Received from server: `, data);
  mySiyiCamera.parseBuffer(data);

  // Close the connection
  //   client.destroy();
});

// Handle connection closed
camera_tcp_client.on("close", () => {
  console.log("Connection closed");
});

// Handle connection errors
camera_tcp_client.on("error", (err) => {
  console.error(`Connection error: ${err.message}`);
});

// siYiCameraClient.on("connect", () => {
//   console.log("Connected to Camera");
//   siYiCameraClient.send(mySiyiCamera.center_command());
// });

// siYiCameraClient.on("error", () => {
//   console.log("Error Connecting to Camera");
// });

// console.log("Getting FW Version");

// siYiCameraClient.on("message", (response) => {
//   console.log("Received Response Buffer from Camera : ", response);
//   mySiyiCamera.parseBuffer(response);
// });

mySiyiCamera.on("CENTER_CAMERA", (data) => {
  console.log(data);
});
mySiyiCamera.on("GIMBAL_CONFIG_INFO", (data) => {
  console.log(data);
});
