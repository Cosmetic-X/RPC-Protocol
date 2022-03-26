/*
 * Copyright (c) Jan Sohn
 * All rights reserved.
 * Only people with the explicit permission from Jan Sohn are allowed to modify, share or distribute this code.
 */

const zlib = require("zlib");
const UnknownPacket = require("./packets/UnknownPacket.js");
const ConnectPacket = require("./packets/ConnectPacket.js");
const HeartbeatPacket = require("./packets/HeartbeatPacket.js");
const UpdateNetworkPacket = require("./packets/UpdateNetworkPacket.js");
const UpdateServerPacket = require("./packets/UpdateServerPacket.js");
const {UNKNOWN} = require("./PacketIds");

class PacketPool {
	static TAG_PACKET_ID = "__packet_id";
	static #instance = null;
	#pool = {};
	#packet_count = 0;

	constructor() {
		this.#pool = {};
		this.#packet_count = 0;
		this.registerPacket(new UnknownPacket());
		this.registerPacket(new ConnectPacket());
		this.registerPacket(new HeartbeatPacket());
		this.registerPacket(new UpdateNetworkPacket());
		this.registerPacket(new UpdateServerPacket());
	}

	/**
	 * @return {PacketPool}
	 */
	static getInstance() {
		if (PacketPool.#instance == null) {
			PacketPool.#instance = new PacketPool();
		}
		return PacketPool.#instance;
	}

	/**
	 * @return {number}
	 */
	getPacketCount() {
		return this.#packet_count;
	}

	/**
	 * @param {Packet} packet
	 */
	registerPacket(packet) {
		if (this.#pool[ packet.getPacketId() ] && packet.getPacketId() === UNKNOWN) {
			return;
		}
		if (!this.#pool[ packet.getPacketId() ]) {
			this.#packet_count++;
		}
		this.#pool[ packet.getPacketId() ] = packet;
	}

	/**
	 * @param {string} buffer
	 * @return {Packet}
	 */
	getPacket(buffer) {
		//buffer = zlib.inflateRawSync(buffer,{level:7,maxOutputLength:2 * 1024 * 1024}).toString();
		return this.getPacketById(JSON.parse(buffer)[ "__packet_id" ] & Packet.PID_MASK);
	}

	/**
	 * @param {int} pid
	 * @return {Packet}
	 */
	getPacketById(pid) {
		if (!this.#pool[ pid ]) {
			return new UnknownPacket();
		} else {
			let pool = this.#pool;
			return Object.assign(Object.create(Object.getPrototypeOf(pool[ pid ])), pool[ pid ]);
		}
	}
}
module.exports = PacketPool;