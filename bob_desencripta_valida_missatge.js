const crypto = require('crypto');
const fs = require('fs');

const alicePublicKey = fs.readFileSync('alice_public.pem');
const bobPrivateKey = fs.readFileSync('bob_private.pem');
const payloadBob = JSON.parse(fs.readFileSync('alice_payload.json'));

const decryptedMsg = crypto.privateDecrypt(
    {
        key: bobPrivateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
    },
    Buffer.from(payloadBob.missatge_encriptat, 'base64')
);

const verifyAlice = crypto.createVerify('RSA-SHA256');
verifyAlice.update(decryptedMsg);
verifyAlice.end();

const validAlice = verifyAlice.verify(
    alicePublicKey,
    Buffer.from(payloadBob.signatura, 'base64')
);

fs.writeFileSync('missatge_final_bob.txt', decryptedMsg);
fs.writeFileSync(
    'resultat_validacio_alice.txt',
    validAlice ? "MISSATGE AUTÈNTIC D'ALICE" : 'MISSATGE NO VÀLID'
);
