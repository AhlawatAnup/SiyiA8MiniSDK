// BUFFER FO BROWSER
var Buffer = require("buffer/").Buffer;

// Declaring a Class
class SiyiA8SDK extends EventTarget {
  constructor() {
    super();
  }

  // PROTOCOL CONSTANTS
  PROT_CONSTANT = {
    STX_INDEX: 0, // 2 BYTE
    CTRL_INDEX: 2, // 1 BYTE
    DATA_LEN_INDEX: 3, // 2 BYTES
    SEQ_INDEX: 5, // 1 BYTE
    COMMAND_ID_INDEX: 7, // 1 BYTE
    DATA_INDEX: 8, // DATA LENGTH BYTES
  };

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
    GIMBAL_CONFIG_INFO: "0a",
    PHOTO_AND_VIDEO: "0C",
    FUNCTION_FEEDBACK_INFO: "0B",
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

  // COMMAND TO CENTER THE CAMERA TO INITIAL POSITION
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
  //   ALERT!!!! THIS WON'T ROTATE THE GIMBAL TO SPECIFIC ANGLE BUT THESE DEGREE DEFINE THE
  //   SPEED OF ROTATION TO ROTATE THE CAMERA AT PARTICULAR ANGLE YOU HAVE HANDLE THE LOGIC TO
  //   STOP THE CAMERA UNDER STOP CAMERA COMMAND(DEGREE SHOULD BE HEXADECIMAL)
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

  // REQUEST CAMERA CODEC
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

  // REQUEST GIMBAL CONFIGURATION INFO
  request_gimbal_configuaration_info() {
    const gimbal_config_info_command =
      this.command_header() +
      this.data_len("0000") +
      this.sequence("0000") +
      this.COMMAND_ID.GIMBAL_CONFIG_INFO +
      "";
    console.log("REQUEST GIMBAL CONFIG ...");
    return Buffer.from(
      gimbal_config_info_command + "0f75",
      // this.verify_command(gimbal_config_info_command).toString(16),
      "hex"
    );
  }

  // REQUEST FW VERSION
  request_camera_fw_version() {
    const request_camera_fw_version_command =
      this.command_header() +
      this.data_len("0000") +
      this.sequence("0000") +
      this.COMMAND_ID.CAMERA_FIRMWARE_VERSION +
      "";
    console.log("FIRMWARE VERSION REQUEST");
    return Buffer.from(
      request_camera_fw_version_command +
        this.verify_command(request_camera_fw_version_command).toString(16),
      "hex"
    );
  }

  // SEND CAMERA CODEC TO CAMERA
  send_camera_codec() {
    const send_camera_codec_command =
      this.command_header() +
      this.data_len("0900") +
      this.sequence("0000") +
      this.COMMAND_ID.SEND_CODEC_SPEC +
      "01" +
      "02" +
      "80" +
      "07" +
      "38" +
      "04" +
      "A0" +
      "0F" +
      "00";
    console.log(
      this.verify_command(send_camera_codec_command).toString(16),
      "  :",
      send_camera_codec_command
    );
    return Buffer.from(
      send_camera_codec_command +
        this.verify_command(send_camera_codec_command).toString(16),
      "hex"
    );
  }

  // PHOTO AND VIDEO
  photo_and_video(action) {
    const request_camera_codec_spec_command =
      this.command_header() +
      this.data_len("0100") +
      this.sequence("0000") +
      this.COMMAND_ID.PHOTO_AND_VIDEO +
      action;
    console.log("PHOTO AND RECORD COMMAND ...");

    return Buffer.from(
      request_camera_codec_spec_command +
        this.verify_command(request_camera_codec_spec_command).toString(16),
      "hex"
    );
  }

  // PARSE INCOMING BUFFER
  parseBuffer(buffer) {
    const buff_array = this.convert_buffer_to_hex_array(new Uint8Array(buffer));
    switch (buff_array[this.PROT_CONSTANT.COMMAND_ID_INDEX]) {
      case this.COMMAND_ID.CAMERA_FIRMWARE_VERSION:
        this.unpack_fw_version(
          buff_array.splice(
            this.PROT_CONSTANT.DATA_INDEX,
            this.PROT_CONSTANT.DATA_INDEX +
              buff_array[this.PROT_CONSTANT.DATA_LEN_INDEX]
          )
        );
        break;

      case this.COMMAND_ID.CAMERA_CODEC_SPEC:
        // console.log("Here");
        this.unpack_camera_codec(
          buff_array.splice(
            this.PROT_CONSTANT.DATA_INDEX,
            this.PROT_CONSTANT.DATA_INDEX +
              buff_array[this.PROT_CONSTANT.DATA_LEN_INDEX]
          )
        );
        break;

      case this.COMMAND_ID.GIMBAL_CONFIG_INFO:
        this.unpack_gimbal_camera_configuration(
          buff_array.splice(
            this.PROT_CONSTANT.DATA_INDEX,
            this.PROT_CONSTANT.DATA_INDEX +
              buff_array[this.PROT_CONSTANT.DATA_LEN_INDEX]
          )
        );
        break;

      case this.COMMAND_ID.FUNCTION_FEEDBACK_INFO.toLowerCase():
        this.unpack_function_feedback(
          buff_array.splice(
            this.PROT_CONSTANT.DATA_INDEX,
            this.PROT_CONSTANT.DATA_INDEX +
              buff_array[this.PROT_CONSTANT.DATA_LEN_INDEX]
          )
        );
        break;
    }
  }

  // UNPACKING FW VERSION
  unpack_fw_version(data) {
    const code_board_ver =
      Number(data[2]) + "." + Number(data[1]) + "." + Number(data[0]);
    const gimbal_firmware_ver =
      Number(data[6]) + "." + Number(data[5]) + "." + Number(data[4]);

    this.dispatchEvent(
      new CustomEvent("FIRMWARE_VERSION", {
        detail: {
          code_board_ver: code_board_ver,
          gimbal_firmware_ver: gimbal_firmware_ver,
          zoom_firmware_ver: "Not Supported",
        },
      })
    );
  }

  // UNPACK CAMERA CODEC
  unpack_camera_codec(data) {
    // console.log("Inside Camera Codec", data);
    const stream_type = Number(data[0]);
    const VideoEncType = Number(data[1]);
    const Resolution_L = Number("0x" + data[3] + data[2]);
    const Resolution_H = Number("0x" + data[5] + data[4]);
    const VideoBitrate = Number("0x" + data[7] + data[6]);
    const VideoFrameRate = Number("0x" + data[8]);

    this.dispatchEvent(
      new CustomEvent("CAMERA_CODEC", {
        detail: {
          stream_type: stream_type,
          VideoEncType: VideoEncType,
          Resolution_L: Resolution_L,
          Resolution_H: Resolution_H,
          VideoBitrate: VideoBitrate,
          VideoFrameRate: VideoFrameRate,
        },
      })
    );
  }

  // UNPACK CAMERA GIMBAL CONFIGURATION
  unpack_gimbal_camera_configuration(data) {
    this.dispatchEvent(
      new CustomEvent("GIMBAL_CONFIG_INFO", {
        detail: {
          hdr_sta: Number(data[1]),
          record_sta: Number(data[3]),
          gimbal_motion_mode: Number(data[4]),
          gimbal_mounting_dir: Number(data[5]),
          video_hdmi_or_cvbs: Number(data[6]),
        },
      })
    );
  }

  // UNPACK FUNCTION FEEDBACK INFO
  unpack_function_feedback(data) {
    this.dispatchEvent(
      new CustomEvent("FUNCTION_FEEDBACK_INFO", {
        detail: {
          info_type: Number(data[0]),
          custom_status: "0 Means Success",
        },
      })
    );
  }
  // CONVERTING BUFFER TO HE ARRAY
  convert_buffer_to_hex_array(buffer) {
    const hexArray = [];
    buffer.forEach((element) => {
      let hex = element.toString(16);
      if (hex.length == 1) hex = "0" + hex;
      hexArray.push(hex);
      // console.log(hex);
    });
    return hexArray;
  }
}

export { SiyiA8SDK };