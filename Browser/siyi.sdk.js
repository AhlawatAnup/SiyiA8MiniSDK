// BUFFER FOR BROWSER
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
    ATTITUDE_DATA: "22",
    GIMBAL_CONFIG_INFO: "0A",
    PHOTO_AND_VIDEO: "0C",
    FUNCTION_FEEDBACK_INFO: "0B",
    GIMBAL_CONTROL_ANGLE: "0E",
    GPS_DATA_TO_CAMERA: "3E",
    FORMAT_SD_CARD: "48",
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

  //   CALCULATING CRC16 CHECKSUM

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
  request_gimbal_configuration_info() {
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

  // SEND GPS DATA TO GIMBAL
  send_gps_data_to_camera(
    time_boot_ms,
    lat,
    lon,
    alt,
    alt_ellipsoid,
    vn,
    ve,
    vd
  ) {
    const send_gps_data_command =
      this.command_header() +
      this.data_len("2000") +
      this.sequence("0000") +
      this.COMMAND_ID.GPS_DATA_TO_CAMERA +
      this.createBufferFromInt32(time_boot_ms, 4) +
      this.createBufferFromInt32(lat, 4) +
      this.createBufferFromInt32(lon, 4) +
      this.createBufferFromInt32(alt, 4) +
      this.createBufferFromInt32(alt_ellipsoid, 4) +
      this.createBufferFromFloat(vn) +
      this.createBufferFromFloat(ve) +
      this.createBufferFromFloat(vd);
    console.log("GPS DATA TO CAMERA ...", send_gps_data_command);

    return Buffer.from(
      send_gps_data_command +
        this.verify_command(send_gps_data_command).toString(16),
      "hex"
    );
  }

  // SEND HARDWARE ID
  request_hardware_id() {
    const request_camera_hardware_id =
      this.command_header() +
      this.data_len("0000") +
      this.sequence("0000") +
      this.COMMAND_ID.CAMERA_HARDWARE_ID;
    console.log("HARDWARE REQUEST");
    return Buffer.from(
      request_camera_hardware_id +
        this.verify_command(request_camera_hardware_id).toString(16),
      "hex"
    );
  }

  // SEND ATTITUDE DATA TO CAMERA
  send_attitude_data(
    time_boot_ms,
    roll,
    pitch,
    yaw,
    rollspeed,
    pitchspeed,
    yawspeed
  ) {
    const send_attitude_data =
      this.command_header() +
      this.data_len("1C00") +
      this.sequence("0000") +
      this.COMMAND_ID.ATTITUDE_DATA +
      this.createBufferFromInt32(time_boot_ms, 4) +
      this.createBufferFromFloat(roll) +
      this.createBufferFromFloat(pitch) +
      this.createBufferFromFloat(yaw) +
      this.createBufferFromFloat(rollspeed) +
      this.createBufferFromFloat(pitchspeed) +
      this.createBufferFromFloat(yawspeed);

    console.log(
      "Sending Attitude Data...",
      Buffer.from(
        send_attitude_data +
          this.verify_command(send_attitude_data).toString(16),
        "hex"
      )
    );
    return Buffer.from(
      send_attitude_data + this.verify_command(send_attitude_data).toString(16),
      "hex"
    );
  }

  // FORMAT SD CARD
  format_sd_card() {
    const format_sd_card =
      this.command_header() +
      this.data_len("0000") +
      this.sequence("0000") +
      this.COMMAND_ID.FORMAT_SD_CARD;
    console.log("SD CARD FORMAT");
    return Buffer.from(
      format_sd_card + this.verify_command(format_sd_card).toString(16),
      "hex"
    );
  }

  // SEND CONTROL TO GIMBAL
  send_angle_control_gimbal(yaw, pitch) {
    const send_gimbal_angle_control =
      this.command_header() +
      this.data_len("0400") +
      this.sequence("0000") +
      this.COMMAND_ID.GIMBAL_CONTROL_ANGLE +
      this.createBufferFromInt16(yaw) +
      this.createBufferFromInt16(pitch);

    return Buffer.from(
      send_gimbal_angle_control +
        this.verify_command(send_gimbal_angle_control).toString(16),
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

      case this.COMMAND_ID.GIMBAL_CONFIG_INFO.toLowerCase():
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

      case this.COMMAND_ID.CAMERA_HARDWARE_ID.toLowerCase():
        this.unpack_function_feedback(
          buff_array.splice(
            this.PROT_CONSTANT.DATA_INDEX,
            this.PROT_CONSTANT.DATA_INDEX +
              buff_array[this.PROT_CONSTANT.DATA_LEN_INDEX]
          )
        );
        break;

      case this.COMMAND_ID.FORMAT_SD_CARD.toLowerCase():
        this.unpack_format_sd_card_ack(
          buff_array.splice(
            this.PROT_CONSTANT.DATA_INDEX,
            this.PROT_CONSTANT.DATA_INDEX +
              buff_array[this.PROT_CONSTANT.DATA_LEN_INDEX]
          )
        );
        break;

      case this.COMMAND_ID.GIMBAL_CONTROL_ANGLE.toLowerCase():
        this.unpack_gimbal_control_angle(
          buff_array.splice(
            this.PROT_CONSTANT.DATA_INDEX,
            this.PROT_CONSTANT.DATA_INDEX +
              buff_array[this.PROT_CONSTANT.DATA_LEN_INDEX]
          )
        );
        break;

      case this.COMMAND_ID.CENTER_CAMERA.toLowerCase():
        this.unpack_center_camera_ack(
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

  // UNPACK CAMERA HARDWARE ID
  unpack_camera_hardware_id(data) {
    this.dispatchEvent(
      new CustomEvent("CAMERA_HARDWARE_ID", {
        detail: { hardware_id: data[1] },
      })
    );
  }

  // UNPACK FORMAT SD CARD ACK
  unpack_format_sd_card_ack(data) {
    this.dispatchEvent(
      new CustomEvent("FORMAT_SD_CARD", {
        detail: {
          format_sta: data[0],
        },
      })
    );
  }

  // UNPACK GIMBAL CONTROL ANGLE ACK
  unpack_gimbal_control_angle(data) {
    this.dispatchEvent(
      new CustomEvent("GIMBAL_CONTROL_ANGLE", {
        detail: {
          yaw: Number("0x" + data[1] + data[0]) / 10,
          pitch: Number("0x" + data[3] + data[2]) / 10,
          roll: Number("0x" + data[5] + data[4]),
        },
      })
    );
  }

  // UNPACK CENTER COMMAND
  unpack_center_camera_ack(data) {
    this.dispatchEvent(
      new CustomEvent("CENTER_CAMERA", {
        detail: {
          sta: data[0],
        },
      })
    );
  }

  // CONVERTING BUFFER TO HEX ARRAY
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

  createBufferFromFloat(value) {
    const buffer = Buffer.alloc(4);
    buffer.writeFloatLE(value, 0);
    return buffer.toString("hex");
  }

  // CONVERT VALUE TO INT16 LITTLE ENDIAN
  createBufferFromInt16(value) {
    const buffer = Buffer.alloc(2);
    buffer.writeInt16LE(value, 0);
    return buffer.toString("hex");
  }

  createBufferFromInt32(value) {
    const buffer = Buffer.alloc(4); // Allocate 4 bytes
    buffer.writeInt32LE(value, 0); // Write the integer in little-endian format at offset 0
    return buffer.toString("hex");
  }
}

export { SiyiA8SDK };
