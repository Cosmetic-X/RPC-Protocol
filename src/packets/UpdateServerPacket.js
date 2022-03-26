/*
 * Copyright (c) Jan Sohn
 * All rights reserved.
 * Only people with the explicit permission from Jan Sohn are allowed to modify, share or distribute this code.
 */

const {UPDATE_SERVER} = require("../PacketIds");
const Packet = require("./Packet.js");

class UpdateServerPacket extends Packet {
	server = null;
	ends_at = null;

	getPacketId() {
		return UPDATE_SERVER;
	}

	decodePayload(serializer) {
		this.server = serializer.get("server");
		this.ends_at = serializer.get("ends_at");
	}

	encodePayload(serializer) {
		serializer.put("server", this.server);
		serializer.put("ends_at", this.ends_at);
	}
}
module.exports = UpdateServerPacket;