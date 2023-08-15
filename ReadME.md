# Siyi A8 Mini Camera Node.js SDK

## THIS IS OPEN SOURCE IMPLEMENTATION, CHANGES AND ERROR REQUEST WILL BE APPRECIATED


This is the Node Js implementation of Siyi Camera SDK.

The Siyi A8 Mini Camera Node.js SDK allows developers to easily integrate the Siyi A8 Mini camera into their Node.js applications. With this short SDK/library, you can access the camera's features and functionalities programmatically, enabling seamless control and interaction with the camera.

### Features:

Currently it supports
Zoom-In, Zoom-Out, Pitch-Up, Pitch-Down, Yaw-CCW, Yaw-CW

Check Example to Get Overview.

# Here is the Exmaple code and Explanation to the Implemetation of Zoom-In Feature.

## FIRST CREATE A UDP CLIENT TO CONNECT TO THE CAMERA
```
const dgram = require("dgram");  
const siYiCameraClient = dgram.createSocket("udp4");   
```
## NOW IMPORT NODE JS SDK CLASS AND CREATE A OBJECT TO USE IT
```
const SiyiA8SDK = require("../SiyiCameraSDK"); //IMPORTING SIYI CALSS  
const mySiyiCamera = new SiyiA8SDK();  
```
## NOW I DECLARED A UDP CLIENT CREDENTIALS TO CONNECT LIKE AS:
```
const SIYI_CAMERA_UDP_IP_ADDERSS = "YOUR_SIYI_IP_ADDRESS"; // REPLACE WITH THE CAMERA's IP ADDRESS  
const SIYI_CAMERA_UDP_PORT = 37260; // THIS IS THE DEFAULT PORT CHANGE AS PER NEED  
```
## NOW SEND ZOOM IN COMMAND TO CAMERA  
```

siYiCameraClient.send(  
  mySiyiCamera.start_zoom(),  
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

```
// AFTER THIS COMMAND CAMERA WILL START ZOOM IN AND TO STOP THE CAMERA I USED "setTimeout" TO STOP IT AFTER A SPECIFIC TIME ABSOLUTE ZOOM COMMAND WILL WORK IN UPPSER SIYI CAMERA MODELS BUT NOT IN A8 MINI SO WE HAVE TO HANDLE THE STOP LIKE THIS FOR MORE INFO I HAVE ATTACHED THE PDF OF MANUAL.


//TO HAVE TO STOP ZOOM OTHER WISE IT WILL STOP AT FULL ZOOM. YOU CAN REDUCE THE TIMEOUT
=
setTimeout(() => {  
  siYiCameraClient.send(  
    mySiyiCamera.stop_zoom(),  
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
}, 500);  


//AS THE UDP CONNECTION IS BIDERCTIONAL CAMERA WILL SEND THE ACKNOWLEDGEMENT AND DATA TO THE CAMMMNADS WHICH REQUIRES IT
//LISTEN TO THE CAMERA ACKNOWLEGEMENT
=
siYiCameraClient.on("message", (response) => {  
  console.log(`Received response from Camera: ${response.toString("hex")}`);  
});  

