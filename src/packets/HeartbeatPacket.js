/*
 * Copyright (c) Jan Sohn
 * All rights reserved.
 * Only people with the explicit permission from Jan Sohn are allowed to modify, share or distribute this code.
 */

const {HEARTBEAT} = require("../PacketIds.js");
const Packet = require("./Packet.js");

class HeartbeatPacket extends Packet {
	timestamp;

	constructor() {
		super();
		this.timestamp = new Date().getMilliseconds() / 1000;
	}

	getPacketId() {
		return HEARTBEAT;
	}

	decodePayload(serializer) {
		this.timestamp = serializer.get("timestamp");
	}

	encodePayload(serializer) {
		serializer.put("timestamp", this.timestamp);
	}
}
module.exports = HeartbeatPacket;