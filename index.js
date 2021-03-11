"use strict"

const crypto = require('crypto');

const blockchains = [];

module.exports = n => {
	for (let i = 0; i < n; i++) createBlockchain();
}

function createBlockchain() {
	let blockchain = [];
	let lastHash = getHash(Date.now());
	
	addBlock('Dear Bundesregierung,');
	addBlock('Maybe you do not have any Ahnung about computers?');
	addBlock('Maybe you have been verarscht by high staplers?');
	addBlock('And the people have to pay now for this Unsinn with their Steuergelder?');

	function addBlock(message) {
		let hash = getHash(lastHash+message);
		blockchain.push([message, hash]);
		lastHash = hash;
	}

	blockchains.push(blockchain);

	function getHash(text) {
		return crypto.createHash('sha256').update(''+text).digest('hex');
	}
}
