/*
 * Copyright (c) Jan Sohn
 * All rights reserved.
 * Only people with the explicit permission from Jan Sohn are allowed to modify, share or distribute this code.
 */

const Serializer = require("../Serializer.js");

class Packet {
	static PID_MASK = 0x3ff;

	constructor() {
	}

	/**
	 * @return {number}
	 */
	getPacketId() {
		return -1;
	}

	/**
	 * @return string
	 */
	getName() {
		throw Error("Name is not set");
	}

	/**
	 * @param {Serializer} $in
	 */
	decodePayload($in) {
	}

	/**
	 * @param {Serializer} $in
	 */
	decode($in) {
		if (!$in instanceof Serializer) {
			throw new Error("Serializer is not correct");
		}
		$in.decompress();
		let header = Number.parseInt($in.get("__packet_id"));
		let pid = header & Packet.PID_MASK;

		if (pid !== this.getPacketId()) {
			throw new Error("Expected " + this.getPacketId() + " for packet ID, got " + pid);
		}
		this.decodePayload($in);
	}

	/**
	 * @param {Serializer} $out
	 */
	encodePayload($out) {
	}

	/**
	 * @param {Serializer} $out
	 */
	encode($out) {
		if (!$out instanceof Serializer) {
			throw new Error("Serializer is not correct");
		}
		$out.put("__packet_id", this.getPacketId());
		this.encodePayload($out);
		$out.compress();
	}

	/**
	 * @return {boolean}
	 */
	handle() {
		return false;
	}
}
module.exports = Packet;