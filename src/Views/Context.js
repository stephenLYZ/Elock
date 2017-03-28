// Context View
// 
// by stephen
// 2017.3.27

import $ from 'jquery'

class Context {
	constructor(options) {
		this.options = options
		this.container = $(options.container) || 'div'
	}

	init(size) {
		let el = document.createElement('div')
		let tpl = "<h4 class='title'>请输入手势密码</h4>" + 
				  `<canvas width=${size} height=${size}></canvas>` +
				  "<input name='pwd' type='radio' value='set' id='set' checked> <label for='set'>设置密码</label> </br>" +
				  "<input name='pwd' type='radio' value='auth' id='auth'> <label for='auth'>验证密码</label>"

		el.innerHTML = tpl
		this.container.append(el)
	}
}

export default Context