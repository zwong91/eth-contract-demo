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