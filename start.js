const fs = require('fs');
const { fork } = require('child_process');

const messageFiles = [
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

// Crear fitxers si no existeixen
messageFiles.forEach(file => {
  if (!fs.existsSync(file.name)) {
    fs.writeFileSync(file.name, file.content);
  }
});

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

function runScript(index) {
  if (index >= scripts.length) return;

  const script = scripts[index];

  if (!fs.existsSync(script)) {
    throw new Error(`No existeix el fitxer ${script}`);
  }

  const child = fork(script);

  child.on('exit', code => {
    if (code !== 0) {
      console.error(`El script ${script} ha fallat amb codi ${code}`);
      process.exit(code);
    }
    runScript(index + 1);
  });
}

runScript(0);
