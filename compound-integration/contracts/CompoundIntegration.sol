// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import './CTokenInterface.sol';
import './ComptrollerInterface.sol';
import './PriceOracleInterface.sol';

contract CompoundIntegration {
  ComptrollerInterface public comptroller;
  PriceOracleInterface public priceOracle;

  // address public constant cDAI_ADDRESS = 0x6d7f0754ffeb405d23c51ce938289d4835be3b14;
  // address public constant DAI_ADDRESS = 0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea;
  // address public constant cBAT_ADDRESS = 0xebf1a11532b93a529b5bc942b4baa98647913002

  constructor(address _comptroller, address _priceOracle) {
    comptroller = ComptrollerInterface(_comptroller);
    priceOracle = PriceOracleInterface(_priceOracle);
  }

  function supply(address cTokenAddress, uint256 underlyingAmount) public {
    CTokenInterface cToken = CTokenInterface(cTokenAddress);
    address underlyingAddress = cToken.underlying();
    IERC20(underlyingAddress).approve(cTokenAddress, underlyingAmount);
    uint256 result = cToken.mint(underlyingAmount);
    require(
      result == 0,
      'cToken#mint() failed. see Compound ErrorReporter.sol for details'
    );
  }

  function redeem(address cTokenAddress, uint256 cTokenAmount) external {
    CTokenInterface cToken = CTokenInterface(cTokenAddress);
    uint256 result = cToken.redeem(cTokenAmount);
    require(
      result == 0,
      'cToken#redeem() failed. see Compound ErrorReporter.sol for more details'
    );
  }

  function enterMarket(address cTokenAddress) external {
    address[] memory markets = new address[](1);
    markets[0] = cTokenAddress;
    uint256[] memory results = comptroller.enterMarkets(markets);
    require(
      results[0] == 0,
      'comptroller#enterMarket() failed. see Compound ErrorReporter.sol for details'
    );
  }

  function borrow(address cTokenAddress, uint256 borrowAmount) external {
    CTokenInterface cToken = CTokenInterface(cTokenAddress);
    // address underlyingAddress = cToken.underlying();
    uint256 result = cToken.borrow(borrowAmount);
    require(
      result == 0,
      'cToken#borrow() failed. see Compound ErrorReporter.sol for details'
    );
  }

  function repayBorrow(address cTokenAddress, uint256 underlyingAmount)
    external
  {
    CTokenInterface cToken = CTokenInterface(cTokenAddress);
    address underlyingAddress = cToken.underlying();
    IERC20(underlyingAddress).approve(cTokenAddress, underlyingAmount);
    uint256 result = cToken.repayBorrow(underlyingAmount);
    require(
      result == 0,
      'cToken#borrow() failed. see Compound ErrorReporter.sol for details'
    );
  }

  function getMaxBorrow(address cTokenAddress) external view returns (uint256) {
    (uint256 result, uint256 liquidity, uint256 shortfall) = comptroller
      .getAccountLiquidity(address(this));
    require(
      result == 0,
      'comptroller#getAccountLiquidity() failed. see Compound ErrorReporter.sol for details'
    );
    require(shortfall == 0, 'account underwater');
    require(liquidity > 0, 'account does not have collateral');
    uint256 underlyingPrice = priceOracle.getUnderlyingPrice(cTokenAddress);
    return liquidity / underlyingPrice;
  }
}
