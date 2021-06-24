const Transaction = require('./transaction');
const Wallet = require('./index');
const { MINING_REWARD } = require('../config');


describe("Transaction", () => {
  let transaction, wallet, recipient, amount;
  beforeEach(() => {
    wallet = new Wallet();
    recipient = "04f69e4598ab04d470dbc927a5d757f90b7b4b7763d49959eb34ef442a69bed0dd60838097fbfded7aa3eadbf356e0c05b5d446b211de2429b846602715e7e7aff"
    amount = 50;
    transaction = Transaction.newTransaction(wallet, recipient, amount);
  });

  it("outputs the `amount` subtracted from the wallet balance", () => {
    // console.log(transaction);
    expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount).toEqual(wallet.balance - amount);
  });

  it("outputs the `amount` added to the recipient", () => {
    expect(transaction.outputs.find(output => output.address === recipient).amount).toEqual(amount);
  });

  // inputs
  it("it inputs the balance of the wallet", () => {
    expect(transaction.input.amount).toEqual(wallet.balance);
  });

  //valid signatures
  it("validates a valid transaction", () => {
    expect(Transaction.verifyTransaction(transaction)).toBe(true);
  });

  it("invalidates a corrupt transaction", () => {
    transaction.outputs[0].amount = 50000;
    expect(Transaction.verifyTransaction(transaction)).toBe(false);

  });

  it

  describe("Transacting with amount greater than balance", () => {
    beforeEach(() => {
      amount = 50000;
      transaction = Transaction.newTransaction(wallet, recipient, amount);
    });

    it("does not create a transaction", () => {
      expect(transaction).toEqual(undefined);
    });
  });


  // updating transactions
  describe("and updating a transaction", () => {
    let secondAmount, secondAddress;
    beforeEach(() => {
      secondAmount = 40;
      secondAddress = "98ab04d470dbc927a5d757f90b7b4b7763d49959eb34ef442a69bed0dd60838097fbfded7aa3eadbf356e0c05b5d446b211de2429b846602715e7e";
      transaction = transaction.update(wallet, secondAddress, secondAmount);
    });

    it(`subtracts the secondAmount from sender's output`, () => {
      expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount).toEqual(wallet.balance - amount -secondAmount);
    });

    it("outputs an amount for the new recipient", () => {
      expect(transaction.outputs.find(output => output.address == secondAddress).amount).toEqual(secondAmount);
    });
  });


// Mining reward transaction
  describe('creating a reward transaction', () => {
    beforeEach(() => {
      transaction = Transaction.rewardTransaction(wallet, Wallet.blockchainWallet());
    });

    it( `reward the miner's wallet`, () => {
      expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount).toEqual(MINING_REWARD)
    });
  });
});
