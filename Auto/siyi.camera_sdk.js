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
  this.emit("request_gimbal_config", { sta: buffer.readUInt8(0) });
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
    default:
      console.log("Unknown command ID:", cmdId);
      break;
  }
};
util.inherits(Siyi_camera, events.EventEmitter);
module.exports = { Siyi_camera };
