//npm install --save crypto-js 

const SHA256 = require('crypto-js/sha256')

class Block{
    constructor(index, timestampm, data, previousHash = '') {  //블록의 청사진
      this.index = index;
      this.timestampm = timestampm;
      this.data = data;
      this.previousHash = previousHash; // 암호키
      this.hash = this.calculateHash(); //암호키 만들기
      this.nonce = 0; // 랜덤키
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestampm + JSON.stringify(this.data) + this.nonce).toString();
      }

   mineBlock(difficulty){
    while(this.hash.substring(0, difficulty) !== Array(difficulty+ 1).join("0")){
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log("Block minded" + this.hash);
}
}

class Blockchain{
    constructor() {
      this.chain = [this.createGenesisBlock()];
      this.difficulty = 2;
    }
     createGenesisBlock(){
         return new Block(0, "12/16/2021","Genesis block","0"); //첫 블록
     }

     getLastestBlock(){
         return this.chain[this.chain.length -1];
     }

     addBlock(newBlock){
         newBlock.previousHash = this.getLastestBlock().hash;
         newBlock.mineBlock(this.difficulty);
         this.chain.push(newBlock);
     }

     isChainValid(){
         for(let i = 1; i < this.chain.length; i++){
             const currentBlock = this.chain[i];
             const previousBlock = this.chain[i-1];
        if (currentBlock.hash !== currentBlock.calculateHash()){
            return false;
        }
        if (currentBlock.previousHash !== previousBlock.hash){
            return false;
        } 
         }
         return true;
     }
}

let markCoin = new Blockchain();

console.log('Mining block 1...');
markCoin.addBlock(new Block(1,"12/25/2021", { amount:4}));

console.log('Mining block 2...');
markCoin.addBlock(new Block(2,"01/01/2022", { amount:10}));


console.log(JSON.stringify(markCoin, null, 4));

console.log('Is blockchain vaild'+markCoin.isChainValid());
