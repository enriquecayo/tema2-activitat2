const crypto = require('crypto');
const fs = require('fs');

const aliceMessage = fs.readFileSync('missatge_alice2.txt');
const bobPublicKey = fs.readFileSync('bob_public.pem');
const alicePrivateKey = fs.readFileSync('alice_private.pem');

const encryptedMsg = crypto.publicEncrypt(
    {
        key: bobPublicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
    },
    aliceMessage
);

const signAlice = crypto.createSign('RSA-SHA256');
signAlice.update(aliceMessage);
signAlice.end();

const signatureAlice = signAlice.sign(alicePrivateKey);

const payload = {
    missatge_encriptat: encryptedMsg.toString('base64'),
    signatura: signatureAlice.toString('base64')
};

fs.writeFileSync('alice_payload.json', JSON.stringify(payload, null, 2));
