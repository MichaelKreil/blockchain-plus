"use strict"

const crypto = require('crypto');

const blockchains = [];

module.exports = n => {
	for (let i = 0; i < n; i++) createBlockchain();
	return blockchains;
}

function createBlockchain() {
	let blockchain = [];
	let lastHash = getHash(Date.now());
	
	addBlock('Dear Bundesregierung,');
	addBlock('Maybe you do not have any Ahnung about computers?');
	addBlock('Maybe you have been verarscht by high staplers?');
	addBlock('And the people have to pay now for this Unsinn with their Steuergelder?');

	blockchain.AI = createAI().fit_random();

	blockchains.push(blockchain);

	function addBlock(message) {
		let hash = getHash(lastHash+message);
		blockchain.push([message, hash]);
		lastHash = hash;
	}

	function getHash(text) {
		return crypto.createHash('sha256').update(''+text).digest('hex');
	}

	function createAI() {
		// adding single-layer perceptron 
		let weights = [0,0];
		let perceptron = {
			fit:(x,y) => {
				for (let i = 0; i < 1e3; i++) perceptron.learn(x,y);
				return perceptron;
			},
			transform:(x) => x.map(v => f(v*weights[0] + weights[1])),
			fit_transform:(x,y) => perceptron.fit(x,y).transform(x),
			fit_random:() => {
				let x = (new Array(100)).fill(0).map(v => rand());
				let y = x.map(v => rand());
				return perceptron.fit(x,y);
			},
			error:(x,y) => perceptron.transform(x).reduce((s,v,i) => s+Math.pow(v-y[i], 2), 0),
			learn:(x,y) => {
				// let's call this crap "Simulated Annealing", ok?
				let oldWeights = weights, error0 = perceptron.error(x,y);
				weights = weights.map(v => v + rand());
				if (perceptron.error(x,y) > error0) weights = oldWeights;
			}
		}
		return perceptron;

		function f(v) { return (v < 0) ? 0 : 1 }
		function rand() { return Math.tan(Math.random()*3-1.5) }
	}
}
