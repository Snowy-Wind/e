<!--  -->
<template>
  <div class='pt'>
    <el-button type="primary" @click="regame">重新开始</el-button>
    <img :src="imgurl" class="ptimg">
    <div class="game-box">
      <div class="ptgame" id="game">
        <div class='a1'></div>
        <div class='a2'></div>
        <div class='a3'></div>
        <div class='a4'></div>
        <div class='a5' id="while"></div>
        <div class='a6'></div>
        <div class='a7'></div>
        <div class='a8'></div>
        <div class='a9'></div>
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
    pbreak: '',
    imgarr:['t1','t2','t3','t4'],
    imgurl: 'static/images/gameImage/pt/t1.png',
    };
  },
//监听属性 类似于data概念
  computed: {},
//监控data中的数据变化
  watch: {},
//方法集合
  methods: {
    regame(){
      //调用随机图片方法
      this.imgurl = this.pbreak.img(this.imgarr)
      //调用拼图方法
      this.pbreak.disor()
      
    }
  },
//生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
//生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    
	//创建初始常量
	// const arr=['a1','a2','a3','a4','a5','a6','a7','a8','a9'];
	const arr=[{left:'0px',top:'0px',},{left:'100px',top:'0px'},{left:'200px',top:'0px'},{left:'0px',top:'100px'},{left:'100px',top:'100px'},{left:'200px',top:'100px'},{left:'0px',top:'200px'},{left:'100px',top:'200px'},{left:'200px',top:'200px'}]
	//备用变量用于随机
	let arr1=arr.concat()
	//sort方法随机数组,=>函数是es6高级写法,相当于function(){}
	arr1.sort(()=>{
		return Math.random()-0.5;
	})
	// console.log(arr1)
	//创建构造函数,es6语法糖写法
	class Puzzle{
		constructor(arr,arr1){
			this.list=arr;
			this.rlist=arr1;
			
		}
		//原型里添加函数,随机拼图
			disor(){
				//获取所有拼图标签
				let game=document.querySelectorAll('#game div');
				//获取空白位置
				let lucency=document.querySelector('#while')
				let con=this.list;
				//遍历所有标签并为其添加left和top
				for(let i=0;i<game.length;i++){
					
					
					
					// console.log(this.rlist[i])
					game[i].style.left=this.rlist[i].left
					game[i].style.top=this.rlist[i].top
					
					
					//给每个div加鼠标按下事件
					// game[i].offsetLeft
					game[i].onclick=function(){
						//添加拖动事件	
						// this.onmousemove=function(){
							//拿到空白位置的left值
							let pleft=lucency.offsetLeft
							//拿到空白位置的top值
							let ptop=lucency.offsetTop
							//获取点击方块的left
							let gleft=this.offsetLeft;
							//获取点击方块的top
							let gtop=this.offsetTop
							
							//判断其高度宽度差距决定是否移动位置
							if(gleft-pleft<=100&&gleft-pleft>0&&gtop==ptop || pleft-gleft<=100&&pleft-gleft>0&&gtop==ptop){
								this.style.left=pleft+'px';
								lucency.style.left=gleft+'px'
							}else if(gtop-ptop<=100&&gtop-ptop>0&&gleft==pleft || ptop-gtop<=100&&ptop-gtop>0&&gleft==pleft){
								this.style.top=ptop+'px';
								lucency.style.top=gtop+'px'
							}
							
						// };
						//创建一个数组做记录
						let a=[]
						for(let j=0;j<con.length;j++){
							
							// console.log('conleft',con[j].left)
							// console.log('game',game[j].style.left)
							//不断与原数组做比较,如果符合就给数组a加一位数
							if(con[j].left==game[j].style.left&&con[j].top==game[j].style.top){
								a.push(j)
								
								if(a.length==con.length){
									//全部符合就显示隐藏模块
									lucency.style.opacity='1'
                  game[j].onclick=null
                  this.$message({
                    message: '成功通过',
                    type: 'success'
                  })
								}
							}
						}
						console.log(a)
					}
					// //添加鼠标弹起事件
					// game[i].onmouseup=function(){
					// 	//取消拖动事件
					// 	this.onmousemove=null
					// };
					
					
				}
				
			}
			//随机图片
			img(imgarr){
				//获取所有拼图标签
				let game=document.querySelectorAll('#game div');
				//随机图片
				let tu=imgarr[Math.floor(Math.random()*(imgarr.length))];
				//遍历所有拼图div标签
				for(let k=0;k<this.rlist.length;k++){
					
					//给每个div更改背景图片
					game[k].style.backgroundImage=' url("static/images/gameImage/pt/'+tu+'.png")'
        }
        this.imgurl = 'static/images/gameImage/pt/'+tu+'.png'
        return this.imgurl
			}
			
	}
	//实例化构造函数
	this.pbreak=new Puzzle(arr,arr1)
	//调用随机图片方法
	this.imgurl = this.pbreak.img(this.imgarr)
	//调用拼图方法
	this.pbreak.disor()
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
.pt {
  position: relative;
}

.game-box{
/* overflow: hidden; */
  position: absolute;
  top: 460px;
  right: 0;
  bottom: 0;
  left: -370px;
  margin: auto;
  width: 300px;
  height: 300px;
  border: 2px solid skyblue;
  padding: 1px;
}

.ptimg{
  position: absolute;
  top: 100px;
  width: 300px;
  height: 300px;
}

  .ptgame{
    height: 100%;
    position: relative;
  }

  .ptgame>div{
    position: absolute;
    width: 100px;
    height: 100px;
    /* background-image: url("./bg1.jpg"); */
    background-repeat: no-repeat;
    padding: 1px;
    box-sizing: border-box;
    background-clip: content-box;
  transition: all 0.5s;
  }

  .ptgame>.a1{
    left: 0;
    top: 0;
    background-position: 0px 0px;
  }
  .ptgame>.a2{
    left: 100px;
    top: 0;
    background-position: -100px 0px;
  }
  .ptgame>.a3{
    left: 200px;
    top: 0;
    background-position: -200px 0px;
  }

  .ptgame>.a4{
    left: 0;
    top: 100px;
    background-position: 0 -100px;
  }
  .ptgame>.a5{
    left: 100px;
    top: 100px;
  opacity: 0;
    background-position: -100px -100px;
  }
  .ptgame>.a6{
    left: 200px;
    top: 100px;
    background-position: -200px -100px;
    /* background-image: none; */
  }

  .ptgame>.a7{
    left: 0;
    top: 200px;
    background-position: 0 -200px;
  }
  .ptgame>.a8{
    left: 100px;
    top: 200px;
    background-position: -100px -200px;
  }
  .ptgame>.a9{
    left: 200px;
    top: 200px;
    background-position: -200px -200px;
  }
</style>