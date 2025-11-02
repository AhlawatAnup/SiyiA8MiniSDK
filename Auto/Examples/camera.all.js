const { siYiCameraClient } = require("./camera.config");
const { Siyi_camera } = require("../siyi.camera_sdk");
const camera = new Siyi_camera();

console.log("Examples ...");

function camera_examples() {
  console.log("Connected To Camera");
  // DO ALL CODE HERE
  // camera.send_camera_codec(1, 1, 3840, 2160, 4000, 0);
  // siYiCameraClient.send(camera.send_camera_codec(1, 1, 3840, 2160, 4000, 0));
  siYiCameraClient.send(camera.request_camera_codec(1)); // @PARAM 1 : STREAM TYPE
}

camera.on("request_camera_codec", (data) => console.log(data));
camera.on("send_camera_codec", (data) => console.log(data));

siYiCameraClient.on("connect", camera_examples);
siYiCameraClient.on("error", () => console.log("Error Connecting to Camera"));
siYiCameraClient.on("message", (response) => camera.buffer_parser(response));
