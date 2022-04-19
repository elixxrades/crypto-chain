const CryptoBlock = require("./class/CryptoBlock");
const CryptoBlockChain = require("./class/CryptoBlockChain");

let client = new CryptoBlockChain();

console.log("Client mining in progress....");

client.on("newBlock", (block) => {
  console.log(block);
});

client.on("chainValidity", (res, chain) => {
  console.log("Chain case is : " + res + ". Length : " + chain.length);
  client.addNewBlock(
    new CryptoBlock(client.lastID(), {
      foo: "bar",
      bar: "foo",
      date: new Date().toUTCString(),
    })
  );
});

client.addNewBlock(
  new CryptoBlock(client.lastID(), {
    foo: "bar",
    bar: "foo",
  })
);

client.addNewBlock(
  new CryptoBlock(client.lastID(), {
    foo: "bar",
    bar: "foo",
    bum: "taka",
  })
);
