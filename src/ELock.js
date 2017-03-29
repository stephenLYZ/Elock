// ELock
// 
// by stephen
// 2017.3.27
import $ from 'jquery'

class ELock {
	constructor(options) {
		this.options = options || {}
		this.radius = options.radius || 20 // 半径
		this.gap = options.gap || 20 // 间隔
		this.number = options.number || 3  // 行列个数
		this.container = $(options.container) || 'div'
		this.circlesSize = this.radius + this.gap   //圆范围的大小
		this.size = options.size || (this.radius + this.gap) * 2 * this.number  // 画布的大小
		this.lineColor = options.lineColor || "#E0494D"  // 线的颜色
		this.circles = []  // 存储圆的数组
		this.selected = [] // 存储选中的圆的数组
		this.password = [] // 保存密码
		this.type = 1	  //  模式
		this.step = 2	  //  验证密码的步骤	

	}

	init() {		
		this.renderContex()
		this.canvas = document.getElementById('canvas')
		this.ctx = this.canvas.getContext('2d') // context 对象 
		this.setType()
		this.renderCircles()
		this.bindEvents()	
	}

	// 渲染画布
	renderContex() {
		let el = document.createElement('div')
		let tpl = "<h3 class='title'>请输入手势密码</h3>" + 
				  `<canvas id='canvas' width=${this.size} height=${this.size}></canvas>` +
				  "<div id='flash'></div>" +
				  "<input name='pwd' type='radio' value='set' id='set' checked> <label for='set'>设置密码</label> </br>" +
				  "<input name='pwd' type='radio' value='auth' id='auth'> <label for='auth'>验证密码</label>"

		el.innerHTML = tpl
		this.container.append(el)
	}
	// 渲染圆
	renderCircles() {
		let circlesSize = this.circlesSize
		let circles = this.circles
		for(let i = 0; i < this.number; i++) {
			for(let j = 0; j < this.number; j++) {
				let x = circlesSize + j * circlesSize * 2
				let y = circlesSize + i * circlesSize * 2
				let index = circles.length
				circles.push(this.cicleObject(x, y, index))
				this.drawCircle(index)
			}
		}
	}
	// 创建圆对象
	// @param x x坐标
	// @param y y坐标
	// @param index 圆的索引
	// @param isChoosed 是否被选中
	cicleObject(x, y, index, isChoosed) {
		return {
			x: x, 
			y: y,
			index: index,
			isChoosed: isChoosed || false
		}
	}
	// 画基本圆
	// @param index 圆的索引
	// @param config 传入参数
	drawCircle(index, config) {
		let x = this.circles[index].x  // x坐标
		let y = this.circles[index].y  // y 坐标
		// console.log(config.solid)
		let solid = config ? config.solid : false  // 是否选中
		let color = '#FFA727'  // 圆的颜色
		let ctx = this.ctx
		// 未被选中
		if(!solid) {
			ctx.beginPath()
			ctx.arc(x, y, this.radius, 0, Math.PI*2, true)
			ctx.lineWidth = 1.0
			ctx.strokeStyle = '#999'
			ctx.fillStyle = 'white'
			ctx.fill()
			ctx.stroke()
			ctx.closePath()
		} else {
			ctx.beginPath()
			ctx.arc(x, y, this.radius, 0, Math.PI*2, true)
			ctx.fillStyle = color
			ctx.fill()
			ctx.closePath()
		}
	}

	// 画连接两个圆的线
	// @param sindex 起始位置
	// @param eindex 结束位置
	// @param color  线的颜色
	drawConnectLine(sindex, eindex, color) {
		let x1 = this.circles[sindex].x
		let y1 = this.circles[sindex].y
		let x2 = this.circles[eindex].x
		let y2 = this.circles[eindex].y
		let ctx = this.ctx

		ctx.beginPath()
		ctx.moveTo(x1, y1)
		ctx.lineTo(x2, y2)
		ctx.lineWidth = 2.0
		ctx.strokeStyle = color || this.lineColor
		ctx.stroke()
		ctx.closePath()
	}

	// 画移动的线
	// @param startX
	// @param startY
	// @param posX
	// @param posY
	drawMoveLine(startX, startY, posX, posY) {
		let ctx = this.ctx
		ctx.beginPath()
		ctx.moveTo(startX, startY)
		ctx.lineTo(posX, posY)
		ctx.lineWidth = 2.0
		ctx.strokeStyle = this.lineColor
		ctx.stroke()
		ctx.closePath()
	}
	// 清空画布
	clearCanvas() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
	}
	// 判断是否在圆内
	// @param x坐标
	// @param y坐标
	checkInCircle(x, y) {
		let number = this.number
		let circlesSize = this.circlesSize
		let col = Math.floor(x / circlesSize / 2)
		let row = Math.floor(y / circlesSize / 2)
		let circle = this.circles[row * number + col]
		if(col > number || row > number || col < 0 || row < 0)  return null
		if( x <= circle.x + this.radius && x >= circle.x - this.radius &&
            y <= circle.y + this.radius && y >= circle.y - this.radius
          ){
          	return circle.index
          }else {
            return null
        }

	}
	// 渲染选中后的圆
	// @param selected 选中的数组
	selectedRender() {
		this.clearCanvas()
		for(let i = 0; i < this.circles.length; i++) {
			this.drawCircle(i, this.circles[i].isChoosed ? { solid: true } : null)
		}

		for(let i = 0; i < this.selected.length - 1 ; i++) {
			this.drawConnectLine(this.selected[i], this.selected[i+1])
		}
	}
	// 重新渲染
	reRenderCircles() {
		this.clearCanvas()
		for(let i = 0; i < this.circles.length; i++) {
			this.circles[i].isChoosed = false
			this.drawCircle(this.circles[i].index)
		}
		this.selected = []
	}
	// 获取坐标
	getCoord(e) {
		let isTouch = document.hasOwnProperty("ontouchstart")
		let rect = e.currentTarget.getBoundingClientRect()
		e = isTouch ? e.touches[0] : e
		let coord = {
			x: e.clientX - rect.left,
            y: e.clientY - rect.top
		}
		return coord
	}

	bindEvents() {
		let isTouch = document.hasOwnProperty("ontouchstart")  // 判断是否支持手机事件
		let touchStart = isTouch ? 'touchstart' : 'mousedown'    // 点击
		let touchMove = isTouch ? 'touchmove'  : 'mousemove'    // 拖动
		let touchEnd = isTouch ? 'touchend'   : 'mouseup'    // 抬起
		let canvas = document.getElementById('canvas')
		let drawing = false
		let tempCoord = {}
		let that = this

		canvas.addEventListener(touchStart, function(e) {
			e.preventDefault()
			let coord = that.getCoord(e)
			tempCoord = coord
			let index = that.checkInCircle(coord.x, coord.y)
			if(index!==null) {
				drawing = true
				that.selected.push(index)
				that.circles[index].isChoosed = true
				that.selectedRender()
			}

			canvas.addEventListener(touchMove, function(e) {
				e.preventDefault()
				if(!drawing) return
				let coord = that.getCoord(e)
				let index = that.checkInCircle(coord.x, coord.y)
				that.selectedRender()
				if(index === null || that.circles[index].isChoosed) {
					let startX = tempCoord.x
					let startY = tempCoord.y
					let posX = coord.x
					let posY = coord.y
					that.drawMoveLine(startX, startY, posX, posY)
				} else {
					tempCoord.x = that.circles[index].x
					tempCoord.y = that.circles[index].y
					that.selected.push(index)
					that.circles[index].isChoosed = true
				}			
			}, false)

			canvas.addEventListener(touchEnd, function(e) {
				e.preventDefault()
				if(drawing) {
					drawing = false
					that.setPassword(that.selected)
					setTimeout(function() {
						that.reset()
					}, 300)
				}			
			}, false)

		}, false)	
	}
	// 设置模式
	setType() {
		let that = this
		$('#set').on('click', function() {
			that.type = 1
		})

		$('#auth').on('click', function() {
			that.type = 2
		})
		
	}

	// 设置/验证 密码
	setPassword(pwd) {
		if(this.type === 1) {
			if(this.step === 1) {
				if(this.checkPassword(this.password, pwd)) {
					window.localStorage.removeItem('password')
					$('#flash').innerHTML = '密码保存成功'
					window.localStorage.setItem('password', JSON.stringify(this.spassword))
				} else {
					$('#flash').innerHTML = '两次输入不一致'
					this.step = 2
				}
			} else {
				this.step = 1
				this.password = pwd
				$('#flash').innerHTML = '请再次输入'
			}
		} else {
			let password = JSON.parse(window.localStorage.getItem('password'))
			if(this.checkPassword(password, pwd)) {
				$('#flash').innerHTML = '解锁成功'
			} else {
				$('#flash').innerHTML = '解锁失败'
			}
		}
	}

	// 重置
	reset() {
		this.reRenderCircles()
	}
	// 判断密码是否一致
	checkPassword(p1, p2) {
		let _p1 = ''
		let _p2 = ''
		for(let i of p1) {
			_p1 += p1[i].index
		}
		for(let i of p1) {
			_p2 += p2[i].index
		}

		return _p1 === _p2
	}
	

}

export default ELock