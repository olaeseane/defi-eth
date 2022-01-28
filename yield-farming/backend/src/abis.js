const daiAbi = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function balanceOf(address) view returns (uint)',
  'function transfer(address to, uint amount)',
  'function approve(address spender, uint256 amount) external returns (bool)',
  'event Transfer(address indexed from, address indexed to, uint amount)',
];

const yieldFarmerAbi = [
  'function openPosition(address, address, address, uint256, uint256)',
  'function closePosition(address, address, address cToken)',
];

const compoundAbi = [
  'function getcTokenBalance(address) public view returns(uint)',
  'function getBorrowBalance(address cTokenAddress) public returns(uint)',
];

exports.compoundAbi = compoundAbi;
exports.daiAbi = daiAbi;
exports.yieldFarmerAbi = yieldFarmerAbi;
