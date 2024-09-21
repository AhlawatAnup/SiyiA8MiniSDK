const dgram = require("dgram");
const siYiCameraClient = dgram.createSocket("udp4"); //CREATING A UDP SOCKET TO CONNECT TO THE CAMERA

const SiyiA8SDK = require("../SiyiCameraSDK"); //IMPORTING SIYI CLASS
const mySiyiCamera = new SiyiA8SDK();

const {
  SIYI_CAMERA_UDP_IP_ADDERSS,
  SIYI_CAMERA_UDP_PORT,
} = require("./camera.config");

siYiCameraClient.connect(SIYI_CAMERA_UDP_PORT, SIYI_CAMERA_UDP_IP_ADDERSS);

/*
00: TAKE A PICTURE
01: SWITCH ON / OFF HDR (NOT SUPPORTED YET)
02: START / STOP RECORDING
03: MOTION – LOCK MODE
04: MOTION – FOLLOW MODE
05: MOTION – FPV MODE
06: SET VIDEO OUTPUT AS HDMI
   (ONLY AVAILABLE ON ZT6 AND A8 MINI,
   RESTART GIMBAL TO TAKE EFFECT)
07: SET VIDEO OUTPUT AS CVBS
   (ONLY AVAILABLE ON ZT6 AND A8 MINI,
   RESTART GIMBAL TO TAKE EFFECT)
08: TURN OFF BOTH HDMI AND CVBS
   VIDEO OUTPUT
   (ONLY AVAILABLE ON ZT6 AND A8 MINI,
   RESTART GIMBAL TO TAKE EFFECT)
*/

siYiCameraClient.on("connect", () => {
  console.log("Connected to Camera");
  siYiCameraClient.send(mySiyiCamera.photo_and_video("00"));
});

siYiCameraClient.on("error", () => {
  console.log("Error Connecting to Camera");
});

console.log("Getting Camera Codec ...");

siYiCameraClient.on("message", (response) => {
  console.log("Received Response Buffer from Camera : ", response);
  mySiyiCamera.parseBuffer(response);
  // IT  ACKNOWLEDGE WITH FUNCTION FEEDBACK INFO COMMAND_ID 0x0B
});

mySiyiCamera.on("FUNCTION_FEEDBACK_INFO", (data) => {
  console.log(data);
});

/*
FUNCTION_FEEDBACK_INFO


0: SUCCESS
1: FAIL TO TAKE A PHOTO (PLEASE CHECK 
   IF TF CARD IS INSERTED)
2: HDR ON
3: HDR OFF
4: FAIL TO RECORD A VIDEO (PLEASE CHECK 
   IF TF CARD IS INSERTED)
*/
