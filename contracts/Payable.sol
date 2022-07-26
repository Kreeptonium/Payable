// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract ContractPayable {

    address payable public owner;

    event depositEvent(address _depositer, uint _amount, uint _balance);
    event withdrawEvent(uint _amount, uint _balance);
    event transferToAddressEvent(address _to, uint _amount, uint _balance);

    constructor(address _owner) payable {
        owner=payable(_owner);
        //owner = msg.sender; or you can write like this & remove the parameter in the constructor
    }

    modifier onlyOwner(){

        require(owner==msg.sender,"Not Owner!");
        _;
    }

    fallback() external payable{

        //deposit();
        console.log("Fallback Called");

    }

    receive() external payable{

        console.log("receive Called");

    }

   // Function to deposit Ether into this contract.
   // Call this function along with some Ether.
   // The balance of this contract will be automatically updated.
    function deposit() public payable {

        emit depositEvent(msg.sender,msg.value, address(this).balance);

    }

    function withdrawByOwner(uint _amount) public payable onlyOwner{

        owner.transfer(_amount);
        emit withdrawEvent(_amount,address(this).balance);

    }

    function transferToAddress(address payable _to, uint _amount) public onlyOwner{

        _to.transfer(_amount);
        emit transferToAddressEvent(_to,_amount,address(this).balance);
    }

    function getBalanceByAddress(address _userAddress) public view returns(uint){

        return _userAddress.balance;
    }

    function getContractBalance() public view returns(uint){

       return address(this).balance;
    }


}