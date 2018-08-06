function MazeFactory(command){
	try{
		var lines = command.split("\n");
	}catch(err){
		throw Error("Incorrect command format.");
	}
	let firstLine = lines[0]; // 第一行数据
	let secondLine = lines[1]; // 第二行数据
	let arr = firstLine.split(" "); // 将第一行数据按空格分隔
	let x = arr[0]; // 行数
	let y = arr[1]; // 列数
	let arr2 = secondLine.split(";"); // 将第二行数据按 ; 号分隔	
	secondLine+=";";
	let firstPattern = /^\d+\s\d+$/;
	let secondPattern = /^(\d+,\d+\s\d+,\d+;)*$/;
	if(lines.length==2&&arr.length==2){
		if(!firstPattern.test(firstLine)){
			if(x/1&&y/1){
				throw Error("Number out of range.")
			}else{
				throw Error("Invalid number format.")
			}
		}
		arr2.forEach((ele)=>{
			let temp = ele.split(" ").join(",");
			let num = temp.split(",");
			if(num.length%4!=0){
				throw Error("Incorrect command format.");
			}
			let maxVer = Math.max(num[0],num[2]);
			let minVer = Math.min(num[0],num[2]);
			let maxHor = Math.max(num[1],num[3]); 
			let minHor = Math.min(num[1],num[3]);
			let pattern = /^-\d+$/;
			if(pattern.test(maxVer)||pattern.test(maxHor)||pattern.test(minVer)||pattern.test(minHor)){
				throw Error("Number out of range.");
			}
			if(maxVer >=0 && minVer >=0 && maxHor >=0 && minHor>=0){
				if(!(maxVer<=x-1&&minVer>=0)){
					throw Error("Number out of range.");
				}else if(!(maxHor<=y-1&&minHor>=0)){
					throw Error("Number out of range.");
				}else if(maxVer == minVer && maxVer<=x-1&&minVer>=0){
					if(!(maxHor - minHor == 1)){
						throw Error("Maze format error.");
					}
				}else if(maxHor == minHor && maxHor<=y-1&&minHor>=0){
					if(!(maxVer - minVer == 1)){
						throw Error("Maze format error.");
					}
				}

			}else{
				throw Error("Invalid number format.");
			}
		})	
	}else{
		throw Error("Incorrect command format.");
	}
		this.render = [];
		this.rowNum = x;
		this.columnNum = y;
		this.array = arr2;
		this.result = "";
}
// 渲染迷宫
MazeFactory.prototype.Render = function(){
	this.start();
	this.beginRender();
	return this.result;
}

// 渲染数组
MazeFactory.prototype.start = function(){
	this.render = new Array(this.rowNum*2+1);
	for (var i = 0; i < this.rowNum*2+1; i++) {
		this.render[i] = new Array(this.columnNum*2+1).fill("[W]");
	}
}
// 开始渲染数组
MazeFactory.prototype.beginRender = function(){
	for (var i = 0; i < this.array.length; i++) {
		this.connect(this.array[i])
	}
	this.renderData(this.render)
}
// 构造结果字符串
MazeFactory.prototype.renderData = function(){
	this.render.forEach((ele)=>{
		this.result = this.result + ele.join(" ") +"\n";
	})
}
// 渲染数组过程
MazeFactory.prototype.connect = function(arr){
	let temp = arr.split(" ").join(",");
	let num = temp.split(",");
	let maxVer = 2*Math.max(num[0],num[2])+1;
	let minVer = 2*Math.min(num[0],num[2])+1;
	let maxHor = 2*Math.max(num[1],num[3])+1; 
	let minHor = 2*Math.min(num[1],num[3])+1;
	if(maxVer == minVer){

		for(let i = minHor; i <= maxHor;i++ ){
			this.render[maxVer][i] = "[R]";
		}

	}else if(maxHor == minHor){

		for(let i = minVer; i <= maxVer;i++ ){
			this.render[i][maxHor] = "[R]";
		}

	}
}
function test(){

}
