const fetch = require('node-fetch')

class EikiWSPProjector {
	constructor(config) {
		const apiHost = config.host
		const apiPort = 80
		const password = config.password

		this.baseUrl = `http://${apiHost}:${apiPort}/`

		this.requestOptions = {
			method: 'GET',
			timeout: 10000,
		}
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
			}
		}
	}
}

module.exports = EikiWSPProjector;