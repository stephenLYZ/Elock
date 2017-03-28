// ELock
// 
// by stephen
// 2017.3.27

import Context from './Views/Context.js'
import Circles from './Views/Circles.js'

class ELock {
	constructor(options) {
		this.options = options || {}
		this.context = new Context(options)
		this.circle = new Circles(options)
	}

	init() {
	}


}

export default ELock