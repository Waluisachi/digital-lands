const TransactionPool = require('./transaction-pool');
const Transaction = require('./transaction');
const Wallet = require('./index');
const Blockchain = require('../blockchain');


describe('Transaction pool', () => {
  let tp, wallet, transaction, blockchain;
  recipient = "04f69e4598ab04d470dbc927a5d757f90b7b4b7763d49959eb34ef442a69bed0dd60838097fbfded7aa3eadbf356e0c05b5d446b211de2429b846602715e7e7aff";

  beforeEach(() => {
    tp = new TransactionPool();
    wallet = new Wallet();
    blockchain = new Blockchain()
    transaction = wallet.createTransaction(recipient, 30, blockchain, tp);


  });

  it('adds a transaction to the pool', () => {
    expect(tp.transactions.find(t => t.id === transaction.id)).toEqual(transaction);
  });

  it('updates a transaction in the pool', () => {
    const oldTransaction = JSON.stringify(transaction);
    const newTransaction = transaction.update(wallet, 'recipient1234b7763d49959eb34ef442a69bed0dd60838097fbfded7aa3eadbf356e0c05b5d446b211de2429b8', 70);
    tp.updateOrAddTransaction(newTransaction);

      expect(JSON.stringify(tp.transactions.find(t => t.id === newTransaction.id))).not.toEqual(oldTransaction);
  });

  // Clears transactions from pool
    it('clears transactions', () => {
      tp.clear();
      expect(tp.transactions).toEqual([]);
    });



  describe('mixing valid and corrupt transactions', () => {
    let validTransactions;

    beforeEach(() => {
      validTransactions = [...tp.transactions];

      for (var i = 0; i < 6; i++) {
        wallet = new Wallet();
        transaction = wallet.createTransaction(recipient, 20, blockchain, tp);
        if (i%2 == 0) {
          transaction.input.amount = 99999;
        } else {
          validTransactions.push(transaction);
        }
      }
    });

    it('shows a diffrence between valid and corrupt transactions', () => {
      expect(JSON.stringify(tp.transactions)).not.toEqual(JSON.stringify(validTransactions));
    });

    it('grabs valid transactions', () => {
      expect(tp.validTransactions()).toEqual(validTransactions);
    });
  });
});
