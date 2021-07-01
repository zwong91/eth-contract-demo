// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./zombieHelper.sol";

contract ZombieFeeding is ZombieHelper {

  function feed(uint _zombieId) public onlyOwnerOf(_zombieId){
    Zombie storage myZombie = zombies[_zombieId];
    require(_isReady(myZombie));
    zombieFeedTimes[_zombieId] = zombieFeedTimes[_zombieId] + 1;
    _triggerCooldown(myZombie);
    if(zombieFeedTimes[_zombieId] % 10 == 0){
        uint newDna = myZombie.dna - myZombie.dna % 10 + 8;
        _createZombie("zombie's son", newDna);
    }
  }
}
