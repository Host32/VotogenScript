# Hello World Voting Distributed Application

## Usage

You must have [testrpc](https://github.com/ethereumjs/testrpc) running at `localhost:8545`. Once it's setup perform the following steps.

1. `npm install`
2. `node deploy.js` deploys the `Voting.sol` smart contract to testrpc. It will print out the address of the contract.

`interact.js` contains some code that shows the basics of how to interact with a smart contract via JavaScript and web3. If you would like to see it run then use the following command

`node interact.js <address>`

where `<address>` is the address of the deployed voting smart contract printed out by the `deploy.js` script.

To view the app you must copy this addres into the correct spot in line 8 of `index.js` then view `index.html` in your browser.

## References

I created this following Mahesh Murthy's helpful [tutorial](https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-1-40d2d0d807c2) on the basics of creating Dapps.
