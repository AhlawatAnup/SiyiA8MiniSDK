// Debug test file - save as test.js
const events = require("node:events");
const util = require("util");

function Siyi_camera() {
  events.EventEmitter.call(this);
  console.log("Constructor called - EventEmitter initialized");
}

util.inherits(Siyi_camera, events.EventEmitter);

// Simple test method
Siyi_camera.prototype.test_emit = function () {
  console.log("About to emit test event");
  this.emit("test", { message: "Hello from emit!" });
  console.log("Emit called");
};

// Your existing methods...
Siyi_camera.prototype.decode_request_firmware_version = function (buffer) {
  console.log("decode_request_firmware_version called");
  console.log("this.emit exists:", typeof this.emit);
  console.log(
    "this instanceof EventEmitter:",
    this instanceof events.EventEmitter
  );

  try {
    this.emit("request_firmware_version", {
      hello: "hello",
    });
    console.log("Emit successful");
  } catch (error) {
    console.error("Emit failed:", error);
  }
};

Siyi_camera.prototype.buffer_parser = function (buffer) {
  console.log("buffer_parser called with buffer length:", buffer.length);

  if (buffer.length < 8) {
    console.log("Buffer too short");
    return;
  }

  let offset = 0;
  const stx = buffer.readUInt16LE(offset);
  offset += 2;

  console.log("STX:", stx.toString(16));

  if (stx !== 0x6655) {
    console.log("Invalid STX, expected 0x6655, got:", stx.toString(16));
    return;
  }

  const ctrl = buffer.readUInt8(offset++);
  const dataLen = buffer.readUInt16LE(offset);
  offset += 2;
  const seq = buffer.readUInt16LE(offset);
  offset += 2;
  const cmdId = buffer.readUInt8(offset++);

  console.log("CMD ID:", cmdId.toString(16));

  if (cmdId === 0x01) {
    const data = buffer.slice(offset, offset + dataLen);
    console.log("Calling decode_request_firmware_version");
    this.decode_request_firmware_version(data);
  }
};

module.exports = Siyi_camera;

// Test code - add this at the bottom or in a separate file
if (require.main === module) {
  console.log("=== Starting Tests ===");

  const camera = new Siyi_camera();

  // Test 1: Basic emit functionality
  console.log("\n--- Test 1: Basic emit ---");
  camera.on("test", (data) => {
    console.log("Event received:", data);
  });
  camera.test_emit();

  // Test 2: Firmware version emit
  console.log("\n--- Test 2: Firmware version ---");
  camera.on("request_firmware_version", (data) => {
    console.log("Firmware version event received:", data);
  });

  // Create a valid buffer for testing
  const testBuffer = Buffer.from([
    0x55,
    0x66, // STX (0x6655)
    0x01, // CTRL
    0x00,
    0x00, // Data length (0)
    0x00,
    0x00, // SEQ
    0x01, // CMD_ID (0x01 for firmware version)
    0x00,
    0x00, // CRC (dummy)
  ]);

  console.log("Test buffer:", testBuffer);
  camera.buffer_parser(testBuffer);

  console.log("\n=== Tests Complete ===");
}
