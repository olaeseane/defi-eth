// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

interface PriceOracleInterface {
  function getUnderlyingPrice(address asset) external view returns (uint256);
}
