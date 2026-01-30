const crypto = require('crypto');
const fs = require('fs');

const messageAlice = fs.readFileSync('missatge_alice.txt');
const bobPublicKey = fs.readFileSync('bob_public.pem');

const encryptedForBob = crypto.publicEncrypt(
    {
        key: bobPublicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
    },
    messageAlice
);


fs.writeFileSync('missatge_encriptat_per_bob.bin', encryptedForBob);
console.log('Missatge encriptat per Bob');