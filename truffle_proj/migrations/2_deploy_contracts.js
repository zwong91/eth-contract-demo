const ExampleToken = artifacts.require("ExampleToken");
const TokenERC20 = artifacts.require("TokenERC20");
const ZombieCore = artifacts.require("ZombieCore");

module.exports = function(deployer) {
  deployer.deploy(ExampleToken);
  deployer.deploy(TokenERC20, 10000, 'wongToken', 'wong');
  deployer.deploy(ZombieCore);
};
