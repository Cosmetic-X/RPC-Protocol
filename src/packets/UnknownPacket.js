/*
 * Copyright (c) Jan Sohn
 * All rights reserved.
 * Only people with the explicit permission from Jan Sohn are allowed to modify, share or distribute this code.
 */

const {UNKNOWN} = require("../PacketIds.js");
const Packet = require("./Packet.js");

class UnknownPacket extends Packet {
	constructor() {
		super(UNKNOWN);
	}
}
module.exports = UnknownPacket;