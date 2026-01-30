const crypto = require('crypto');
const fs = require('fs');

const bobMessage = fs.readFileSync('missatge_bob.txt');
const bobPrivateKey = fs.readFileSync('bob_private.pem');

const sign = crypto.createSign('RSA-SHA256');
sign.update(bobMessage);
sign.end();

const bobSignature = sign.sign(bobPrivateKey);

fs.writeFileSync('signatura_bob.bin', bobSignature);