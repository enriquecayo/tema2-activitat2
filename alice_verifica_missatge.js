const crypto = require('crypto');
const fs = require('fs');

const bobPublicKey = fs.readFileSync('bob_public.pem');
const bobMessageVerify = fs.readFileSync('missatge_bob.txt');
const bobSignatureVerify = fs.readFileSync('signatura_bob.bin');

const verify = crypto.createVerify('RSA-SHA256');
verify.update(bobMessageVerify);
verify.end();

const valid = verify.verify(bobPublicKey, bobSignatureVerify);
fs.writeFileSync('resultat_verificacio_bob.txt', valid ? 'SIGNATURA VÀLIDA' : 'SIGNATURA NO VÀLIDA');
console.log('Verificació de Bob:', valid);