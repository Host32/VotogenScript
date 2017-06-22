// make sure that the address is passed in like
// node interact.js 0xca8bab43d250f9128178f5750972d9061b508c2e
if (process.argv.length != 3) {
  console.error("must pass a voting contract address")
}
const contractAddress = process.argv[2]

const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
const fs = require('fs')

let abi
try {
  abi = fs.readFileSync('abi.json').toString()
} catch (err) {
  throw err;
}

// create contract object with ABI
const VotingContract = web3.eth.contract(JSON.parse(abi))

// instantiate voting contract object with address
const contractInstance = VotingContract.at(contractAddress)

// log out the number of votes for 2B
const from = {from: web3.eth.accounts[0]}
console.log(contractInstance.totalVotesFor.call('2B', from).toString())
// increment the number of votes for 2B 3 times
contractInstance.voteForCandidate('2B', from)
contractInstance.voteForCandidate('2B', from)
contractInstance.voteForCandidate('2B', from)
// log out the number of votes for 2B again to see the updated value
console.log(contractInstance.totalVotesFor.call('2B', from).toString())
