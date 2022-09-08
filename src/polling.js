const EikiWSPProjector = require('./eiki');

async function getData(type, cmd) {
	let self = this;

	const connection = new EikiWSPProjector(self.config);

	const result = await connection.sendRequest(cmd);

	//do something with return data
	try {
		if (result && result.response && result.response.body) {
			let readable = result.response.body;
			const chunks = [];
		
			readable.on('readable', () => {
				let chunk;
				while (null !== (chunk = readable.read())) {
					chunks.push(chunk);
				}
			});
		
			readable.on('end', () => {
				const content = chunks.join('');
				try {
						if (content.indexOf('1') > -1) {
							self.STATE.powerState = true;
						}
						else {
							self.STATE.powerState = false;
						}
						self.checkVariables();
						self.checkFeedbacks();
				}
				catch(error) {
					if (this.config.verbose) {
						this.log('error', `Error Getting ${type} Data: ${error}`);
					}
					this.status(this.STATUS_ERROR);
				}
			});
		}
		else {
			if (!this.errorCount) {
				if (this.config.verbose) {
					this.log('error', `Error Getting ${type} Data: No response received from server. Is the Server Online?`);
				}
				this.status(this.STATUS_ERROR);
				this.setVariable('module_state', 'Error - See Log');
			}
			
			// Cleanup polling
			if (this.pollingInterval) {
				this.log('debug', 'Stopping polling.');
				clearInterval(this.pollingInterval);
				this.pollingInterval = null;
			}

			this.errorCount++;
		}	
	}
	catch(error) {
		if (this.config.verbose) {
			this.log('error', `Error Getting ${type} Data: ${error}`);
		}
		this.status(this.STATUS_ERROR);
		this.setVariable('module_state', 'Error - See Log');
		// Cleanup polling
		if (this.pollingInterval) {
			clearInterval(this.pollingInterval);
			this.pollingInterval = null;
		}
	}	
}

module.exports = {
	/**
	 * Inits the polling logic
	 */
	initPolling() {
		let self = this;

		// Cleanup old interval
		if (this.pollingInterval) {
			clearInterval(this.pollingInterval)
		}

		// Setup polling if enabled and host is set
		if (this.config.polling && this.config.host) {
			this.log('debug', `Polling started. Requesting new data from server every ${this.config.pollingrate}ms`);

			//const connection = new RadioBOSS(this.config)
			this.pollingInterval = setInterval(async () => {
				this.status(this.STATUS_OK);

				getData.bind(self)('execPwr.cgi'); //get power state
			}, this.config.pollingrate)
		}
	},
}
