// THIS IS THE AUTO GENERATED FILE
// DO NOT EDIT IT MANUALLY
// IF YOU WANT TO ADD A NEW COMMAND MAKE A CHANGE TO SCHEMA
// version : 2.0.0
const events = require("node:events");
util = require("util");
Siyi_camera = function () {};
// CMD: request_firmware_version (0x01)
Siyi_camera.prototype.request_firmware_version = function () {
  const buffer = Buffer.alloc(0);

  return this.encodePacket(0x01, buffer);
};

Siyi_camera.prototype.decode_request_firmware_version = function (buffer) {
  this.emit("request_firmware_version", {
    code_board_ver: buffer.readUInt32LE(0),
    gimbal_firmware_ver: buffer.readUInt32LE(4),
    zoom_firmware_ver: buffer.readUInt32LE(8),
  });
};
// CMD: request_hardware_id (0x02)
Siyi_camera.prototype.request_hardware_id = function () {
  const buffer = Buffer.alloc(0);

  return this.encodePacket(0x02, buffer);
};

Siyi_camera.prototype.decode_request_hardware_id = function (buffer) {
  this.emit("request_hardware_id", {
    hardware_id: buffer.toString("ascii", 0, 12),
  });
};
// CMD: request_gimbal_mode (0x19)
Siyi_camera.prototype.request_gimbal_mode = function () {
  const buffer = Buffer.alloc(0);

  return this.encodePacket(0x19, buffer);
};

Siyi_camera.prototype.decode_request_gimbal_mode = function (buffer) {
  this.emit("request_gimbal_mode", { gimbal_mode: buffer.readUInt8(0) });
};
// CMD: auto_focus (0x04)
Siyi_camera.prototype.auto_focus = function (auto_focus, touch_x, touch_y) {
  const buffer = Buffer.alloc(5);
  buffer.writeUInt8(auto_focus, 0);
  buffer.writeUInt16LE(touch_x, 1);
  buffer.writeUInt16LE(touch_y, 3);
  return this.encodePacket(0x04, buffer);
};

Siyi_camera.prototype.decode_auto_focus = function (buffer) {
  this.emit("auto_focus", { sta: buffer.readUInt8(0) });
};
// CMD: manual_zoom_auto_focus (0x05)
Siyi_camera.prototype.manual_zoom_auto_focus = function (zoom) {
  const buffer = Buffer.alloc(1);
  buffer.writeInt8(zoom, 0);
  return this.encodePacket(0x05, buffer);
};

Siyi_camera.prototype.decode_manual_zoom_auto_focus = function (buffer) {
  this.emit("manual_zoom_auto_focus", {
    zoom_multiple: buffer.readUInt16LE(0),
  });
};
// CMD: absolute_zoom_auto_focus (0x0f)
Siyi_camera.prototype.absolute_zoom_auto_focus = function (
  absolute_movement_int,
  absolute_movement_float
) {
  const buffer = Buffer.alloc(2);
  buffer.writeUInt8(absolute_movement_int, 0);
  buffer.writeUInt8(absolute_movement_float, 1);
  return this.encodePacket(0x0f, buffer);
};

Siyi_camera.prototype.decode_absolute_zoom_auto_focus = function (buffer) {
  this.emit("absolute_zoom_auto_focus", {
    absolute_movement_ask: buffer.readUInt8(0),
  });
};
// CMD: request_max_zoom_value (0x16)
Siyi_camera.prototype.request_max_zoom_value = function () {
  const buffer = Buffer.alloc(0);

  return this.encodePacket(0x16, buffer);
};

Siyi_camera.prototype.decode_request_max_zoom_value = function (buffer) {
  this.emit("request_max_zoom_value", {
    zoom_max_int: buffer.readUInt8(0),
    zoom_max_float: buffer.readUInt8(1),
  });
};
// CMD: request_current_zoom_value (0x18)
Siyi_camera.prototype.request_current_zoom_value = function () {
  const buffer = Buffer.alloc(0);

  return this.encodePacket(0x18, buffer);
};

Siyi_camera.prototype.decode_request_current_zoom_value = function (buffer) {
  this.emit("request_current_zoom_value", {
    zoom_max_int: buffer.readUInt8(0),
    zoom_max_float: buffer.readUInt8(1),
  });
};
// CMD: manual_focus (0x06)
Siyi_camera.prototype.manual_focus = function (focus) {
  const buffer = Buffer.alloc(1);
  buffer.writeInt8(focus, 0);
  return this.encodePacket(0x06, buffer);
};

Siyi_camera.prototype.decode_manual_focus = function (buffer) {
  this.emit("manual_focus", { sta: buffer.readUInt8(0) });
};
// CMD: gimbal_rotation (0x07)
Siyi_camera.prototype.gimbal_rotation = function (turn_yaw, turn_pitch) {
  const buffer = Buffer.alloc(2);
  buffer.writeInt8(turn_yaw, 0);
  buffer.writeInt8(turn_pitch, 1);
  return this.encodePacket(0x07, buffer);
};

Siyi_camera.prototype.decode_gimbal_rotation = function (buffer) {
  this.emit("gimbal_rotation", { sta: buffer.readUInt8(0) });
};
// CMD: center (0x08)
Siyi_camera.prototype.center = function (center_pos) {
  const buffer = Buffer.alloc(1);
  buffer.writeUInt8(center_pos, 0);
  return this.encodePacket(0x08, buffer);
};

Siyi_camera.prototype.decode_center = function (buffer) {
  this.emit("center", { sta: buffer.readUInt8(0) });
};
// CMD: request_gimbal_config (0x0A)
Siyi_camera.prototype.request_gimbal_config = function () {
  const buffer = Buffer.alloc(0);

  return this.encodePacket(0x0a, buffer);
};

Siyi_camera.prototype.decode_request_gimbal_config = function (buffer) {
  this.emit("request_gimbal_config", {
    reserved: buffer.readUInt8(0),
    hdr_sta: buffer.readUInt8(1),
    reserved_1: buffer.readUInt8(2),
    record_sta: buffer.readUInt8(3),
    gimbal_motion_mode: buffer.readUInt8(4),
    gimbal_mounting_dir: buffer.readUInt8(5),
    video_hdmi_or_cvsb: buffer.readUInt8(6),
  });
};
// CMD: function_feedback (0x0B)
Siyi_camera.prototype.function_feedback = function () {
  const buffer = Buffer.alloc(0);

  return this.encodePacket(0x0b, buffer);
};

Siyi_camera.prototype.decode_function_feedback = function (buffer) {
  this.emit("function_feedback", { info_type: buffer.readUInt8(0) });
};
// CMD: photo_and_record (0x0C)
Siyi_camera.prototype.photo_and_record = function (func_type) {
  const buffer = Buffer.alloc(1);
  buffer.writeUInt8(func_type, 0);
  return this.encodePacket(0x0c, buffer);
};

Siyi_camera.prototype.decode_photo_and_record = function (buffer) {
  this.emit("photo_and_record", {});
};
// CMD: request_gimbal_attitude (0x0D)
Siyi_camera.prototype.request_gimbal_attitude = function () {
  const buffer = Buffer.alloc(0);

  return this.encodePacket(0x0d, buffer);
};

Siyi_camera.prototype.decode_request_gimbal_attitude = function (buffer) {
  this.emit("request_gimbal_attitude", {});
};
// CMD: gimbal_angle_control (0x0E)
Siyi_camera.prototype.gimbal_angle_control = function (yaw, pitch) {
  const buffer = Buffer.alloc(4);
  buffer.writeInt16LE(yaw, 0);
  buffer.writeInt16LE(pitch, 2);
  return this.encodePacket(0x0e, buffer);
};

Siyi_camera.prototype.decode_gimbal_angle_control = function (buffer) {
  this.emit("gimbal_angle_control", {});
};
// CMD: single_axis_control (0x41)
Siyi_camera.prototype.single_axis_control = function (
  angle,
  single_control_flag
) {
  const buffer = Buffer.alloc(3);
  buffer.writeInt16LE(angle, 0);
  buffer.writeUInt8(single_control_flag, 2);
  return this.encodePacket(0x41, buffer);
};

Siyi_camera.prototype.decode_single_axis_control = function (buffer) {
  this.emit("single_axis_control", {});
};
// CMD: request_camera_codec (0x20)
Siyi_camera.prototype.request_camera_codec = function (req_stream_type) {
  const buffer = Buffer.alloc(1);
  buffer.writeUInt8(req_stream_type, 0);
  return this.encodePacket(0x20, buffer);
};

Siyi_camera.prototype.decode_request_camera_codec = function (buffer) {
  this.emit("request_camera_codec", {
    stream_type: buffer.readUInt8(0),
    video_enc_type: buffer.readUInt8(1),
    resolution_l: buffer.readUInt16LE(2),
    resolution_h: buffer.readUInt16LE(4),
    video_bitrate: buffer.readUInt16LE(6),
    video_frame_rate: buffer.readUInt8(8),
  });
};
// CMD: send_camera_codec (0x21)
Siyi_camera.prototype.send_camera_codec = function (
  stream_type,
  video_enc_type,
  resolution_l,
  resolution_h,
  video_bitrate,
  reserve
) {
  const buffer = Buffer.alloc(9);
  buffer.writeUInt8(stream_type, 0);
  buffer.writeUInt8(video_enc_type, 1);
  buffer.writeUInt16LE(resolution_l, 2);
  buffer.writeUInt16LE(resolution_h, 4);
  buffer.writeUInt16LE(video_bitrate, 6);
  buffer.writeUInt8(reserve, 8);
  return this.encodePacket(0x21, buffer);
};

Siyi_camera.prototype.decode_send_camera_codec = function (buffer) {
  this.emit("send_camera_codec", {
    stream_type: buffer.readUInt8(0),
    sta: buffer.readUInt8(1),
  });
};
// CMD: request_camera_image_mode (0x20)
Siyi_camera.prototype.request_camera_image_mode = function () {
  const buffer = Buffer.alloc(0);

  return this.encodePacket(0x20, buffer);
};

Siyi_camera.prototype.decode_request_camera_image_mode = function (buffer) {
  this.emit("request_camera_image_mode", { vdisp_mode: buffer.readUInt8(0) });
};
// CMD: send_camera_image_mode (0x11)
Siyi_camera.prototype.send_camera_image_mode = function (vdisp_mode) {
  const buffer = Buffer.alloc(1);
  buffer.writeUInt8(vdisp_mode, 0);
  return this.encodePacket(0x11, buffer);
};

Siyi_camera.prototype.decode_send_camera_image_mode = function (buffer) {
  this.emit("send_camera_image_mode", { vdisp_mode: buffer.readUInt8(0) });
};
// CMD: request_point_temperature (0x12)
Siyi_camera.prototype.request_point_temperature = function (
  x,
  y,
  get_temp_flag
) {
  const buffer = Buffer.alloc(5);
  buffer.writeUInt16LE(x, 0);
  buffer.writeUInt16LE(y, 2);
  buffer.writeUInt8(get_temp_flag, 4);
  return this.encodePacket(0x12, buffer);
};

Siyi_camera.prototype.decode_request_point_temperature = function (buffer) {
  this.emit("request_point_temperature", {
    temp: buffer.readUInt8(0),
    x: buffer.readUInt16LE(1),
    y: buffer.readUInt16LE(3),
  });
};

// ENCODE THE PACKET
Siyi_camera.prototype.encodePacket = function (cmdId, payload) {
  const dataLen = payload ? payload.length : 0;
  const packetLen = 10 + dataLen;
  const buffer = Buffer.alloc(packetLen);
  let offset = 0;
  buffer.writeUInt16LE(0x6655, offset);
  offset += 2;
  buffer.writeUInt8(0x01, offset++);
  buffer.writeUInt16LE(dataLen, offset);
  offset += 2;
  buffer.writeUInt16LE(0x0000, offset);
  offset += 2;
  buffer.writeUInt8(cmdId, offset++);
  if (dataLen > 0) {
    payload.copy(buffer, offset);
    offset += dataLen;
  }
  const crcVal = this.calculateCRC16(buffer.slice(0, offset));
  buffer.writeUInt16LE(crcVal, offset);
  return buffer;
};
Siyi_camera.prototype.calculateCRC16 = function (buffer) {
  const polynomial = 0x1021; // CRC-16-CCITT polynomial
  let crc = 0x0; // Initial value
  for (let i = 0; i < buffer.length; i++) {
    const byte = buffer[i];
    crc ^= byte << 8; // XOR the byte into the CRC register

    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = (crc << 1) ^ polynomial;
      } else {
        crc <<= 1;
      }
      crc &= 0xffff; // keep CRC 16-bit
    }
  }
  // console.log("CRC : ", crc.toString(16))
  return crc; // CRC as a number
};
Siyi_camera.prototype.buffer_parser = function (buffer) {
  let offset = 0;
  // STX
  const stx = buffer.readUInt16LE(offset);
  offset += 2;
  if (stx !== 0x6655) return;
  // CTRL
  const ctrl = buffer.readUInt8(offset++);
  // Data length
  const dataLen = buffer.readUInt16LE(offset);
  offset += 2;
  // SEQ
  const seq = buffer.readUInt16LE(offset);
  offset += 2;
  // CMD_ID
  const cmdId = buffer.readUInt8(offset++);
  // DATA
  const data = buffer.slice(offset, offset + dataLen);
  offset += dataLen;
  switch (cmdId) {
    case 0x01: // request_firmware_version;
      this.decode_request_firmware_version(data);
      break;
    case 0x02: // request_hardware_id;
      this.decode_request_hardware_id(data);
      break;
    case 0x19: // request_gimbal_mode;
      this.decode_request_gimbal_mode(data);
      break;
    case 0x04: // auto_focus;
      this.decode_auto_focus(data);
      break;
    case 0x05: // manual_zoom_auto_focus;
      this.decode_manual_zoom_auto_focus(data);
      break;
    case 0x0f: // absolute_zoom_auto_focus;
      this.decode_absolute_zoom_auto_focus(data);
      break;
    case 0x16: // request_max_zoom_value;
      this.decode_request_max_zoom_value(data);
      break;
    case 0x18: // request_current_zoom_value;
      this.decode_request_current_zoom_value(data);
      break;
    case 0x06: // manual_focus;
      this.decode_manual_focus(data);
      break;
    case 0x07: // gimbal_rotation;
      this.decode_gimbal_rotation(data);
      break;
    case 0x08: // center;
      this.decode_center(data);
      break;
    case 0x0a: // request_gimbal_config;
      this.decode_request_gimbal_config(data);
      break;
    case 0x0b: // function_feedback;
      this.decode_function_feedback(data);
      break;
    case 0x0c: // photo_and_record;
      this.decode_photo_and_record(data);
      break;
    case 0x0d: // request_gimbal_attitude;
      this.decode_request_gimbal_attitude(data);
      break;
    case 0x0e: // gimbal_angle_control;
      this.decode_gimbal_angle_control(data);
      break;
    case 0x41: // single_axis_control;
      this.decode_single_axis_control(data);
      break;
    case 0x20: // request_camera_codec;
      this.decode_request_camera_codec(data);
      break;
    case 0x21: // send_camera_codec;
      this.decode_send_camera_codec(data);
      break;
    case 0x20: // request_camera_image_mode;
      this.decode_request_camera_image_mode(data);
      break;
    case 0x11: // send_camera_image_mode;
      this.decode_send_camera_image_mode(data);
      break;
    case 0x12: // request_point_temperature;
      this.decode_request_point_temperature(data);
      break;
    default:
      console.log("Unknown command ID:", cmdId);
      break;
  }
};
util.inherits(Siyi_camera, events.EventEmitter);
module.exports = { Siyi_camera };
