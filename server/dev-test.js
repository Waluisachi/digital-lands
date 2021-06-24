const Wallet = require('./wallet');

const Container = require('./wallet/container');

const container = new Container()
const geoData = [  {
    Latitude: 1134.958,
    Longitude: 3204.323,
  },
  {
    Latitude: 3244.245,
    Longitude: 5698.134
  },
  {
    Latitude: 3244.245,
    Longitude: 5698.134
  },
  {
    Latitude: 3244.245,
    Longitude: 5698.134
  }];

const recipient = {
  "publicKey": "04f69e4598ab04d470dbc927a5d757f90b7b4b7763d49959eb34ef442a69bed0dd60838097fbfded7aa3eadbf356e0c05b5d446b211de2429b846602715e7e7aff",
  "id": 58966959,
  "Name": "JANE DOE"
}
const plot = container.addProperty('SSTD-345JK', geoData, recipient, 2.5, 80200000);

const plot1 = container.addProperty('SSTD-345JK', geoData, recipient, 2, 2500000);

const plot2  = container.addProperty('SSTD-345JK', geoData, recipient, 5, 10000000);


const t = container.properties.find(land => land.titleNo === 'b17e14f0-c450-11eb-8863-1d93fae480d8');

// console.log(wallet.keyPair.getPrivate('hex'));
console.log(plot);
