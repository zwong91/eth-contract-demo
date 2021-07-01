// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

abstract contract ERC721  {
  event Transfer(address indexed _from, address indexed _to, uint256 _tokenId);
  event Approval(address indexed _owner, address indexed _approved, uint256 _tokenId);

  function balanceOf(address _owner) virtual public view returns (uint256 _balance);
  function ownerOf(uint256 _tokenId) virtual public view returns (address _owner);
  function transfer(address _to, uint256 _tokenId) virtual public;
  function approve(address _to, uint256 _tokenId) virtual public;
  function takeOwnership(uint256 _tokenId) virtual public;
}