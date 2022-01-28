const { ethers, Contract } = require('ethers');
const { daiAbi, yieldFarmerAbi } = require('./abis');
const addresses = require('./addresses');

const provider = new ethers.providers.JsonRpcProvider();
const signer = provider.getSigner();

const daiContract = new Contract(addresses.dai, daiAbi, signer);
const yieldFarmerContract = new Contract(
  addresses.yieldFarmer,
  yieldFarmerAbi,
  signer
);

const run = async () => {
  //   const tx1 = await daiContract.approve(addresses.yieldFarmer, '2');
  //   await tx1.wait();
  const tx2 = await yieldFarmerContract.closePosition(
    addresses.solo,
    addresses.dai,
    addresses.cDai
  );
  await tx2.wait();
};

run();
