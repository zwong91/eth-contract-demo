// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./zombieMarket.sol";
import "./zombieFeeding.sol";
import "./zombieAttack.sol";

contract ZombieCore is ZombieMarket,ZombieFeeding,ZombieAttack {

    string public constant name = "MyCryptoZombie";
    string public constant symbol = "MCZ";

    fallback() external payable {
    }

    function withdraw() external onlyOwner {
        owner.transfer(address(this).balance);
    }

    function checkBalance() external view onlyOwner returns(uint) {
        return address(this).balance;
    }

}
