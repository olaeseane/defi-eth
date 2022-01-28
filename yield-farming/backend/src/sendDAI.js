/*
const Web3 = require('web3');
const fs = require('fs');
const addresses = require('./addresses');

const contractJson = fs.readFileSync('./abi/dai.json');
const daiAbi = JSON.parse(contractJson);

const web3 = new Web3('http://localhost:8545');
const dai = new web3.eth.Contract(daiAbi, addresses.dai);

[unlockedBalance, recipientBalance] = await Promise.all([
  dai.methods.balanceOf(addresses.unlocked).call(),
  dai.methods.balanceOf(addresses.wallet).call(),
]);

await dai.methods
  .transfer(recipientAddr, web3.utils.toWei('30'))
  .send({ from: unlockedAddr });

console.log(`Balance unlocked: ${unlockedBalance}`);
console.log(`Balance recipient: ${recipientBalance}`);
*/

const { ethers } = require('ethers');
const { daiAbi } = require('./abis');
const addresses = require('./addresses');

const provider = new ethers.providers.JsonRpcProvider();
const signer = provider.getSigner(addresses.unlocked);

const daiContractRO = new ethers.Contract(addresses.dai, daiAbi, provider);
const daiContractRW = new ethers.Contract(addresses.dai, daiAbi, signer);

const run = async () => {
  let unlockedBalance, recipientBalance;
  [unlockedBalance, recipientBalance] = await Promise.all([
    daiContractRO.balanceOf(addresses.unlocked),
    daiContractRO.balanceOf(addresses.wallet),
  ]);
  console.log(`Balance unlocked: ${unlockedBalance}`);
  console.log(`Balance recipient: ${recipientBalance}`);

  // const options = {};
  await daiContractRW.transfer(
    addresses.wallet,
    ethers.utils.parseUnits('30001', 'ether')
  );

  [unlockedBalance, recipientBalance] = await Promise.all([
    daiContractRO.balanceOf(addresses.unlocked),
    daiContractRO.balanceOf(addresses.wallet),
  ]);
  console.log(`Balance unlocked: ${unlockedBalance}`);
  console.log(`Balance recipient: ${recipientBalance}`);
};

run();
