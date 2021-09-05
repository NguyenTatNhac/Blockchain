
const { Blockchain } = require("./src/Blockchain");
const { Transaction } = require("./src/Transaction");

let rykerCoin = new Blockchain();

rykerCoin.createTransaction(new Transaction("nhac", "phuc", 1000));
rykerCoin.createTransaction(new Transaction("nhac", "phuc", 500));
rykerCoin.createTransaction(new Transaction("phuc", "chit", 700));

console.log("Start mining Ryker's Coin...");
rykerCoin.minePendingTransactions("miner");
rykerCoin.minePendingTransactions("miner");

console.log("Phuc's balance: " + rykerCoin.getBalanceOfAddress("phuc"));
console.log("Miner's balance: " + rykerCoin.getBalanceOfAddress("miner"));
