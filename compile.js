var path =  require('path');
var fs = require('fs');
var solc =  require('solc');

let solFile = 'HelloWorld.sol';
let jsonFile = 'build/HelloWorld.json';
 
// 获取智能合约的绝对路径
let contractPath = path.resolve('../', 'erc20-contract/contracts', solFile);
//console.log("contracts absolute path: " + contractPath);
 
// 读取合约内容
let contractSource = fs.readFileSync(contractPath, 'utf-8');
 
//预先定义好编译源json对象
let jsonContractSource = JSON.stringify({
    language: 'Solidity',
    sources: {
        'HelloWorld.sol': {  // 指明编译的文件名
        content: contractSource, // solidity 源代码
      },
    },
    settings: { // 自定义编译输出的格式。以下选择输出全部结果。
        outputSelection: {
			'*': {
				'*': [ '*' ]
			}
		}
    },
  });
 

// 编译得到结果
let output = JSON.parse(solc.compile(jsonContractSource));  
 
teamJson = {
  'abi': {},
  'bytecode': ''
};
 
// output 为json对象，根据json结构保存对应的abi和bytecode
for (var contractName in output.contracts[solFile]) {
    teamJson.abi = output.contracts[solFile][contractName].abi;
    teamJson.bytecode = output.contracts[solFile][contractName].evm.bytecode.object;
}
 
console.log(teamJson);  
 
// 将teamJson数据输出到Transfer.json文件
fs.writeFile(jsonFile, JSON.stringify(teamJson), function(err){
    if(err)
      console.error(err);
    console.log("team contract compiled sucessfully.")
})