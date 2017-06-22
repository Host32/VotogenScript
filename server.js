const http = require('http'),
    Web3 = require('web3'),
    fs = require('fs');

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const code = fs.readFileSync('Voting.sol').toString();
const contract = web3.eth.compile.solidity(code);

try {
    fs.writeFileSync('abi.json', JSON.stringify(contract.info.abiDefinition), 'utf8')
} catch (err) {
    throw err
}

const VotingContract = web3.eth.contract(contract.info.abiDefinition);

var addresses = {};

function hex2a(hex) {
    hex = hex.substr(2, hex.length);
    var str = '';
    var number;
    for (var i = 0; i < hex.length; i += 2) {
        number = hex.substr(i, 2);
        if (number != '00') {
            str += String.fromCharCode(parseInt(number, 16));
        }
    }
    return str;
}

function newVoting(candidates, callback) {
    const deployedContract = VotingContract.new(candidates, {
        data: contract.code,
        from: web3.eth.accounts[0],
        gas: 4700000
    }, function (err, myContract) {
        if (!myContract.address) {
            console.log('Transaction Hash:', myContract.transactionHash);
        } else {
            console.log('Address:', myContract.address);
            addresses[myContract.address.toString()] = {
                contract: deployedContract,
                candidates: candidates
            };
            callback(myContract.address);
        }
    });
}

function getContract(address, callback) {
    var from = {from: web3.eth.accounts[0]};

    if (!addresses[address]) {
        try {
            var contract = VotingContract.at(address);
            contract.getCandidates.call(from, function (error, result) {
                if (!error) {
                    addresses[address] = {
                        contract: contract,
                        candidates: result.map(function (candidate) {
                            return hex2a(candidate);
                        })
                    };
                    console.log(addresses[address].candidates);

                    callback(addresses[address]);
                } else {
                    callback(false);
                }
            });
        } catch (e) {
            console.error(e);
            callback(false);
        }
    }
}

function showVotes(address, callback) {
    getContract(address, function (contractCache) {
        if (!contractCache) {
            callback(false);
        } else {
            var contract = contractCache.contract;

            var from = {from: web3.eth.accounts[0]};

            var response = [];
            var candidates = contractCache.candidates;
            for (var i = 0; i < candidates.length; i++) {
                response.push({
                    candidateName: candidates[i],
                    votes: contract.totalVotesFor.call(candidates[i], from).toString()
                });
            }

            callback(response);
        }
    });
}

function newVote(address, candidate, callback) {
    getContract(address, function (contractCache) {
        if (!contractCache) {
            callback(false);
        } else {
            var from = {from: web3.eth.accounts[0]};
            var contract = contractCache.contract;

            try {
                contract.voteForCandidate(candidate, from);
            } catch (e) {
                console.error(e);
                callback(false);
                return;
            }

            callback(true);
        }
    });


}

function getUrlParams(url) {
    var urlParts = url.split("?");
    var params = {
        url: urlParts[0]
    };

    if (urlParts[1]) {
        params.queryParams = {};
        var queryParams = urlParts[1].split('&');
        for (var i = 0; i < queryParams.length; i++) {
            var param = queryParams[i].split('=');
            params.queryParams[param[0]] = param[1];
        }
    }

    return params;
}

function httpNewVoting(params, response) {
    if (!params.queryParams) {
        response.write('400');
        response.end();
    } else {
        var candidates = [];
        var name = '';
        var description = '';
        for (var key in params.queryParams) {
            if (key == "name") {
                name = params.queryParams[key];
            } else if (key == "description") {
                description = params.queryParams[key];
            } else {
                candidates.push(params.queryParams[key]);
            }
        }
        newVoting(candidates, function (address) {
            response.write(address);
            response.end();
        });
    }
}

function httpShowVotes(params, response) {
    if (!params.queryParams || !params.queryParams.address) {
        response.write('400');
        response.end();
    } else {
        showVotes(params.queryParams.address, function (result) {
            if (result) {
                response.write(JSON.stringify(result));
            } else {
                response.write('400');
            }
            response.end();
        });
    }
}
function httpNewVote(params, response) {
    if (!params.queryParams || !params.queryParams.candidate || !params.queryParams.address) {
        response.write('400');
        response.end();
    } else {
        newVote(params.queryParams.address, params.queryParams.candidate, function (result) {
            if (result) {
                response.write('200');
            } else {
                response.write('400');
            }

            response.end();
        });
    }
}

http.createServer(function (request, response) {
    var params = getUrlParams(request.url);

    switch (params.url) {
        case "/newVoting":
            httpNewVoting(params, response);
            break;
        case "/newVote":
            httpNewVote(params, response);
            break;
        case "/showVotes":
            httpShowVotes(params, response);
            break;
        default:
            response.write('404');
            response.end();
            break;
    }
}).listen(9000);

console.log("HTTP Server listening on 9000");