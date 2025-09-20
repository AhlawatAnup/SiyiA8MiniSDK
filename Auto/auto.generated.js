// AUTO GENERATED SCHEMA CODE GENERATED
const fs = require("fs");
const schema = require("./auto.generated.schema.json");
let output = `// THIS IS THE AUTO GENERATED FILE \n// DO NOT EDIT IT MANUALLY \n// IF YOU WANT TO ADD A NEW COMMAND MAKE A CHANGE TO SCHEMA`;

// SiYi CAMERA CLASS
output += `
// version : 2.0.0
const events = require("node:events");
util = require("util");
Siyi_camera = function() {};
`;
schema.commands.forEach((cmd) => {
  const request_encoder = encode_payload(cmd.request.fields);
  const response_parser = generate_decoder(cmd.response.fields);
  output += `// CMD: ${cmd.name} (${cmd.cmdId.toString(16)})
Siyi_camera.prototype.${cmd.name}=function(${cmd.request.fields
    .map((f) => f.name)
    .join(", ")}) {
  const buffer = Buffer.alloc(${request_encoder.size});
  ${request_encoder.code}
  return this.encodePacket(${cmd.cmdId.toString(16)},buffer);
}

Siyi_camera.prototype.decode_${cmd.name}=function (buffer) {
    this.emit("${cmd.name}",{ ${response_parser.code}});
    }
`;
});

output += `
// ENCODE THE PACKET
Siyi_camera.prototype.encodePacket=function(cmdId, payload) {
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
 const crcVal =this.calculateCRC16(buffer.slice(0, offset));
 buffer.writeUInt16LE(crcVal, offset)
  return buffer;
}
Siyi_camera.prototype.calculateCRC16=function(buffer) {
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
            crc &= 0xFFFF; // keep CRC 16-bit
        }
    }
// console.log("CRC : ", crc.toString(16))
    return crc; // CRC as a number
}
`;

output += `Siyi_camera.prototype.buffer_parser=function(buffer) {
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
  ${generateSwitch(schema)}
};`;
// EXPORT MODULE
output += `util.inherits(Siyi_camera, events.EventEmitter);\nmodule.exports = {Siyi_camera};`;

// GET SIZE OFFSET
function getTypeSize(field) {
  switch (field.type) {
    case "uint8":
    case "int8":
      return 1;
    case "uint16":
    case "int16":
      return 2;
    case "uint32":
    case "int32":
      return 4;
    case "string":
      return field.length;
    default:
      throw new Error("Unknown type " + field.type);
  }
}

// CREATE HEX BUFFER FROM VALUES
function encode_payload(fields) {
  let code = [];
  let offset = 0;
  fields.forEach((f) => {
    if (f.type === "uint8") {
      code.push(`buffer.writeUInt8(${f.name}, ${offset});`);
    } else if (f.type === "int8") {
      code.push(`buffer.writeInt8(${f.name}, ${offset});`);
    } else if (f.type === "uint16") {
      code.push(`buffer.writeUInt16LE(${f.name}, ${offset});`);
    } else if (f.type === "int16") {
      code.push(`buffer.writeInt16LE(${f.name}, ${offset});`);
    } else if (f.type === "uint32") {
      code.push(`buffer.writeUInt32LE(${f.name}, ${offset});`);
    } else if (f.type === "int32") {
      code.push(`buffer.writeInt32LE(${f.name}, ${offset});`);
    } else if (f.type === "string") {
      code.push(`buffer.write(${f.name}, ${offset}, ${f.length}, "ascii");`);
    }
    offset += getTypeSize(f);
  });
  return { code: code.join(" "), size: offset };
}

function generate_decoder(fields) {
  let code = [];
  let offset = 0;
  fields.forEach((f) => {
    if (f.type === "uint8") {
      code.push(`${f.name}: buffer.readUInt8(${offset})`);
    } else if (f.type === "uint16") {
      code.push(`${f.name}: buffer.readUInt16LE(${offset})`);
    } else if (f.type === "uint32") {
      code.push(`${f.name}: buffer.readUInt32LE(${offset})`);
    } else if (f.type === "string") {
      code.push(
        `${f.name}: buffer.toString("ascii", ${offset}, ${offset + f.length})`
      );
    }
    offset += getTypeSize(f);
  });
  return { code: code.join(",\n    "), size: offset };
}

// DECODE PAYLOAD
// function buffer_parser(buffer) {
//   let offset = 0;
//   // STX
//   const stx = buffer.readUInt16LE(offset);
//   offset += 2;
//   if (stx !== 0x6655) return;
//   // CTRL
//   const ctrl = buffer.readUInt8(offset++);
//   // Data length
//   const dataLen = buffer.readUInt16LE(offset);
//   offset += 2;
//   // SEQ
//   const seq = buffer.readUInt16LE(offset);
//   offset += 2;
//   // CMD_ID
//   const cmdId = buffer.readUInt8(offset++);
//   // DATA
//   const data = buffer.slice(offset, offset + dataLen);
//   offset += dataLen;
// }

// GENERATE SWITCH STATEMENT FOR BUFFER PARSER
function generateSwitch(schema) {
  let switchCode = `switch (cmdId) {\n`;

  schema.commands.forEach((cmd) => {
    switchCode += `  case ${cmd.cmdId}: // ${cmd.name};
    this.decode_${cmd.name}(data)
    break;\n`;
  });

  switchCode += `  default:\n    console.log("Unknown command ID:", cmdId);\n    break;\n}`;
  return switchCode;
}

// WRITE TO FILE
fs.writeFileSync("siyi.camera_sdk.js", output);
console.log("SiYi Camera SDK generated!");
