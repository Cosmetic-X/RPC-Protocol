/*
 * Copyright (c) Jan Sohn
 * All rights reserved.
 * Only people with the explicit permission from Jan Sohn are allowed to modify, share or distribute this code.
 */

const {UPDATE_NETWORK} = require("../PacketIds");
const Packet = require("./Packet.js");

class UpdateNetworkPacket extends Packet {
	network = null;

	getPacketId() {
		return UPDATE_NETWORK;
	}

	decodePayload(serializer) {
		this.network = serializer.get("network");
	}

	encodePayload(serializer) {
		serializer.put("network", this.network);
	}
}
module.exports = UpdateNetworkPacket;