const dgram = require("dgram");
const siYiCameraClient = dgram.createSocket("udp4"); //CREATING A UDP SOCKET TO CONNECT TO THE CAMERA

const SiyiA8SDK = require("../SiyiCameraSDK"); //IMPORTING SIYI CALSS
const mySiyiCamera = new SiyiA8SDK();

const SIYI_CAMERA_UDP_IP_ADDERSS = "YOUR_SIYI_IP_ADDRESS"; // REPLACE WITH THE CAMERA's IP ADDRESS
const SIYI_CAMERA_UDP_PORT = 37260; // THIS IS THE DEFAULT PORT CHANGE AS PER NEED

console.log("Starting yaw");
siYiCameraClient.send(
  mySiyiCamera.gimbal_rotate_command("40", "00"),
  SIYI_CAMERA_UDP_PORT,
  SIYI_CAMERA_UDP_IP_ADDERSS,
  (err) => {
    if (err) {
      console.error("Error sending data:", err);
    } else {
      console.log("Good Command");
    }
  }
);

setTimeout(() => {
  siYiCameraClient.send(
    mySiyiCamera.stop_gimbal_rotation(),
    SIYI_CAMERA_UDP_PORT,
    SIYI_CAMERA_UDP_IP_ADDERSS,
    (err) => {
      if (err) {
        console.error("Error sending data:", err);
      } else {
        console.log("Good Command");
      }
    }
  );
}, 200);

siYiCameraClient.on("message", (response) => {
  console.log(`Received response from Camera: ${response.toString("hex")}`);
});
