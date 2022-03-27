/*
 * Copyright (c) Jan Sohn
 * All rights reserved.
 * Only people with the explicit permission from Jan Sohn are allowed to modify, share or distribute this code.
 */

const {CONNECT} = require("../PacketIds");
const Packet = require("./Packet.js");

class ConnectPacket extends Packet {
	gamertag = null;

	/**
	 * @param {null|string} gamertag
	 */
	constructor(gamertag) {
		super(CONNECT);
		this.gamertag = gamertag;
	}

	decodePayload(serializer) {
		this.gamertag = serializer.get("gamertag");
	}

	encodePayload(serializer) {
		serializer.put("gamertag", this.gamertag);
	}
}
module.exports = ConnectPacket;