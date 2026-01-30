const crypto = require('crypto');
const fs = require('fs');

const encryptedMessage = fs.readFileSync('missatge_encriptat_per_bob.bin');
const bobPrivateKey = fs.readFileSync('bob_private.pem');

const decryptedByBob = crypto.privateDecrypt(
    {
        key: bobPrivateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
    },
    encryptedMessage
);


fs.writeFileSync('missatge_desencriptat_per_bob.txt', decryptedByBob);
console.log('Missatge desencriptat per Bob');