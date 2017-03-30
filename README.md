## ELock

[demo]()

<img width="380" alt="elock" src="http://7xl0rs.com1.z0.glb.clouddn.com/elock.gif">

## Usage

### develop

```
$ yarn install
$ npm run start
```

### build

```
$ npm run build
```
## Config

```
let elock = new ELock({
	container: '.root',  // 父容器
	radius: 25,          // 圆的半径
	gap:  25,  			 // 圆的间隔
	number:  3,			 // 行列圆的个数
	size: 400,			 // 画布大小
	lineColor: "#E0494D" // 连线的颜色

})
```
## 实现思路

初始化函数:  

```
init() {
	this.renderContex()  // 渲染画布以及DOM
	this.setType()  	 // 设置模式
	this.renderCircles() // 渲染圆
	this.bindEvents()    // 绑定事件
}
```

### Model
全局维护一个model

```
this.circles = []  // 存储圆的数组
this.selected = [] // 存储选中的圆的数组
this.password = [] // 保存密码
this.type = 1	  //  模式
this.step = 2	  //  验证密码的步骤	
```

其中type = 1 是设置密码的模式， type = 2 是验证密码的模式

### View

主要负责渲染圆，渲染连接的线以及连接完后显示的圆
```
renderContex() {...}
renderCircles() {...}
drawCircle() {...}
drawConnectLine() {...}
drawMoveLine() {...}
selectedRender() {...}
```

### Events

事件代理，监听touch事件，对View进行更新
```
bindEvents() {...}
```

