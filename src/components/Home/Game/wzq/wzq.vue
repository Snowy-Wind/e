<!--  -->
<template>
  <div class='wzq'>
    <div id="chessBox">
			<canvas id="canvas" width="0" height="0"></canvas>
	</div>
	<div id="chess_buttom_box">
			<button class="select">选项</button>
	<button class="anew">撤回</button>
			<button class="regret">重开</button>
	</div>
	<div class="WJ_A">
		<div class="WJ_A_left">
			<div class="Wchess"></div>
			<div class="Wchess_steps">白子第0步</div>
			<div class="Wchess_expression">
				<div class="emoji  emoji--haha">
				    <div class="emoji__face">
				      <div class="emoji__eyes"></div>
				      <div class="emoji__mouth">
				        <div class="emoji__tongue"></div>
				      </div>
				    </div>
				  </div> 
			</div>
		</div>
	</div>
	<div class="WJ_B">
		<div class="WJ_B_right">
			<div class="Bchess"></div>
			<div class="Bchess_steps">黑子第0步</div>
		</div>
		<div class="Bchess_expression">
			<div class="emoji  emoji--haha">
				<div class="emoji__face">
					<div class="emoji__eyes"></div>
					<div class="emoji__mouth">
					<div class="emoji__tongue"></div>
					</div>
				</div>
				</div> 
		</div>
  </div>
  </div>
</template>

<script>

  export default {
  name: '',
//import引入的组件需要注入到对象中才能使用
  components: {},
  data() {return {

    };
  },
//监听属性 类似于data概念
  computed: {},
//监控data中的数据变化
  watch: {},
//方法集合
  methods: {

  },
//生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
//生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    var hy_bodyWidth = document.body.clientWidth;//获取网页可视区宽度
var hy_bodyHeight = document.body.clientHeight;//获取网页可视区高度
var hy_chessBox = document.getElementById("chessBox");
var hy_canvas = document.getElementById("canvas");
var hy_ctx = hy_canvas.getContext("2d");
var hy_buttom_box = document.getElementById("chess_buttom_box");
var hy_regret = document.getElementsByClassName("regret")[0];
var hy_anew = document.getElementsByClassName("anew")[0];
var hy_select = document.getElementsByClassName("select")[0];//Bchess_steps
var hy_BchessSteps = document.getElementsByClassName("Bchess_steps")[0]
var hy_WchessSteps = document.getElementsByClassName("Wchess_steps")[0]
var hy_over = false; // 游戏结束 不可下棋
var hy_me = true; //可以下棋
var anewOff = true;//撤回按钮 可以点击
var regretOff = true// 按钮 可以点击
var hy_count = 0;
var hy_wins = [];
var hy_myWin = [];
var hy_computerWin = [];
var hy_chessBoard = [];
var hy_chessMap = [];
var hy_mode = [[1,0],[0,1],[1,1],[1,-1]];
var hy_lianziArr = [];
var hy_chessStep = 0;
var hy_WchessStep = 0;
var hy_BchessStep = 0;
var chessWB = [];
window.onresize = function(){ // 监听当前窗口改变事件
    setTimeout(function(){ //当前窗口发生改变时 刷新页面
        window.location.reload()
    },hy_bodyWidth / 30)
};

var hy_Mobile_pc = {
	hy_num: 0,
    mWidth_pWidth: 0,
    mHeight_pHeight: hy_bodyHeight,
    devicenNme: "",
};

hy_bodyWidth > 420 ? change(450) : change(360);//iphone 6/7/8/x/plus 画布为 360，pc 为 450

function change(num){//
	hy_Mobile_pc.devicenNme = num == 360 ? hy_Mobile_pc.devicenNme = "移动设备" : hy_Mobile_pc.devicenNme = "非移动设备";
	hy_Mobile_pc.mWidth_pWidth = num;
	hy_Mobile_pc.hy_num = num;
	hy_Mobile_pc.canvas_Width = num;
	hy_buttom_box.style.width = num + "px";
	// hy_chessBox.style.top = (hy_bodyHeight - num) / 2 + "px";
	// hy_buttom_box.style.top = (hy_bodyHeight - num) / 2 + 20 + "px";
	if(num == 450){
		hy_buttom_box.style.height = 30 + "px";
		hy_chessBox.style.width = num + "px";
		hy_chessBox.style.height = num + "px";
		hy_canvas.width = num;
		hy_canvas.height = num;
	}else{
		hy_regret.className = "regret mobile_regret";
		hy_anew.className = "anew mobile_anew";
		hy_select.className = "select mobile_select";
		let hy_wja = document.getElementsByClassName("WJ_A")[0];
		let hy_wjb = document.getElementsByClassName("WJ_B")[0];//Wchess_expression
		let hy_Wchessexp = hy_wja.getElementsByClassName("Wchess_expression")[0];
		let hy_Bchessexp = hy_wjb.getElementsByClassName("Bchess_expression")[0];
		hy_chessBox.style.width = num - 20 + "px";
		hy_chessBox.style.height = num - 20 + "px";
		hy_canvas.width = num - 20 ;
		hy_canvas.height = num - 20;
		//hy_wja.style.top = hy_chessBox.offsetTop - (num + 140 )+ "px"; 
		//保持在不同任何的高度下 hy_wjb.style.top 位于 hy_chessBox底下
		hy_wjb.style.top = (hy_bodyHeight - (hy_chessBox.offsetTop + num) - 120) + "px";
		hy_wja.style.top = (hy_bodyHeight - (hy_chessBox.offsetTop + num) - (hy_chessBox.offsetHeight + 138)) + "px"; 
		// hy_buttom_box.style.top = (hy_bodyHeight - 50) / 3 + 50 + "px";
		hy_buttom_box.style.top = (hy_bodyHeight - (hy_chessBox.offsetTop + num)) + 80 + "px";
		hy_Wchessexp.style.left = (hy_bodyWidth - 50) / 2 + "px";
		hy_Bchessexp.style.left = (hy_bodyWidth - 50) / 2 + "px";
		hy_wja.className = "WJ_A mobile_wja";
		hy_wjb.className = "WJ_B mobile_wjb";
		
	}
}

!(function(){//画棋盘
	let mums = hy_Mobile_pc.hy_num;
	let linex = 0,liney = 0;
	mums == 360 ? linex = 22 : linex = 30;
	mums == 360 ? liney = 323 : liney = 435;
    for(let i = 0; i < 15; i++){
        hy_ctx.moveTo(15 + i * linex + .5,liney)
        hy_ctx.lineTo(15 + i * linex + .5,15)
        hy_ctx.moveTo(15,15 + i * linex + .5)
        hy_ctx.lineTo(liney,15 + i * linex + .5)
        hy_ctx.strokeStyle = "#C0A27B";
        hy_ctx.stroke();
    }
})()



function yinfasz(){
	for (let i = 0; i < 15; i++) {
		hy_wins[i] = [];
		for (let j = 0; j < 15; j++) {
			hy_wins[i][j] = [];
		}
	}
	for (let i = 0; i < 15; i++) {
		for (let j = 0; j < 11; j++) {
			for (let k = 0; k < 5; k++) {
				hy_wins[i][j + k][hy_count] = true;
			}
			hy_count++;
		}
	}
	for (let i = 0; i < 15; i++) {
		for (let j = 0; j < 11; j++) {
			for (let k = 0; k < 5; k++) {
				hy_wins[j + k][i][hy_count] = true;
			}
			hy_count++;
		}
	}
	for (let i = 0; i < 11; i++) {
		for (let j = 0; j < 11; j++) {
			for (let k = 0; k < 5; k++) {
				hy_wins[i + k][j + k][hy_count] = true;
			}
			hy_count++;
		}
	}
	for (let i = 0; i < 11; i++) {
		for (let j = 14; j > 3; j--) {
			for (let k = 0; k < 5; k++) {
				hy_wins[i + k][j - k][hy_count] = true;
			}
			hy_count++;
		}
	}

	for (let i = 0; i < hy_count; i++) {
		hy_myWin[i] = 0;
		hy_computerWin[i] = 0;
	}
	
	
	
	for (let i = 0; i < 15; i++) {
		hy_chessBoard[i] = [];
		hy_chessMap[i] = [];
		hy_lianziArr[i] = []
		for (let j = 0; j < 15; j++) {
			hy_chessBoard[i][j] = 0;
			hy_chessMap[i][j] = 0;
			hy_lianziArr[i][j] = 0;
		}
	}
	
	
}
yinfasz();

function creat_dm(i,j,me,nums) {
	let dm = document.createElement("div")
		let chessNames = "";
		if(nums == 360){
			if(me){
				chessNames = "Bchess mobile_Bchess";
				
			}else{
				chessNames = "Wchess mobile_Wchess"
			}
			dm.style.left = (i * 22) + 5 + "px";
			dm.style.top = (j * 22) + 5 + "px";
		}else{
			if(me){
				chessNames = "Bchess"
			}else{
				 chessNames = "Wchess";
			}
			dm.style.left = (i * 30) + "px";
			dm.style.top = (j * 30) + "px";
		}
		dm.list = hy_chessStep++;
		dm.dm_x = i;
		dm.dm_y = j;
		dm.className = chessNames; 
		hy_WchessStep ++;
		hy_lianziArr[i][j] = dm;
		chessWB.push(dm)
		hy_chessBox.appendChild(dm)
	
	let ws = Math.floor((hy_WchessStep / 2));
	hy_WchessSteps.innerHTML ="白子第" + ws  + "步"
	hy_BchessSteps.innerHTML = "黑子第" + ws  + "步"
}

function on_down(e){
	e.preventDefault()
	let mps =  hy_Mobile_pc.hy_num;
	if (!hy_me) {
	    return;
	}
	if (hy_over) {
	    return;
	}
	let mx,my;
	if(mps == 360){
		mx = Math.floor(e.offsetX / 22);
		my = Math.floor(e.offsetY / 22);
	}else{
		mx = Math.floor(e.offsetX / 30);
		my = Math.floor(e.offsetY / 30);
	}
	let i = mx;
	let j = my;
	
	
	if (hy_chessBoard[i][j] == 0) {
	    creat_dm(i, j,hy_me,mps);
	    hy_chessBoard[i][j] = "我方";
		hy_chessMap[i][j] = "黑棋";
	}
	for (let k = 0; k < hy_count; k++) {
	    if (hy_wins[i][j][k]) {
			hy_mode.forEach(function(value,index){
				continuity(i,j,"黑棋",hy_mode[index])
			})
	        hy_myWin[k]++;
	        if (hy_myWin[k] == 5) {
	         let hy_Bchessexp = document.getElementsByClassName("Bchess_expression")[0];
			 hy_Bchessexp.style.display = "block";
			   anewOff = false;
			   hy_anew.style.background = "#f55858";
	            hy_over = true;
	        }
	    }
	}
	if (!hy_over) {
	    computerAI();
	    hy_me = !hy_me;
	}
	
}



function continuity(x,y,c,m){
	let count = 0;
	let lianziArr = [];
	for(var i = 1; i < 5; i++){
		if(hy_chessMap[x + i * m[0]]){
			if(hy_chessMap[x + i * m[0]][y + i * m[1]] === c){
				lianziArr.push([x + i * m[0],y + i * m[1]])
				count++;
			}
		}
	}
	
	for(var i = 1; i < 5; i++){
		if(hy_chessMap[x - i * m[0]]){
			if(hy_chessMap[x - i * m[0]][y - i * m[1]] === c){
				lianziArr.push([x - i * m[0],y - i * m[1]])
				count++;
			}
		}
	}
	if(count >= 4){
		lianziArr.push([x,y])
		let s = 5;
		let ls = [270,300,330,360,390];
		let ls1 = [390,420,450,480,510];
		lianziArr.forEach(function(value,index){
		    let time = setInterval(function(){
		       hy_lianziArr[value[0]][value[1]].style.transform = 'scale(0.9)';
		       hy_lianziArr[value[0]][value[1]].style.boxShadow = "0px 0px 2px 2px #ffd507";
			   //hy_lianziArr[value[0]][value[1]].innerText = hy_lianziArr[value[0]][value[1]].list;
		        s--;
		        s <= 0 ? clearInterval(time) : clearInterval(time);
		    },ls[index])
		    let time2 = setInterval(function(){
		        hy_lianziArr[value[0]][value[1]].style.transform = 'scale(1)';
		        hy_lianziArr[value[0]][value[1]].style.boxShadow = "0px 0px 2px 2px #ffd507";
		        s++
		        s >= 5 ? clearInterval(time2) : clearInterval(time2);
		    },ls1[index])
		})
		chessWB.forEach(function(value,index){
			chessWB[index].innerText = value.list;
		})
	}
	
}


function computerAI() {
	let myScore = [];
	let computerScore = [];
	let iMax = 0;
	let u = 0;
	let v = 0;
	
	for (let i = 0; i < 15; i++) {
		myScore[i] = [];
		computerScore[i] = [];
		for (let j = 0; j < 15; j++) {
			myScore[i][j] = 0;
			computerScore[i][j] = 0;
		}
	}
	for (let i = 0; i < 15; i++) {
		for (let j = 0; j < 15; j++) {
			if (hy_chessBoard[i][j] == 0) {
				for (let k = 0; k < hy_count; k++) {
					if (hy_wins[i][j][k]) {
						if (hy_myWin[k] == 1) {
							myScore[i][j] += 200;
						} else if (hy_myWin[k] == 2) {
							myScore[i][j] += 400;
						} else if (hy_myWin[k] == 3) {
							myScore[i][j] += 2000;
						} else if (hy_myWin[k] == 4) {
							myScore[i][j] += 10000;
						}
						if (hy_computerWin[k] == 1) {
							computerScore[i][j] += 400;
						} else if (hy_computerWin[k] == 2) {
							computerScore[i][j] += 800;
						} else if (hy_computerWin[k] == 3) {
							computerScore[i][j] += 2200;
						} else if (hy_computerWin[k] == 4) {
							computerScore[i][j] += 20000;
						}
					}
				}
				if (myScore[i][j] > iMax) {
					iMax = myScore[i][j];
					u = i;
					v = j;
				} else if (myScore[i][j] == iMax) {
					if (computerScore[i][j] > computerScore[u][v]) {
						u = i;
						v = j;
					}
				}
				if (computerScore[i][j] > iMax) {
					iMax = computerScore[i][j];
					u = i;
					v = j;
				} else if (computerScore[i][j] == iMax) {
					if (myScore[i][j] > myScore[u][v]) {
						u = i;
						v = j;
					}
				}
			}
		}
	}
	
		
	creat_dm(u, v, false,hy_Mobile_pc.hy_num);
	hy_chessBoard[u][v] = "对方";
	hy_chessMap[u][v] = "白棋";
	for (let k = 0; k < hy_count; k++) {
		if (hy_wins[u][v][k]) {
			hy_mode.forEach(function(value,index){
				continuity(u,v,"白棋",hy_mode[index])
			})
			hy_computerWin[k]++;
			if (hy_computerWin[k] == 5) {
				//window.alert('YOU LOST!');
				let hy_Wchessexp = document.getElementsByClassName("Wchess_expression")[0];
				hy_Wchessexp.style.display = "block";
				anewOff = false;
				hy_anew.style.background = "#f55858";
				hy_over = true;
			}
		}
	}
	if (!hy_over) {
		hy_me = !hy_me;
	}
};




hy_anew.onclick = function(e){
	if(!anewOff)return;
	if(chessWB.length <= 0) return;
	var rm_dm = [],xy = [],rmlist = [];
	for(var i = 0; i < 2; i++){
		hy_WchessStep --;
		rm_dm.push(chessWB.pop())
		xy.push([rm_dm[i].dm_x,rm_dm[i].dm_y]);
		rmlist.push(rm_dm[i].list)
		//更新棋盘对应的状态
		hy_chessMap[xy[i][0]][xy[i][1]] = 0;
		hy_chessBoard[xy[i][0]][xy[i][1]] = 0;
		//撤回这步非常重要
		//删除撤回的棋子/更新所有赢法
		for(var k = 0; k < hy_count; k++){
			if(hy_wins[xy[i][0]][xy[i][1]][k]){
				hy_computerWin[k]--;
				hy_myWin[k]--;
				rm_dm[i].list --;
			}
		}
		rm_dm[i].remove()
	}	
	let ws = Math.floor((hy_WchessStep / 2));
	hy_WchessSteps.innerHTML ="白子第" + ws  + "步"
	hy_BchessSteps.innerHTML = "黑子第" + ws  + "步"
}
//放弃移动端touchstart事件
hy_canvas.addEventListener("click",on_down);
hy_regret.onclick = function(e){
	if(regretOff){
		chessWB.forEach(function(v,i){
			v.remove();
		})
		hy_count = 0;
		chessWB = [];
		hy_myWin = [];
		hy_computerWin = [];
		hy_lianziArr = [];
		hy_chessStep = 0;
		yinfasz()
		hy_over = true;
		hy_me = false;
		anewOff = false;
		regretOff = false;
		hy_regret.innerText = "再点";
		hy_regret.style.background = "#f55858";
		
	}else{
		regretOff = !regretOff;
		hy_regret.innerText = "重开";
		hy_regret.style.background = "#03a9f4";
		hy_anew.style.background = "#03a9f4";
		hy_over = !hy_over;
		hy_me = !hy_me;
		anewOff = !anewOff;
	}
	hy_WchessStep = 0;
	hy_WchessSteps.innerHTML ="白子第" + 0  + "步"
	hy_BchessSteps.innerHTML = "黑子第" + 0 + "步"
	let hy_Wchessexp = document.getElementsByClassName("Wchess_expression")[0];
	hy_Wchessexp.style.display = "none";
	let hy_Bchessexp = document.getElementsByClassName("Bchess_expression")[0];
	hy_Bchessexp.style.display = "none";
}

hy_select.onclick = function(){
	alert("暂无功能")
}
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style>
#chessBox,#chess_buttom_box{
    position: relative;
    margin: 0 auto;
    border-radius: 6px;
    box-shadow: 1px 1px 3px 1px #9e9e9e5e;
}

#chess_buttom_box{
    margin-top: 10px;
    height: 50px;
    top: 0px;
    box-shadow: 0px 0px 0px 0px #9e9e9e5e;
}

#canvas{
    display: block;
    top: 0px;
    position: absolute;
    background: #f7e6b7;
    border-radius: 4px;
}

.WJ_A,.WJ_B{
    position: relative;
    width: 100%;
    height: 70px;
    display: none;
}

.mobile_wja,.mobile_wjb{
    display: block;
}

.WJ_A_left,.WJ_B_right{
    position: absolute;
    top: 15px;
    width: 120px;
    height: 40px;
    background: #f3f3f3;
	box-shadow: 0px 0px 5px 1px #dedede;
}
.WJ_B_right{
	right: 0;
	border-radius: 30px 0px 0px 30px;
}
.WJ_A_left{
	left: 0;
	border-radius: 0px 30px 30px 0px;
}
.WJ_A > .WJ_A_left > .Wchess{
	top: 5px;
	left: 10px;
}

.WJ_B > .WJ_B_right > .Bchess{
	top: 5px;
	right: 10px;
}



.Wchess_expression{
    position: absolute;
    width: 50px;
    height: 50px;
	display: none;
}
.Wchess_expression::after{
	content: "白棋获胜";
	position: absolute;
	width: 150%;
	height: 100%;
	left: 50px;
	top: 0px;
	font-size: 15px;
	text-align: center;
	line-height: 50px;
}
.Bchess_expression{
	position: absolute;
	width: 50px;
	height: 50px;
	top: 10px;
	display: none;
}
.Bchess_expression::after{
	content: "黑棋获胜";
	position: absolute;
	width: 150%;
	height: 100%;
	left: -82px;
	top: 0px;
	font-size: 15px;
	text-align: center;
	line-height: 50px;
}

/*******************************/

/***********重开撤回按钮***********/
.regret,.anew,.select{
    position: absolute;
    width: 90px;
    height: 30px;
    background: #03A9F4;
    color: #fff;
    outline: none;
    border: 0px;
    user-select: none;
    border-radius: 20px;
    line-height: 30px;
    left: 239px;
}
.regret{left: 122px;}
.select{display: none;}
.mobile_regret,.mobile_anew,.mobile_select{
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 30px;
    left: 250px;
    font-size: 12px;
	box-shadow: 0px 0px 5px 1px #c7c7c7;
}
.mobile_regret{left: 310px;}
.mobile_select{display: block;left: 10px;}
/*******************************/

/***********黑白棋子***********/
.Bchess,.Wchess,.mobile_Bchess,.mobile_Bchess{
    position: absolute;
    width: 27px;
    height: 27px;
    border-radius: 30px;
    background: radial-gradient(#62697b 10%,#49535d 90%);
    box-shadow: 1px 1px 2px 0 #0000006e;
    font-size: 10px;
    line-height: 27px;
    text-align: center;
    color: #fff
}
.Wchess{
    background: radial-gradient( #fdf9f9 20%,#edf0f0 90%);
    box-shadow: 1px 1px 2px 0 #0000006e;
    color: #000
}
.mobile_Bchess,.mobile_Wchess{
	width: 19px;
	height: 19px;
	line-height: 19px;
	font-size: 10px;
	color: #fff;
}
.mobile_Wchess{color: #000000;}

.Wchess_steps,.Bchess_steps{
	position: absolute;
	width: 82px;
	height: 30px;
	border-radius: 20px;
	top: 5px;
	font-size: 10px;
	text-align: center;
	line-height: 30px;
	color: #949494;
}
.Wchess_steps{
	right: 0px;
}
/*******************************/

.emoji {
    position: absolute;
    width: 120px;
    height: 120px;
    margin: 0px;
    background: #FFDA6A;
    display: inline-block;
    border-radius: 50%;
    position: relative;
    transform: scale(.4);
	left: -36px;
    top: -36px;
  }
  .emoji:after {
    position: absolute;
    bottom: -40px;
    font-size: 18px;
    width: 60px;
    left: calc(50% - 30px);
    color: #8A8A8A;
  }
  
  .emoji__face,.emoji__eyes, .emoji__mouth, .emoji__tongue{
    position: absolute;
  }
  .emoji__face:before,
  .emoji__face:after, 
  .emoji__eyebrows:before,
  .emoji__eyebrows:after, 
  .emoji__eyes:before, 
  .emoji__eyes:after, 
  .emoji__mouth:before, 
  .emoji__mouth:after, 
  .emoji__tongue:before, 
  .emoji__tongue:after{
    position: absolute;
    content: '';
  }
  
  .emoji__face {
    width: inherit;
    height: inherit;
  }
  .emoji--haha:after {
    content: '';
  }
  .emoji--haha .emoji__face {
    animation: haha-face 2s linear infinite;
  }
  .emoji--haha .emoji__eyes {
    width: 26px;
    height: 6px;
    border-radius: 2px;
    left: calc(50% - 13px);
    top: 35px;
    transform: rotate(20deg);
    background: transparent;
    box-shadow: -25px 5px 0 0 #000000, 25px -5px 0 0 #000000;
  }
  .emoji--haha .emoji__eyes:after {
    left: 0;
    top: 0;
    width: 26px;
    height: 6px;
    border-radius: 2px;
    transform: rotate(-40deg);
    background: transparent;
    box-shadow: -25px -5px 0 0 #000000, 25px 5px 0 0 #000000;
  }
  .emoji--haha .emoji__mouth {
    width: 80px;
    height: 40px;
    left: calc(50% - 40px);
    top: 50%;
    background: #000000;
    border-radius: 0 0 40px 40px;
    overflow: hidden;
    z-index: 1;
    animation: haha-mouth 2s linear infinite;
  }
  .emoji--haha .emoji__tongue {
    width: 70px;
    height: 30px;
    background: #F55064;
    left: calc(50% - 35px);
    bottom: -10px;
    border-radius: 50%;
  }


  @keyframes haha-face {
    10% {
      transform: translateY(25px);
    }
    20% {
      transform: translateY(15px);
    }
    30% {
      transform: translateY(25px);
    }
    40% {
      transform: translateY(15px);
    }
    50% {
      transform: translateY(25px);
    }
    60% {
      transform: translateY(0);
    }
    70% {
      transform: translateY(-10px);
    }
    80% {
      transform: translateY(0);
    }
    90% {
      transform: translateY(-10px);
    }
  }

  @keyframes haha-mouth {
    10% {
      transform: scale(0.6);
      top: 45%;
    }
    20% {
      transform: scale(0.8);
      top: 45%;
    }
    30% {
      transform: scale(0.6);
      top: 45%;
    }
    40% {
      transform: scale(0.8);
      top: 45%;
    }
    50% {
      transform: scale(0.6);
      top: 45%;
    }
    60% {
      transform: scale(1);
      top: 50%;
    }
    70% {
      transform: scale(1.2);
      top: 50%;
    }
    80% {
      transform: scale(1);
      top: 50%;
    }
    90% {
      transform: scale(1.1);
      top: 50%;
    }
  }
</style>