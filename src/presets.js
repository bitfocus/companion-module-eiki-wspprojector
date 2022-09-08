module.exports = {
	presets() {
		const presets = []

		const white = this.rgb(255, 255, 255)
		const black = this.rgb(0, 0, 0)
		const green = this.rgb(0, 204, 0)
		const red = this.rgb(220, 53, 69)
		const blue = this.rgb(0, 0, 255)

		presets.push({
			category: 'Power',
			label: 'Power On',
			bank: {
				style: 'text',
				text: 'Power: $(eiki-pj:power)',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'powerOn'
				}
			],
			feedbacks: [
				{
					type: 'powerState',
					options: {
						state: 'true',
					},
					style: {
						color: foregroundColor,
						bgcolor: backgroundColorRed
					}
				}
			]
		});

		presets.push({
			category: 'Power',
			label: 'Power Off',
			bank: {
				style: 'text',
				text: 'Power: $(eiki-pj:power)',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'powerOff'
				}
			],
			feedbacks: [
				{
					type: 'powerState',
					options: {
						state: 'false',
					},
					style: {
						color: foregroundColor,
						bgcolor: backgroundColorRed
					}
				}
			]
		});

		this.setPresetDefinitions(presets)
	},
}
