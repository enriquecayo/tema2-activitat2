const crypto = require('crypto');
const fs = require('fs');

const bobKeys = crypto.generateKeyPairSync('rsa', {
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

fs.writeFileSync('bob_public.pem', bobKeys.publicKey);
fs.writeFileSync('bob_private.pem', bobKeys.privateKey);

console.log('Claus d\'Bob generades');