// TODO: Enter your own smart contract as a string
let template = " your contract ";

window.onload = function() {
  // TODO: Load the correct version of BrowserSolc on line 7
  // and put in name of your contract on line 9
  BrowserSolc.loadVersion("soljson-v0.4.19+commit.c4cbbb05.js", function (compiler) {
    const contract = compiler.compile(template, 1);
    const bytecode = contract.contracts[' :name of your contract '].bytecode;
    
    // TODO: Enter your own infura endpoint
    const web3 = new Web3(' your infura endpoint');
    // TODO: Enter your own account
	const account = ' your account ';
	// TODO: Enter your secret key associated with the above account
	const privateKey = ethereumjs.Buffer.Buffer(' your secret key ','hex');

	web3.eth.getTransactionCount(account, (err, txCount) => {
		// Get smart contract data
		const data = '0x'+bytecode;
		// Create transaction object
		const txObject = {
			nonce: web3.utils.toHex(txCount),
			gasLimit: web3.utils.toHex(1000000),
			gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
			data: data
		}

		// Sign the transaction
		const tx = new ethereumjs.Tx(txObject);
		tx.sign(privateKey);

		const serializedTx = tx.serialize();
		const raw = '0x' + serializedTx.toString('hex');

		// Broadcast the transaction
		// use txHash to find the contract on Etherscan
		web3.eth.sendSignedTransaction(raw, (err, txHash) => {
			console.log('err:', err, 'txHash:', txHash);
		});
	});
  });
}



