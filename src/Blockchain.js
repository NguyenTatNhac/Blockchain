const { Block } = require("./Block");
const { Transaction } = require("./Transaction");

class Blockchain {

    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 1;
        this.pendingTransactions = [];
        this.miningRewards = 100;
    }

    createGenesisBlock() {
        return new Block("05/09/2021", "Genesis block", "0");
    }

     getLatestBlock() {
        return this.chain[this.chain.length - 1];
     }

     minePendingTransactions(miningRewardAddress) {
         let block = new Block(Date.now(), this.pendingTransactions)
         block.mine(this.difficulty);

         console.log("Block successfully mined");
         this.chain.push(block);

         this.pendingTransactions = [
             new Transaction(null, miningRewardAddress, this.miningRewards)
         ]
     }

     createTransaction(transaction) {
         this.pendingTransactions.push(transaction);
     }

     getBalanceOfAddress(address) {
         let balance = 0;

         for (const block of this.chain) {
             for (const transaction of block.transactions) {
                 if (transaction.fromAddress === address) {
                     balance -= transaction.amount;
                 }

                 if (transaction.toAddress === address) {
                     balance += transaction.amount;
                 }
             }
         }

         return balance;
     }

     isChainValid() {
         for (let i = 1; i < this.chain.length; i++) {
             const currentBlock = this.chain[i];
             const previousBlock =this.chain[i - 1];

             if (currentBlock.hash !== currentBlock.calculateHash()) {
                 return false;
             }

             if (currentBlock.previousHash !== previousBlock.hash) {
                 return false;
             }
         }
         return true;
     }
}

module.exports.Blockchain = Blockchain;