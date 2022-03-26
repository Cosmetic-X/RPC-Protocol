/*
 * Copyright (c) Jan Sohn
 * All rights reserved.
 * Only people with the explicit permission from Jan Sohn are allowed to modify, share or distribute this code.
 */

const {CONNECT} = require("../PacketIds");
const Packet = require("./Packet.js");

class ConnectPacket extends Packet {
	null = null;

	getPacketId() {
		return CONNECT;
	}

	decodePayload(serializer) {
		this.network = serializer.get("null");
	}

	encodePayload(serializer) {
		serializer.put("null", this.null);
	}
}
module.exports = ConnectPacket;