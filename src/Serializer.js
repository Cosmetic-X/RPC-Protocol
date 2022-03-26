/*
 * Copyright (c) Jan Sohn
 * All rights reserved.
 * Only people with the explicit permission from Jan Sohn are allowed to modify, share or distribute this code.
 */

const zlib = require("zlib");

class Serializer {
	_buffer = "{}";

	/**
	 * @param {string} buffer
	 */
	constructor(buffer) {
		this._buffer = buffer || "{}";
	}

	static getSerializer(buffer) {
		return new Serializer(buffer || "{}");
	}

	compress() {
		if (this._buffer.length >= 256) {
			this._buffer = zlib.deflateRawSync(this._buffer, {level: 7}).toString();
		} else {
			this._buffer = zlib.deflateRawSync(this._buffer, {level: 0}).toString();
		}
	}

	decompress() {
		this._buffer = zlib.inflateRawSync(this._buffer, {level: 7, maxOutputLength: 2 * 1024 * 1024}).toString();
	}

	/**
	 * @return {string}
	 */
	getBuffer() {
		return this._buffer;
	}

	put(k, v) {
		if (k === undefined || v === undefined) {
			throw new Error("Argument not set");
		}
		let arr = JSON.parse(this._buffer);
		arr[ k ] = v;
		this._buffer = JSON.stringify(arr);
	}

	get(k) {
		if (!k) {
			throw new Error("Argument not set");
		}
		let arr = JSON.parse(this._buffer);
		return arr[ k ] || null;
	}

	remove(k) {
		if (!k) {
			throw new Error("Argument not set");
		}
		let arr = JSON.parse(this._buffer);
		delete arr[ k ];
		this._buffer = JSON.stringify(arr);
	}

}
module.exports = Serializer;