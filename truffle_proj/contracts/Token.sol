// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract ExampleToken is ERC20 {
  constructor () public
  ERC20("CuiToken", "CUI"){
    _mint(msg.sender,10000000000 * (10 ** uint256(decimals())));
  }
}
