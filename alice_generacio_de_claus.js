const crypto = require('crypto');
const fs = require('fs');

const aliceKeys = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
    }
});

fs.writeFileSync('alice_public.pem', aliceKeys.publicKey);
fs.writeFileSync('alice_private.pem', aliceKeys.privateKey);

console.log('Claus d\'Alice generades');