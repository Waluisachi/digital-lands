//Classes
const Blockchain = require('../blockchain/index');
const P2pServer = require('../app/p2p-server');
const Wallet = require('../wallet/index');
const TransactionPool = require('../wallet/transaction-pool');

const blockchain = new Blockchain();
const wallet = new Wallet();
const transactionPool = new TransactionPool();
const p2pServer = new P2pServer(blockchain, transactionPool);


class Main {
  constructor() {
    this.wallet = wallet;
    this.blockchain = blockchain;
    this.p2pServer = p2pServer;
    this.transactionPool = transactionPool;
  }

  broadcastTransactions(transaction) {
    const blockchain = new Blockchain();
    const transactionPool = new TransactionPool();
    const p2pServer = new P2pServer(blockchain, transactionPool);

    p2pServer.broadcastTransactions(transaction);
    return;
  }
}

module.exports = Main;
