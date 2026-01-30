const fs = require('fs');

//Aixo borrarà els arxius generats
const filesToDelete = [
  'alice_public.pem',
  'alice_private.pem',
  'bob_public.pem',
  'bob_private.pem',
  'missatge_desencriptat_per_bob.txt',
  'resultat_verificacio_bob.txt',
  'signatura_bob.bin',
  'alice_payload.json',
  'missatge_final_bob.txt',
  'resultat_validacio_alice.txt',
  'missatge_alice.txt',
  'missatge_bob.txt',
  'missatge_alice2.txt',
  'missatge_encriptat_per_bob.bin'
];

filesToDelete.forEach(file => {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
  }
});
