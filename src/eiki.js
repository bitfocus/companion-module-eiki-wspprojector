const fetch = require('node-fetch')

class EikiWSPProjector {
	constructor(config) {
		const apiHost = config.host
		const apiPort = 80
		const apiUsername = config.username
		const apiPassword = config.password

		this.baseUrl = `http://${apiHost}:${apiPort}/protect/`

		this.requestOptions = {
			method: 'GET',
			timeout: 10000,
			headers: {
				'Authorization': 'Basic ' + Buffer.from(`${apiUsername}:${apiPassword}`, 'binary').toString('base64')
			}
		}

		console.log(this.requestOptions);
	}

	async sendRequest(cmd, uriEncode) {
		if (uriEncode == undefined || uriEncode == true) {
			cmd = encodeURIComponent(cmd);
		}

		let requestUrl = this.baseUrl + cmd;

		try {
			const response = await fetch(requestUrl, this.requestOptions)
			
			if (!response.ok) {
				return {
					status: 'failed',
				}
			}
			return {
				status: 'success',
				response: await response,
			}
		} catch (err) {
			return {
				status: 'failed',
				error: err.toString()
			}
		}
	}
}

module.exports = EikiWSPProjector;