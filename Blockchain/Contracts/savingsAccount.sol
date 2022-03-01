//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.1;

contract SavingsAccount {
    struct Kid {
        uint amount;
        uint withdrawTime;
        bool paid;
        uint numOfWithdraws;
    }

    mapping (address => Kid) public kids;
    address public parent;

    constructor() {
        parent = msg.sender;
    }


    function addKid(address kid, uint timeToWithdraw) external payable {
        require(msg.sender == parent, 'only parent');
        require(kids[msg.sender].amount == 0, 'kid already exist');
        kids[kid] = Kid(msg.value, block.timestamp + timeToWithdraw, false, 0);
    }

    function withdraw() external {
        Kid storage kid = kids[msg.sender];
        require(kid.withdrawTime <= block.timestamp, 'too early');
        require(kid.paid == false, 'paid already');
        kid.paid = true;
        kid.numOfWithdraws = kid.numOfWithdraws + 1;
        payable(msg.sender).transfer(kid.amount);
    }

    function getParent() public view returns(address p){
        p = parent;
    }
    
    function getAmount() public view returns(uint a){
        Kid storage kid = kids[msg.sender];
        a = kid.amount;
    }
}