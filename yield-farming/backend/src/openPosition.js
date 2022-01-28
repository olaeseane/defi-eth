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
  balance = await provider.getBalance(addresses.wallet);
  console.log(ethers.utils.formatEther(balance));
  const amountProvided = ethers.utils.parseUnits('30000', 18);
  const amountBorrowed = ethers.utils.parseUnits('70000', 18);
  // res = IERC20(_token).approve(address(this), _amountProvided);

  console.log(amountProvided, amountBorrowed);
  const tx1 = await daiContract.approve(
    addresses.yieldFarmer,
    amountProvided.add('2')
  );
  await tx1.wait();
  const tx2 = await yieldFarmerContract.openPosition(
    addresses.solo,
    addresses.dai,
    addresses.cDai,
    amountProvided,
    amountBorrowed
  );
  await tx2.wait();
  // console.log(await daiContract.name());
  // console.log(await compoundContract.getcTokenBalance(addresses.cDai));
  balance = await provider.getBalance(addresses.wallet);
  console.log(ethers.utils.formatEther(balance));
};

run();
