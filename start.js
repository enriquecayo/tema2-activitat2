const fs = require('fs');
const { execSync } = require('child_process');

const messageFiles = [ //Es pot fer manualment o canviar el missatge aqui
  {
    name: 'missatge_alice.txt',
    content: 'Missatge secret d’Alice per Bob.'
  },
  {
    name: 'missatge_bob.txt',
    content: 'Missatge de Bob signat digitalment.'
  },
  {
    name: 'missatge_alice2.txt',
    content: 'Missatge d’Alice encriptat i signat.'
  }
];

const scripts = [
  'alice_generacio_de_claus.js',
  'bob_generacio_de_claus.js',
  'alice_encripta_missatge.js',
  'bob_desencripta_missatge.js',
  'bob_signa_missatge.js',
  'alice_verifica_missatge.js',
  'alice_encripta_signa_missatge.js',
  'bob_desencripta_valida_missatge.js'
];

messageFiles.forEach(file => {
  if (!fs.existsSync(file.name)) {
    fs.writeFileSync(file.name, file.content);
  }
});

scripts.forEach(script => {
  if (!fs.existsSync(script)) {
    throw new Error(`No existeix el fitxer ${script}`);
  }
  execSync(`node ${script}`, { stdio: 'inherit' });
});
