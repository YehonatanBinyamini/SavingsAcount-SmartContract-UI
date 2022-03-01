


const savingsAccountContract = web3 => {
    return new web3.eth.Contract(
        abi, 
        "0x1E6521B51cad2aa9FB901114992c8438719C46b5"
    )
}

const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "kid",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "timeToWithdraw",
				"type": "uint256"
			}
		],
		"name": "addKid",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "a",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getParent",
		"outputs": [
			{
				"internalType": "address",
				"name": "p",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "kids",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "withdrawTime",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "paid",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "numOfWithdraws",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "parent",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
export default savingsAccountContract;

