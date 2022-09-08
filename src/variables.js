const { isArrayLikeObject } = require("lodash");

module.exports = {
	updateVariableDefinitions() {
		let variables = [
			{ label: 'Module State', 					name: 'module_state'},
			{ label: 'Power State', 					name: 'power'}
		]

		this.setVariableDefinitions(variables);
	},

	checkVariables() {
		try {
			this.setVariable('power',						this.STATE.power);
		}
		catch(error) {
			//do something with that error
			if (this.config.verbose) {
				this.log('debug', 'Error Updating Variables: ' + error);
			}
		}
	}
}