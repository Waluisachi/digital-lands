// WALLET CONTROLLERS
const Main = require('../app/main');
const main = new Main();
const Miner = require('../app/miner');
// Key generation
exports.generate = (req, res, next) => {

  res.status(200).json({
    success: true,
    keys: {
      publicKey: main.wallet.keyPair.getPublic().encode("hex"),
      privateKey: main.wallet.keyPair.getPrivate('hex')
    }
  });
};

// privateKey
exports.privateKey = (req, res, next) => {
  res.status(200).json({
    success: true,
    balance : main.wallet.balance
  });
}


// PublicKey
exports.publicKey = (req, res, next) => {
  res.status(200).json({
    success: true,
    publicKey : main.wallet.publicKey,
    balance : main.wallet.balance
  });
}


// get balance
exports.getBalance = (req, res, next) => {
  res.status(200).json({
    success: true,
    balance: main.wallet.balance
  });
}

// signature
exports.updateBalance = (req, res, next) => {
  res.status(200).json({
    success: true,
    signature:"to configure"
  });
}


// TRANSACTIONS CONTROLLER
// Return transactions in the pool
exports.transactions = (req, res, next) => {
  const transactions = main.transactionPool.transactions
  res.status(200).json({
    transactions
  });
}

// Create transaction using a Wallet
exports.transact = (req, res, next ) => {
  const { recipient, amount } = req.body;
  const transaction = main.wallet.createTransaction(recipient, amount, main.blockchain, main.transactionPool);

  main.broadcastTransactions(transaction);

  res.status(200).json({
    success: true,
    transaction
  });
};

// Search
exports.search = (req, res, next) => {
  res.status(200).json({
    success: true,
  });
}


// BLOCKS
exports.blocks = (req, res, next) => {
  // const blockchain = main.blockchain.chain;
  res.status(200).json({
    success: true,
    blockchain: main.blockchain.chain
  });
}

// MINING
exports.miner = (req, res) => {
  const miner = new Miner(main.blockchain, main.transactionPool, main.wallet, main.p2pServer);

  const block = miner.mine();

  res.status(200).json({
    block
  });
}
