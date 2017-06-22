const Web3 = require('web3')
// point web3 to testrpc ethereum API
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
const fs = require('fs')

// compile Voting smart contract
const code = fs.readFileSync('Voting.sol').toString()
const contract = web3.eth.compile.solidity(code)

// save ABI to json file
try {
  fs.writeFileSync('abi.json', JSON.stringify(contract.info.abiDefinition), 'utf8')
} catch (err) {
  throw err
}

// create contract from ABI
const VotingContract = web3.eth.contract(contract.info.abiDefinition)
// deploy contract
const deployedContract = VotingContract.new(['2B', '9S', 'A2'], {
  data: contract.code,
  from: web3.eth.accounts[0],
  gas: 4700000
}, (err, myContract) => {
  if (!myContract.address) {
    console.log('Transaction Hash:', myContract.transactionHash)
  } else {
    console.log('Address:', myContract.address)
  }
})
