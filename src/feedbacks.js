module.exports = {
    // ##########################
    // #### Define Feedbacks ####
    // ##########################
    feedbacks() {
        let self = this;
        const feedbacks = {};

        const foregroundColorWhite = self.rgb(255, 255, 255) // White
        const foregroundColorBlack = self.rgb(0, 0, 0) // Black
        const backgroundColorRed = self.rgb(255, 0, 0) // Red
        const backgroundColorGreen = self.rgb(0, 255, 0) // Green
        const backgroundColorOrange = self.rgb(255, 102, 0) // Orange

       /* feedbacks['powerState'] = {
            type: 'boolean',
            label: 'Show Power State On Button',
            description: 'Indicate if Power is in X State',
            style: {
                color: foregroundColorWhite,
                bgcolor: backgroundColorRed,
            },
            options: [
                {
                    type: 'dropdown',
                    label: 'Indicate in X State',
                    id: 'state',
                    default: 'false',
                    choices: [
                        { id: 'false', label: 'Off' },
                        { id: 'true', label: 'On' }
                    ]
                }
            ],
            callback: function (feedback) {
                let opt = feedback.options;

				if (self.STATE.powerState.toString() == opt.state.toString()) {
					return true;
				}

                return false
            }
        }*/

        self.setFeedbackDefinitions(feedbacks);
    }
}