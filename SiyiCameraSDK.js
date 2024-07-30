// Declaring a Class
class SiyiA8SDK {
  constructor() {}

  //COMMAND ID (1 BYTE) ...DEFINING THE COMMANDS IDs.
  //REFER TO THE A8_MINI_MANUAL.PDF( ATTACHED).FOR MORE IDS CURENTLY THESE 3 ARE IMPLEMENTED
  COMMAND_ID = {
    CAMERA_FIRMWARE_VERSION: "01",
    CAMERA_HARDWARE_ID: "02",
    AUTO_FOCUS: "04",
    MANUAL_ZOOM_AND_AUTO_FOCUS: "05",
    MANUAL_FOCUS: "06",
    GIMBAL_ROTATION: "07",
    CENTER_CAMERA: "08",
    CAMERA_IMAGE_MODE_REQUEST: "10",
    ABSOLUTE_ZOOM_AND_AUTO_FOCUS: "0F",
    MAX_ZOOM_VALUE_REQUEST: "16",
    CURRENT_ZOOM_VALUE_REQUEST: "18",
    CAMERA_PRESENT_WORKING_MODE: "19",
    CAMERA_CODEC_SPEC: "20",
    SEND_CODEC_SPEC: "21",
    PHOTO_AND_VIDEO: "0C",
  };

  //   COMMAND HEADER STX+ CTRL (2+ 1 BYTES)
  command_header() {
    const header = "5566" + "01"; // STX + CTRL AS PER SIYI DOCUMENTATION
    return header;
  }

  //   DATA LENGTH (2 BYTES)
  data_len(data_len) {
    return data_len;
  }

  //FRAME SEQUENCE (2 BYTE)
  sequence(sequence) {
    return sequence;
  }

  //   VERIFY COMMAND TO ADD CRC16 CHECKSUM
  verify_command(command) {
    return this.calculateCRC16(command);
  }

  //   CALCULATING CRC16 CHECSUM

  calculateCRC16(hexString) {
    const polynomial = 0x1021; // CRC-16-CCITT polynomial
    let crc = 0x0; // Initial value

    for (let i = 0; i < hexString.length; i += 2) {
      const byte = parseInt(hexString.substr(i, 2), 16);
      crc ^= byte << 8; // XOR the byte into the CRC register

      for (let j = 0; j < 8; j++) {
        if ((crc & 0x8000) !== 0) {
          crc = (crc << 1) ^ polynomial;
        } else {
          crc <<= 1;
        }
      }
    }

    return ((crc & 0xff) << 8) | ((crc >> 8) & 0xff);
  }

  // COMMAND TO CENTER THE CAMERA TO INITAL POSITION
  center_command() {
    const center_command =
      this.command_header() +
      this.data_len("0100") +
      this.sequence("0000") +
      this.COMMAND_ID.CENTER_CAMERA +
      "01";
    const center_command_buffer = Buffer.from(
      center_command + this.verify_command(center_command).toString(16),
      "hex"
    );
    return center_command_buffer;
  }

  //   THIS COMMAND WILL ROTATE THE GIMBAL(MORE THE DEGREE FAST IT WILL ROTATE)
  //   ALERT!!!! THIS WON'T ROTATE THE GIMABL TO SPECIFC ANGLE BUT THESE DEGREE DEFINE THE
  //   SPEED OF ROTATION TO ROTATE THE CAMERA AT PATICULAR ANGLE YOU HAVE HANDLE THE LOGIC TO
  //   STOP THE CAMERA UNDER STOP CAMERA COMMAND(DEGREE SHOULD BE HEXADECIAL)
  gimbal_rotate_command(YAW_IN_DEGREE, PITCH_IN_DEGREE) {
    const rotate_gimbal_command =
      this.command_header() +
      this.data_len("0200") +
      this.sequence("0000") +
      this.COMMAND_ID.GIMBAL_ROTATION +
      YAW_IN_DEGREE +
      PITCH_IN_DEGREE;
    console.log(
      this.verify_command(rotate_gimbal_command).toString(16),
      "  :",
      rotate_gimbal_command
    );
    return Buffer.from(
      rotate_gimbal_command +
        this.verify_command(rotate_gimbal_command).toString(16),
      "hex"
    );
  }
  // THIS WILL STOP THE CAMERA ROTATION
  stop_gimbal_rotation() {
    const stop_gimbal_command =
      this.command_header() +
      this.data_len("0200") +
      this.sequence("0000") +
      this.COMMAND_ID.GIMBAL_ROTATION +
      "00" +
      "00";
    console.log(
      this.verify_command(stop_gimbal_command).toString(16),
      "  :",
      stop_gimbal_command
    );
    return Buffer.from(
      stop_gimbal_command +
        this.verify_command(stop_gimbal_command).toString(16),
      "hex"
    );
  }

  //   START ZOOM
  start_zoom() {
    // IT WILL ZOOM IN STEPS
    const start_zoom_command =
      this.command_header() +
      this.data_len("0100") +
      this.sequence("0000") +
      this.COMMAND_ID.MANUAL_ZOOM_AND_AUTO_FOCUS +
      "01";
    console.log(
      this.verify_command(start_zoom_command).toString(16),
      "  :",
      start_zoom_command
    );
    return Buffer.from(
      start_zoom_command + this.verify_command(start_zoom_command).toString(16),
      "hex"
    );
  }

  //   STOP ZOOM
  stop_zoom() {
    // IT WILL STOP THE ZOOM
    const stop_zoom_command =
      this.command_header() +
      this.data_len("0100") +
      this.sequence("0000") +
      this.COMMAND_ID.MANUAL_ZOOM_AND_AUTO_FOCUS +
      "00";
    console.log(
      this.verify_command(stop_zoom_command).toString(16),
      "  :",
      stop_zoom_command
    );
    return Buffer.from(
      stop_zoom_command + this.verify_command(stop_zoom_command).toString(16),
      "hex"
    );
  }

  // ZOOM OUT
  zoom_out() {
    // IT WILL STOP THE ZOOM
    const zoom_out_command =
      this.command_header() +
      this.data_len("0100") +
      this.sequence("0000") +
      this.COMMAND_ID.MANUAL_ZOOM_AND_AUTO_FOCUS +
      "ff";
    console.log(
      this.verify_command(zoom_out_command).toString(16),
      "  :",
      zoom_out_command
    );
    return Buffer.from(
      zoom_out_command + this.verify_command(zoom_out_command).toString(16),
      "hex"
    );
  }

  request_camera_codec(stream_type) {
    const request_camera_codec_spec_command =
      this.command_header() +
      this.data_len("0100") +
      this.sequence("0000") +
      this.COMMAND_ID.CAMERA_CODEC_SPEC +
      stream_type;
    console.log(
      this.verify_command(request_camera_codec_spec_command).toString(16),
      "  :",
      request_camera_codec_spec_command
    );
    return Buffer.from(
      request_camera_codec_spec_command +
        this.verify_command(request_camera_codec_spec_command).toString(16),
      "hex"
    );
  }

  request_camera_fw_version() {
    const request_camera_fw_version_command =
      this.command_header() +
      this.data_len("0000") +
      this.sequence("0000") +
      this.COMMAND_ID.CAMERA_FIRMWARE_VERSION +
      "";
    console.log(
      this.verify_command(request_camera_fw_version_command).toString(16),
      "  :",
      request_camera_fw_version_command
    );
    return Buffer.from(
      request_camera_fw_version_command +
        this.verify_command(request_camera_fw_version_command).toString(16),
      "hex"
    );
  }
}

module.exports = SiyiA8SDK;
