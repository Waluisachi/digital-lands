const express = require('express');
const bodyParser = require('body-parser');

//Classes
const Main = require('./app/main');
//Declarations
const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const api = '/api'
const main = new Main();
// middlewares
app.use(express.json());


// Routes
app.use(`${api}/blocks/`, require('./routes/blocks'));
// app.use(`${api}/lands/`, require('./routes/lands'));
app.use(`${api}/transactions/`, require('./routes/transactions'));
// app.use(`${api}/user/`, require('./routes/user'));
app.use(`${api}/wallet/`, require('./routes/wallet'));

//Servers
app.listen(HTTP_PORT, () =>{
  console.log(`Listening on port ${HTTP_PORT}`);
});

main.p2pServer.listen();
