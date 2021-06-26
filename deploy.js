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
});


var deployTeam = async(teamName)=>{
    try{
        console.log("to get the accounts");
        var accounts = await web3.eth.getAccounts(); // 获取账户
        console.log(accounts); //0x662df9d8Da0Fe726953a04E74dcf83Fa8d25d3C1
        console.log(accounts[0]); //0x662df9d8Da0Fe726953a04E74dcf83Fa8d25d3C1
        console.log("To deploy team contract.");
        var result = await new web3.eth.Contract(abi).deploy(
            {
                data: '0x' + bytecode, // 需要注意 字节码需要添加 '0x' 不然会有各种错误   
                arguments: [teamName]  // 此处是参数列表
            })
            .send({
                from: accounts[0],
                gas: '5000000' 
            });
        console.log("successfully! Team address: " + result.options.address);
        return result;
    }
    catch(error){
        console.log("team 合约部署失败");
        console.error(error);
    }
};
deployTeam('teamName'); // 测试
module.exports = deployTeam;