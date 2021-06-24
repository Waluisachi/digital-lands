const EC = require('elliptic').ec;

const ec = new EC('secp256k1');

const key = ec.genKeyPair();

// PublicKey
const publicKey = key.getPublic('hex');

// Private
const privateKey = key.getPrivate('hex');

console.log(`publicKey: ${publicKey}`);
console.log('');
console.log(`privateKey: ${privateKey}`);

// publicKey: 0491ab9b76181c4ee2e30da5e9227e395040511d2e29abc39d4876c7db6cc318c0bdf421d53ee563583e9e8cb7a1af138efef6a7113d9d214669498013a1489c7a
//
// privateKey: 8a452e602e105a3a316c40da4847c1cb93e1bc4ad318f7ac7330f3bcd352257b
class Security {
  constructor() {

  }

  signTransaction(signingKey){
    const hash =0; //
    const signature = signingKey.sign(hash, 'base64');
    return signature.toDER('hex');
  }
}
