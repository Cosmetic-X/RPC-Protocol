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
		super(HEARTBEAT);
		this.timestamp = new Date().getTime() / 1000;
	}

	decodePayload(serializer) {
		this.timestamp = serializer.get("timestamp");
	}

	encodePayload(serializer) {
		serializer.put("timestamp", this.timestamp);
	}
}
module.exports = HeartbeatPacket;