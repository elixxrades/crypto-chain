const CryptoBlock = require("./CryptoBlock");
const EventEmitter = require("events");

module.exports = class CryptoBlockchain extends EventEmitter {
  constructor() {
    super();
    this.blockchain = [this.startGenesisBlock()];
    this.difficulty = 4;

    setInterval(() => {
      this.checkChainValidity();
    }, 15000);
  }

  startGenesisBlock() {
    return new CryptoBlock(0, "Initial Block in the Chain", "0f");
  }

  obtainLatestBlock() {
    return this.blockchain[this.blockchain.length - 1];
  }

  lastID() {
    return this.blockchain.length;
  }

  addNewBlock(newBlock) {
    newBlock.precedingHash = this.obtainLatestBlock().hash;
    newBlock.hash = newBlock.computeHash();
    this.blockchain.push(newBlock);
    this.emit("newBlock", newBlock);
  }

  checkChainValidity() {
    for (let i = 1; i < this.blockchain.length; i++) {
      const currentBlock = this.blockchain[i];
      const precedingBlock = this.blockchain[i - 1];

      if (currentBlock.hash !== currentBlock.computeHash()) {
        this.emit("chainValidity", false, this.blockchain);
        return false;
      }
      if (currentBlock.precedingHash !== precedingBlock.hash) return false;
    }
    this.emit("chainValidity", true, this.blockchain);
    return true;
  }
};
