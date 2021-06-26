var ganache = require('ganache-cli');
var Web3 = require('web3');
var web3 = new Web3(ganache.provider('http://localhost:8545')); // 得到接入ganache测试环境的web3对象
var fs = require('fs');
 
 var version = web3.version;
 console.log("web3 version: " + version);
 web3.setProvider('http://127.0.0.1:8545');
// 获取json文件中的 abi  bytecode
var teamjson;
let abi;
let bytecode;
fs.readFile('build/Demo.json', 'utf-8', (err, data)=>{
    if(err) throw err;
    teamjson = JSON.parse(data);
    abi = teamjson.abi;
    bytecode = teamjson.bytecode;


    //console.log(abi); 
    //创建合约对象, 0xD5a9e637E3C403E4aAd2e3F8e6543a1007777326 为合约部署地址
    var contractInstance = new web3.eth.Contract(abi, '0xD5a9e637E3C403E4aAd2e3F8e6543a1007777326', {
        from: '0xEDb3418783c2bC922b4E1E285e76eeb237b5EEc2', // default from address
        gasPrice: '200000' // default gas price in wei, 20 gwei in this case
    });

    var result = contractInstance
    .methods
    .mint('0x268ed28F8a067a0f019a292C46481cC9F78CB077', 99)
    .call()
    .then(result => console.log(result));


    var result = contractInstance.methods.getTeamName().call((err, val) => {
        console.log({ err, val })
      });
});