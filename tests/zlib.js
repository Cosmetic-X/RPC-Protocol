/*
 * Copyright (c) Jan Sohn
 * All rights reserved.
 * Only people with the explicit permission from Jan Sohn are allowed to modify, share or distribute this code.
 */

const zlib = require('zlib');

let raw = '{"__packet_id:1.0":{"__packet_type:1.0":"test","__packet_data:1.0":{"test:1.0":"test"}}}';
let compressed = compress(raw);
let decompressed = decompress(compressed);

console.log(compressed);
console.log(decompressed);

function compress(_buffer) {
	if (_buffer.length >= 256) {
		console.log("Using level 7 compression");
		return zlib.deflateRawSync(_buffer, {level: 7}).toString('base64');
	} else {
		console.log("Using level 0 compression");
		return zlib.deflateRawSync(_buffer, {level: 0}).toString("base64");
	}
}

function decompress(_buffer) {
	return zlib.inflateRawSync(Buffer.from(_buffer, "base64"), {level: 7, maxOutputLength: 2 * 1024 * 1024}).toString();
}