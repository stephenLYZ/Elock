// Circles View
// 
// by stephen
// 2017.3.27

class Circles {
	constructor(options) {
		this.options = options
		this.radius = options.radius || 30
		this.gap = options.gap || 10
		this.number = options.number || 3
		this.lineColor = options.lineColor || "#46c017"
	}

	// 获取画布大小
	getSize() {
		return (this.radius + this.gap) * 2 * this.number
	}
}

export default Circles