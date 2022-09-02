const EikiWSPProjector = require('./eiki');

module.exports = {
	async sendCommand(cmd, uriEncode) {
		if (cmd !== undefined) {
			try {
				const connection = new EikiWSPProjector(this.config)

				if (this.config.verbose) {
					this.log('debug', `Sending command: ${cmd}`);
				}

				const result = await connection.sendRequest(cmd, uriEncode)
				this.debug('info', result)

				if (result.status === 'success') {
					this.status(this.STATUS_OK);
				} else {
					this.status(this.STATUS_ERROR);
					this.log('error', result.status);
					this.setVariable('module_state', 'Error - See Log');
				}
			} catch (error) {
				this.status(this.STATUS_ERROR);
				this.setVariable('module_state', 'Error - See Log');

				let errorText = String(error);

				if (errorText.match('ECONNREFUSED')) {
					this.log('error', 'Unable to connect to the Projector.')
				}
				else if (errorText.match('ETIMEDOUT') || errorText.match('ENOTFOUND')) {
					this.log('error', 'Connection to Projector has timed out.')
				}
				else {
					this.log('error', `An error has occurred: ${errorText}`);
				}
			}
		}
	},

	actions() {
		let self = this; // required to have reference to outer `this`
		let actionsArr = {};

		actionsArr.powerOn = {
			label: 'Power On',
			callback: function (action, bank) {
				let cmd = 'execPwr.cgi?PWRCHG=1';
				self.sendCommand(cmd, false);
			}
		};

		actionsArr.powerOff = {
			label: 'Power Off',
			callback: function (action, bank) {
				let cmd = 'execPwr.cgi?PWRCHG=2';
				self.sendCommand(cmd, false);
			}
		};

		this.setActions(actionsArr);
	}
}
