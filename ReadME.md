# SiYi Camera Node.js SDK v1.0.1

## THIS IS OPEN SOURCE IMPLEMENTATION, CHANGES AND ERROR REQUEST WILL BE APPRECIATED

This is the Node Js implementation of Siyi Camera SDK.

The SiYi Camera Node.js SDK allows developers to easily integrate the SiYi cameras into their Node.js applications. With this short SDK/library, you can access the camera's features and functionalities programmatically, enabling seamless control and interaction with the camera.

### Features:

Currently it supports

-> Zoom In/Out
-> Pitch Up/Down
-> Yaw CCW/CW
-> Read Firmware Version
-> Read/Send Camera Codec Info
-> Trigger Photo/Video Capture
-> Send GPS and Attitude Data (for drones)
-> Parse Camera Acknowledgements (dot notation)
-> Gimbal Absolute Movements
-> Format SD Card

### v1.0.1

Added
Buffer Parser: This feature aids in interpreting the camera response in a more readable format(can be accessed by dot notation) .

Check Examples to Get Overview.

# Here is the Example code and Explanation to the Implementation of Zoom-In Feature.

### FIRST CREATE A UDP CLIENT TO CONNECT TO THE CAMERA

```
const dgram = require("dgram");
const siYiCameraClient = dgram.createSocket("udp4");
```

### NOW IMPORT NODE JS SDK CLASS AND CREATE A OBJECT TO USE IT

```
const SiyiA8SDK = require("../SiyiCameraSDK"); //IMPORTING SIYI CALSS
const mySiyiCamera = new SiyiA8SDK();
```

### NOW I DECLARED A UDP CLIENT CREDENTIALS TO CONNECT LIKE AS:

```

const {
  SIYI_CAMERA_UDP_IP_ADDERSS,
  SIYI_CAMERA_UDP_PORT,
} = require("./camera.config");  //CREATE "camera.config.js" FILE AND EXPORT YOUR CAMERA ADDRESS AND PORT TO ACCESS

// CONNECT TO UDP SOCKET
siYiCameraClient.connect(SIYI_CAMERA_UDP_PORT, SIYI_CAMERA_UDP_IP_ADDERSS);

// ATTACHING SOME COMMON LISTENER
siYiCameraClient.on("connect", () => {
  console.log("Connected to Camera");
});

siYiCameraClient.on("error", () => {
  console.log("Error Connecting to Camera");
});

```

### NOW SEND ZOOM IN COMMAND TO CAMERA

```

siYiCameraClient.send(mySiyiCamera.start_zoom());

```

##### After this command camera will start zoom-in and to stop the camera i used "setTimeout" ,Absolute zoom command will work in upper SiYi camera models but not in a8 mini so we have to handle the stop like this for more info I have attached the PDF of manual. This is general SDK and will work with most of the SiYi Camera. This has been Tested in node js on Raspberry Pi , Windows 10 and ubuntu 22 for SiYi A8 Mini.

### TO STOP ZOOM (IF NOT STOPPED CAMERA WILL STOP AT FULL ZOOM. YOU CAN CUSTOMIZE THE TIMEOUT AS PER NEED)

```
setTimeout(() => {
  console.log("Stopping Zoom");
  siYiCameraClient.send(mySiyiCamera.stop_zoom());
}, 500);
```

### TO LISTEN TO CAMERA ACKNOWLEDGEMENT

```
siYiCameraClient.on("message", (response) => {
  console.log("Received Response Buffer from Camera : ", response);
   mySiyiCamera.parseBuffer(response);
});

mySiyiCamera.on("SOME_EVENT", (data) => {
  console.log(data);
});

```

### (NEW) EXAMPLE : FOR READING CAMERA FIRMWARE

```
siYiCameraClient.on("connect", () => {
  console.log("Connected to Camera");

  // SENDING FIRMWARE READ REQUEST
  siYiCameraClient.send(mySiyiCamera.request_camera_fw_version());
});

siYiCameraClient.on("error", () => {
  console.log("Error Connecting to Camera");
});

console.log("Getting FW Version");

```

### READING FIRWARE ACKNOWLEDGEMENT

```
siYiCameraClient.on("message", (response) => {
  mySiyiCamera.parseBuffer(response);
});

// ATTACH A LISTENER
mySiyiCamera.on("FIRMWARE_VERSION", (data) => {
  console.log(data);
});

```

### FIRMWARE READ OUTPUT

```
{
  code_board_ver: '0.2.6',
  gimbal_firmware_ver: '0.3.7',
  zoom_firmware_ver: 'Not Supported'
}

** As I have SiYi A8 mini it doesn't have zoom firmware support

```
