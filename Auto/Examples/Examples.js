const { Siyi_camera } = require("../siyi.camera_sdk");
const camera = new Siyi_camera();

camera.on("request_hardware_id", (mess) => {
  console.log("mess", mess);
});

camera.on("request_firmware_version", (mess) => {
  console.log("mess", mess);
});

camera.on("request_point_temperature", (mess) => {
  console.log("mess", mess);
});

console.log("request_firmware_version : ", camera.request_firmware_version());
console.log("request_hardware_id : ", camera.request_hardware_id());
console.log("request_gimbal_mode : ", camera.request_gimbal_mode());
console.log("auto_focus : ", camera.auto_focus(1, 1024, 460));
console.log("manual_zoom_auto_focus : ", camera.manual_zoom_auto_focus(1));
console.log("request_max_zoom_value : ", camera.request_max_zoom_value());
console.log(
  "request_current_zoom_value : ",
  camera.request_current_zoom_value()
);
console.log("manual_focus : ", camera.manual_focus());
console.log("gimbal_rotation : ", camera.gimbal_rotation(50, -50));
console.log("center : ", camera.center(1));
console.log("photo_and_record : ", camera.photo_and_record(2));

console.log(
  "point temperature : ",
  camera.request_point_temperature(270, 114, 1)
);

// BUFFER PARSER
