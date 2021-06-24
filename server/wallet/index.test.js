const Wallet = require('./index');
const TransactionPool = require('./transaction-pool');
const Blockchain = require('../blockchain');
const {  INITIAL_BALANCE } = require('../config');


describe("Wallet ", () => {
  let wallet, tp, blockchain;

  beforeEach(() => {
    wallet = new Wallet();
    blockchain = new Blockchain()
    tp = new TransactionPool();
  });

  describe("creating a transaction", () => {
    let transaction, sendAmount, recipient;

    beforeEach(() => {
      sendAmount =200;
      recipient = "04f69e4598ab04d470dbc927a5d757f90b7b4b7763d49959eb34ef442a69bed0dd60838097fbfded7aa3eadbf356e0c05b5d446b211de2429b846602715e7e7aff";
      transaction = wallet.createTransaction(recipient, sendAmount, blockchain, tp);
    });

    describe('and doing the same transaction', () => {
      beforeEach(() => {
          wallet.createTransaction(recipient, sendAmount, blockchain, tp);
      });
      it('doubles the `sendAmount` subtracted from the wallet balance', () => {
        expect(transaction.outputs.find(output => output.address == wallet.publicKey).amount).toEqual(wallet.balance - sendAmount*2);
      });

      it('clones the `sendAmount` subtracted from the wallet balance', () => {
        expect(transaction.outputs.filter(output => output.address === recipient).map(output => output.amount)).toEqual([sendAmount, sendAmount]);
      });


    });
  });


  describe('calculating balance', () => {
    let addBalance, repeatAdd, senderWallet;

    beforeEach(() => {
      senderWallet = new Wallet();
      addBalance = 100;
      repeatAdd = 3;

      for (var i = 0; i < repeatAdd; i++) {
        senderWallet.createTransaction(wallet.publicKey, addBalance, blockchain, tp);
      }

      blockchain.addBlock(tp.transactions);
    });

    it('calculates the balance for blockchain transaction matching the recipient', () => {
      expect(wallet.calculateBalance(blockchain)).toEqual(INITIAL_BALANCE + (addBalance * repeatAdd));
    });


    it('calculates the balance for blockchain transaction matching the sender', () => {
      expect(senderWallet.calculateBalance(blockchain)).toEqual(INITIAL_BALANCE - (addBalance * repeatAdd));
    });


    describe('and the recipient conducts a transaction', () => {
      let subtractBalance, recipientBalance;

      beforeEach(() => {
        tp.clear();
        subtractBalance = 60;
        recipientBalance = wallet.calculateBalance(blockchain);
        wallet.createTransaction(senderWallet.publicKey, subtractBalance, blockchain, tp);
        blockchain.addBlock(tp.transactions)
      });


      describe('and the sender sends another transaction to the recipient', () => {
        beforeEach(() => {
            tp.clear()
            senderWallet.createTransaction(wallet.publicKey, addBalance, blockchain, tp);
            blockchain.addBlock(tp.transactions);
        });

        it('calculates the recipient balance only using transactions since its most recent one', () => {
          expect(wallet.calculateBalance(blockchain)).toEqual(recipientBalance - subtractBalance + addBalance);
        });
      });

    });

  });
});
