/*
 * Copyright (c) Jan Sohn
 * All rights reserved.
 * Only people with the explicit permission from Jan Sohn are allowed to modify, share or distribute this code.
 */

const {UPDATE_SERVER} = require("../PacketIds");
const Packet = require("./Packet.js");

class UpdateServerPacket extends Packet {
	network = null;
	server = null;
	ends_at = null;

	/**
	 * @param {null|string} network
	 * @param {null|string} server
	 * @param {null|number} ends_at
	 */
	constructor(network, server, ends_at) {
		super(UPDATE_SERVER);
		this.network = network;
		this.server = server;
		this.ends_at = ends_at;
		console.log(network, server, ends_at);
	}

	decodePayload(serializer) {
		this.network = serializer.get("network");
		this.server = serializer.get("server");
		this.ends_at = serializer.get("ends_at");
	}

	encodePayload(serializer) {
		serializer.put("network", this.network);
		serializer.put("server", this.server);
		serializer.put("ends_at", this.ends_at);
	}
}
module.exports = UpdateServerPacket;