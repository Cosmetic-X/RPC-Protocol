/*
 * Copyright (c) Jan Sohn
 * All rights reserved.
 * Only people with the explicit permission from Jan Sohn are allowed to modify, share or distribute this code.
 */

const {DISCONNECT} = require("../PacketIds");
const Packet = require("./Packet.js");

class DisconnectPacket extends Packet {
	reason = null;

	/**
	 * @param {null|string} reason
	 */
	constructor(reason) {
		super(DISCONNECT);
		this.reason = reason;
	}

	decodePayload(serializer) {
		this.reason = serializer.get("reason");
	}

	encodePayload(serializer) {
		serializer.put("reason", this.reason);
	}
}
module.exports = DisconnectPacket;