# Tema 2 - Activitat 2: Criptografia Asimètrica amb Node.js

Aquest projecte implementa una activitat pràctica de **criptografia asimètrica** utilitzant **Node.js** i el mòdul natiu **crypto**.  
Segueix un flux complet de generació de claus, encriptació, desencriptació, signatura i verificació entre dos usuaris: **Alice** i **Bob**.

---

## Contingut del projecte

```text
tema2-activitat2/
├── alice_generacio_de_claus.js        # Genera claus RSA per l'Alice
├── bob_generacio_de_claus.js          # Genera claus RSA per en Bob
├── alice_encripta_missatge.js         # Alice encripta per en Bob
├── bob_desencripta_missatge.js        # Bob desencripta el missatge d'Alice
├── bob_signa_missatge.js              # Bob signa un missatge propi
├── alice_verifica_missatge.js         # Alice verifica la signatura d'en Bob
├── alice_encripta_signa_missatge.js   # Alice encripta i signa (JSON)
├── bob_desencripta_valida_missatge.js # Bob desencripta i valida (JSON)
├── start.js                           # Executa tot el flux automàticament
├── delete.js                          # Neteja els fitxers generats
└── README.md                          # Documentació
```

Fitxers `.pem`, `.txt`, `.bin` i `.json` es generen automàticament en executar els scripts.

---

## Com funciona

1. **Generació de claus**  
   - `alice_generacio_de_claus.js` → Genera `alice_public.pem` i `alice_private.pem`.
   - `bob_generacio_de_claus.js` → Genera `bob_public.pem` i `bob_private.pem`.

2. **Flux de missatges**  
   - Alice encripta el fitxer `missatge_original.txt` usant la clau pública d'en Bob.
   - Bob utilitza la seva clau privada per llegir-lo.

3. **Signatures i verificacions**  
   - Bob signa el contingut amb la seva clau privada.
   - Alice utilitza la clau pública d'en Bob per assegurar-se que el missatge no ha estat alterat.

4. **Missatge combinat encriptat i signat**  
   - Alice genera un objecte JSON que conté el missatge encriptat (per en Bob) i la seva signatura digital.
   - Bob desencripta el contingut i, acte seguit, verifica l'autoria de l'Alice.

---

## Com executar el projecte

1. Obre un terminal dins de la carpeta `tema2-activitat2`.
2. Assegura't de tenir un fitxer anomenat `missatge_original.txt` (el script `start.js` el crearà per tu si no existeix).
3. Executa el script principal per veure tot el procés en acció:

```bash
node start.js
```

Si vols netejar la carpeta i esborrar totes les claus i fitxers generats:

```bash
node delete.js
```

---

## Notes tècniques

- No requereix cap dependència externa (no cal `npm install`).
- Utilitza exclusivament mòduls natiu de **Node.js**:
  - `crypto`: Per a criptografia RSA i signatura digital.
  - `fs`: Per llegir i escriure fitxers al sistema.
  - `child_process`: Per gestionar l'execució seqüencial.
- **Algoritmes utilitzats**:
  - **RSA 2048 bits** amb OAEP per encriptació.
  - **RSA-SHA256** (PSS Padding) per signatura i verificació.

---

## Objectiu de l’activitat

- Comprendre els conceptes de criptografia asimètrica (clau pública/privada).
- Practicar la integritat i l'autenticitat mitjançant signatures digitals.
- Implementar un flux de comunicació segura entre dos usuaris simulats.

**Autor:** [El teu nom aquí]
```

---

### Scripts auxiliars recomanats

Perquè el teu `README` sigui 100% veraç, aquí tens el codi per als dos fitxers de gestió:

#### Fitxer: `start.js`
Aquest fitxer executa tots els scripts en l'ordre correcte.

```javascript
const { execSync } = require('child_process');
const fs = require('fs');

// Crear missatge inicial si no existeix
if (!fs.existsSync('missatge_original.txt')) {
    fs.writeFileSync('missatge_original.txt', 'Hola Bob, aquest és un missatge secret de l\'Alice.');
}

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

console.log("Començant l'activitat de Criptografia Asimètrica...\n");

scripts.forEach(script => {
    try {
        console.log(`Executant: ${script}...`);
        const output = execSync(`node ${script}`).toString();
        console.log(output);
    } catch (error) {
        console.error(`Error en executar ${script}:`, error.message);
    }
});

console.log("Procés finalitzat amb èxit.");
```

#### Fitxer: `delete.js`
Aquest fitxer neteja la carpeta per deixar-la com al principi.

```javascript
const fs = require('fs');
const path = require('path');

const extensionsEsborrar = ['.pem', '.bin', '.json', '.txt'];
const fitxersAConservar = ['README.md', 'missatge_original.txt']; // Opcional conservar l'original

fs.readdirSync('.').forEach(file => {
    const ext = path.extname(file);
    if (extensionsEsborrar.includes(ext) && !fitxersAConservar.includes(file)) {
        if (file.endsWith('_de_claus.js')) return; // No esborrar els scripts
        fs.unlinkSync(file);
        console.log(`Esborrat: ${file}`);
    }
});

console.log("Neteja completada.");
```
