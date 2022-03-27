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

	/**
	 * @param {null|string} server
	 * @param {null|number} ends_at
	 */
	constructor(server, ends_at) {
		super(UPDATE_SERVER);
		this.server = server;
		this.ends_at = ends_at;
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