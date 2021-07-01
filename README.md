# 以太坊智能合约
## 01
### Remix工具地址：
- https://remix.ethereum.org/
- Visual Studio Code
> 插件：https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity

### 开发者工具：
- npm install -g ganache-cli
> ganache-cli
- Truffle 地址：https://truffleframework.com/

### 开发手册 solidity0.8.4 web3.js ^1.3.6  Truffle  登链社区
- https://learnblockchain.cn/docs/solidity/

### 常用库
- OpenZeppelin 地址：https://openzeppelin.org/

### MetaMask安装地址
https://metamask.io/

### 网络
- 主网
- Ropsten 水管地址：https://faucet.ropsten.be/
- Rinkeby 水管地址：https://faucet.rinkeby.io/
- 私链

### 以太坊浏览器地址：
https://cn.etherscan.com/

### 合约代码：
```
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract HelloWorld{
    string _name;
    function setName(string memory name ) public{
        _name = name;
    }
    function getName() view public returns(string memory){
        return _name;
    }
}
```


## 02
### 1.部署到Truffle
#### Truffle中文文档地址：
>https://learnblockchain.cn/docs/truffle/index.html
#### 1.安装 Truffle：
```shell
npm install -g truffle

app react-js
npm install -g yarn
yarn install
yarn upgrade
yarn start
```
#### 2.新建项目文件夹
```shell
mkdir myProject    
cd myProject
truffle init
```
#### 3.安装Openzeppelin
```shell
npm install @openzeppelin/contracts
```
#### 4.创建Token.sol
```shell
vim contracts/Token.sol
```
```javascript
pragma solidity ^0.5.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
contract ExampleToken is ERC20, ERC20Detailed {
  constructor () public
  ERC20Detailed("CuiToken", "CUI", 18){
    _mint(msg.sender,10000000000 * (10 ** uint256(decimals())));
  }
}
```
#### 5.编译
```shell
truffle compile
```
#### 6.创建文件
```shell
vim migrations/2_deploy_contracts.js
```
```javascript
const ExampleToken = artifacts.require("ExampleToken");

module.exports = function(deployer) {
  deployer.deploy(ExampleToken);
};
```
#### 7.部署到Truffle develop
```shell
truffle develop

truffle  console 
> let instance = await Voting.deoyed()
> instance.
```
```shell
migrate
```
#### 8.合约调用
```javascript
var myCoin
ExampleToken.deployed().then(function(instance){myCoin=instance})
```

### 2.部署到Ganache
#### 1.修改truffle-config.js文件
```shell
vim truffle-config.js
```
```javascript

module.exports = {
  	networks: {
      development: {
        host: "192.168.1.30",     // Localhost (default: none)
        port: 7545,            // Standard Ethereum port (default: none)
        network_id: "*",       // Any network (default: none)
      },
    }
};
```

#### 2.部署到Ganache
```shell
truffle console
```
```shell
migrate
```
#### 3.合约调用
```javascript
var myCoin
ExampleToken.deployed().then(function(instance){myCoin=instance})
```

### 3.部署到Ropsten
#### 1.安装HDWalletProvider
```shell
npm install @truffle/hdwallet-provider
```
#### 2.获取Ropsten测试币
##### 获取地址：
>https://faucet.ropsten.be/

![map](https://raw.githubusercontent.com/Fankouzu/smart-contract/master/Solidity%20Lesson%2003/faucet.jpg)
#### 3.获取MetaMask助记词
![map](https://raw.githubusercontent.com/Fankouzu/smart-contract/master/Solidity%20Lesson%2003/metamask.jpg)
#### 4.注册Infura，获取测试网或主网的KEY
##### 地址：
>https://infura.io/

![map](https://raw.githubusercontent.com/Fankouzu/smart-contract/master/Solidity%20Lesson%2003/infura.jpg)
#### 5.修改truffle-config.js文件
```shell
vim truffle-config.js
```
```javascript
var HDWalletProvider = require("truffle-hdwallet-provider");  // 导入模块
var mnemonic = "oppose say prevent raven mystery fiber program pupil poverty else pill enact";  //MetaMask的助记词。

module.exports = {
  	networks: {
        ropsten: {
            provider: function() {
                // mnemonic表示MetaMask的助记词。 "ropsten.infura.io/v3/33..."表示Infura上的项目id
                return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/e1bb25c2b20b4b5383517028056c89a3", 1);   // 0表示第二个账户(从0开始)
            },
            network_id: "*",  // match any network
            gas: 3012388,
            gasPrice: 20000000000,
            confirmations: 2,    // # of confs to wait between deployments. (default: 0)
            timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
            skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
        },
  	}
};
```

#### 6.部署
```shell
truffle migrate  --network ropsten
```
#### 7.合约调用
```shell
truffle console --network ropsten
```
```javascript
var myCoin
ExampleToken.deployed().then(function(instance){myCoin=instance})
```
 
### 4.部署到主网
#### 1.修改truffle-config.js文件
```shell
vim truffle-config.js
```
```javascript
var HDWalletProvider = require("@truffle/hdwallet-provider");  // 导入模块
var mnemonic_mainnet = "主网助记词";  //MetaMask的助记词。

module.exports = {
  	networks: {
      mainnet: {
        provider: new HDWalletProvider(mnemonic_mainnet, "https://mainnet.infura.io/e1bb25c2b20b4b5383517028056c89a3"),
        network_id: 1,
        gas: 3012388,
        gasPrice: 20000000000,
        confirmations: 2,    // # of confs to wait between deployments. (default: 0)
        timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
        skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
      }
  	}
};
```
#### 2.部署
```shell
truffle migrate  --network mainnet
```
#### 3.合约调用
```shell
truffle console --network mainnet
```
```javascript
var myCoin
ExampleToken.deployed().then(function(instance){myCoin=instance})
```

## 03
## 以太坊web3前端开发1
- 链接Metamask
- 定义Provider
- 实例化Web3
- 读取Metamask的当前账号和网络ID
- 切换网络
### 初始化项目,如果没有create-react-app请先安装
```
npx create-react-app my-web3
cd my-web3
npm start
```
### 安装web3
```
yarn add web3
```
### 修改App.js

```javascript

import React, { Component } from 'react';
import Web3 from "web3";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {
    //判断页面是否安装Metamask
    if (typeof window.ethereum !== 'undefined') {
      const ethereum = window.ethereum
      //禁止自动刷新，metamask要求写的
      ethereum.autoRefreshOnNetworkChange = false

      try {
        //第一次链接Metamask
        const accounts = await ethereum.enable()
        console.log(accounts)
        //初始化Provider
        const provider = window['ethereum']
        console.log(provider)
        //获取网络ID
        console.log(provider.chainId)
        //实例化Web3
        const web3 = new Web3(provider)
        console.log(web3)

        ethereum.on('accountsChanged', function (accounts) {
          console.log("accountsChanged:" + accounts)
        })
        ethereum.on('networkChanged', function (networkVersion) {
          console.log("networkChanged:" + networkVersion)
        })
      } catch (e) {

      }
    } else {
      console.log('没有metamask')
    }
  }
  render() {
    return (
      <div></div>
    );
  }
}

export default App;

```
### 运行代码
```
yarn start
```


## Web3中文文档
- https://learnblockchain.cn/docs/web3js-0.2x/index.html
## Metamask文档
- https://docs.metamask.io/guide/getting-started.html


## 以太坊web3前端开发2
- 定义Provider
- 实例化Web3
- 实例化合约
- 与合约交互

### 前端代码与以太坊交互分五步

- 一个实例化的provider,可以是metamask,infura,truffle,ganache,或者搭建以太坊节点
- 合约的abi,自己编写的合约通过编译后获得abi,链上的合约需要开源才能获得abi,erc20代币合约的abi都一样
- 实例化web3.js或者ethers.js
- 通过abi和合约地址将合约实例化
- 调用合约方法,call或者send

### 修改前面的react代码中的App.js
```javascript
import React, { Component } from 'react';
import Web3 from "web3";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value:0
    };
  }
  async componentDidMount() {
    //判断页面是否安装Metamask
    if (typeof window.ethereum !== 'undefined') {
      const ethereum = window.ethereum
      //禁止自动刷新，metamask要求写的
      ethereum.autoRefreshOnNetworkChange = false

      try {
        //第一次链接Metamask
        const accounts = await ethereum.enable()
        console.log(accounts)
        //初始化Provider
        const provider = window['ethereum']
        console.log(provider)
        //获取网络ID
        console.log(provider.chainId)
        //实例化Web3
        const web3 = new Web3(provider)
        console.log(web3)
        //导入abi文件
        const abi = require("./contract.abi.json")
        //定义合约地址
        const address = "0x439b911d6423255a515d9762e966985d206cc177"
        //实例化合约
        window.myContract = new web3.eth.Contract(abi.abi,address)
        console.log(window.myContract)
        window.defaultAccount = accounts[0].toLowerCase()
        console.log(window.defaultAccount)

        ethereum.on('accountsChanged', function (accounts) {
          console.log("accountsChanged:" + accounts)
        })
        ethereum.on('networkChanged', function (networkVersion) {
          console.log("networkChanged:" + networkVersion)
        })
      } catch (e) {

      }
    } else {
      console.log('没有metamask')
    }
  }
  Getter = () => {
    window.myContract.methods.value().call().then(value=>{
      console.log(value)
      this.setState({value:value})
    })
  }
  Increase = () => {
    window.myContract.methods.increase(1).send({from:window.defaultAccount})
    .on('transactionHash',(transactionHash)=>{
      console.log('transactionHash',transactionHash)
    })
    .on('confirmation',(confirmationNumber,receipt)=>{
      console.log({ confirmationNumber: confirmationNumber, receipt: receipt })
    })
    .on('receipt',(receipt)=>{
      console.log({ receipt: receipt })
    })
    .on('error',(error,receipt)=>{
      console.log({ error: error, receipt: receipt })
    })
  }
  render() {
    return (
      <div>
        <div>{this.state.value}</div>
        <div>
          <button onClick={() => { this.Getter() }}>Getter</button>
        </div>
        <div>
          <button onClick={() => { this.Increase() }}>Increase</button>
        </div>
        <div></div>
      </div>
    );
  }
}

export default App;
```
