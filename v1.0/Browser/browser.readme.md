# SiYi Camera Browser Side SDK v1.0.0

## THIS IS OPEN SOURCE IMPLEMENTATION, CHANGES AND ERROR REQUEST WILL BE APPRECIATED

This is the Browser Side implementation of SiYi Camera SDK.

The SiYi Camera Browser SDK allows developers to easily integrate the SiYi cameras into their browser applications. With this short SDK/library, you can access the camera's features, functionalities and command it programmatically, enabling seamless control and interaction with the camera.

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

### v1.0.0

Initial Release For Browser

Check Examples to Get Overview.(Example implementations remain the same, but since browsers do not support direct UDP connections, you can use WebSockets or a REST API to establish communication with the camera.)

# Here is the Example code and Explanation to the Implementation of Zoom-In Feature.

### FIRST CREATE A CONNECTION TO THE CAMERA

I am using socket.io to route buffers from the client browser to the camera.

```
socket = io()
```

### NOW IMPORT CAMERA SDK CLASS AND CREATE A OBJECT TO USE IT

```
const SiyiA8SDK = require("../SiyiCameraSDK"); //IMPORTING SIYI CLASS
const mySiyiCamera = new SiyiA8SDK();
```

### NOW EMIT ZOOM IN COMMAND TO CAMERA

```

socket.emit("CAM_BUF",mySiyiCamera.start_zoom());

```

##### After this command camera will start zoom-in and to stop the camera i used "setTimeout" ,Absolute zoom command will work in upper SiYi camera models but not in a8 mini so we have to handle the stop like this for more info I have attached the PDF of manual. This is general SDK and will work with most of the SiYi Camera. This has been Tested in node js on Raspberry Pi , Windows 10 and ubuntu 22 for SiYi A8 Mini.

### TO STOP ZOOM (IF NOT STOPPED CAMERA WILL STOP AT FULL ZOOM. YOU CAN CUSTOMIZE THE TIMEOUT AS PER NEED)

```
setTimeout(() => {
  console.log("Stopping Zoom");
  socket.emit("CAM_BUF",mySiyiCamera.stop_zoom());
}, 500);
```

### TO LISTEN TO CAMERA ACKNOWLEDGEMENT

```
socket.on("CAM_ACK", (response) => {
  console.log("Received Response Buffer from Camera : ", response);
   mySiyiCamera.parseBuffer(response);
});

mySiyiCamera.on("SOME_EVENT", (data) => {
  console.log(data);
});

```

### FOR READING CAMERA FIRMWARE

```
// SENDING FIRMWARE READ REQUEST
  socket.emit("CAM_BUF",mySiyiCamera.request_camera_fw_version());

console.log("Getting FW Version");

```

### READING FIRWARE ACKNOWLEDGEMENT

```
siYiCameraClient.on("message", (response) => {
  mySiyiCamera.parseBuffer(response);
});

socket.on("CAM_ACK",(response) => {
  mySiyiCamera.parseBuffer(response);
})

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
