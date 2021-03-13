<template>
  <div class="sign">
    <div class='sky' ref="sky">
      <canvas ref="canvas"></canvas>
      <div class="filter"></div>
      <div class="bg-img">
        <el-card class="box-card">
          <div slot="header" class="header">
            <router-link to="/"><el-link :underline="false">登录</el-link></router-link>
            <router-link :to="{name: 'SignOn'}" style="float: right; padding: 3px 0" ><el-link :underline="false">注册</el-link></router-link>
          </div>
            <router-view></router-view>
            <!-- <router-view name="Reset"></router-view> -->
        </el-card>
      </div>
      
    </div>
  </div>
</template>

<script>

export default {
  name: 'Sign',
  mounted() {
    let _this = this;
    function Star(id,x,y) {
      this.id = id
      this.x = x
      this.y = y
      this.r = Math.floor(Math.random() * 2) + 1
      var alpha = (Math.floor(Math.random() * 10) + 1)/ 10 / 2
      this.color = "rgba(255,255,255," + alpha + ")"
    }
    Star.prototype.draw = function() {
      ctx.fillStyle = this.color
      ctx.shadowBlur = this.r * 2
      ctx.beginPath()
      ctx.arc(this.x,this.y,this.r,0,2* Math.PI,false)
      ctx.closePath();
      ctx.fill();
    }
    Star.prototype.move = function() {
      this.y -= 1;
      if (this.y <= -10) this.y = _Height + 10;
      this.draw();
    }
    Star.prototype.die = function() {
      stars[this.id] = null;
      delete stars[this.id];
    }

    var canvas = this.$refs.canvas,
        ctx = canvas.getContext("2d"),
        _Width = window.innerWidth,
        _Height = window.innerHeight,
        stars = [],
        initStarsPopulation = 80;
    
    setCanvasSize();
    __init__();
    function setCanvasSize() {
      canvas.setAttribute("width",  _Width)
      canvas.setAttribute("height", _Height)
    }
    function __init__() {
      ctx.strokeStyle = "white"
      ctx.shadowColor = "white"
      for(var i = 0;i < initStarsPopulation; i++) {
        stars[i] = new Star(i,Math.floor(Math.random() * _Width),Math.floor(Math.random() * _Height))
      }
      ctx.shadowBlur = 0;
      animate();
    }
    function animate() {
      ctx.clearRect(0,0,_Width,_Height)
      for(var i in stars) {
        stars[i].move()
      }
      requestAnimationFrame(animate)
    }
  },
}
</script>

<style scoped>
  .box-card {
    margin: 5% auto;
    text-align:center;
    width: 480px;
  }
  .header{
    text-align: justify;
  }
  a{
    text-decoration: none;
  }
  .router-link-active .el-link{
    color: #409EFF;
  }


  .sky{
    background: radial-gradient(65% 105% at bottom center,#f7f7b6 10%,#e96f92 40%,#75517d 65%,#1b2947);
  }
  .bg-img{
    position: fixed;
    width:100%;
    height:100%;
    top:0;
    background-image:url("../../public/images/sign/xkbg.png");
    background-repeat:repeat-x;
    background-position: center bottom;
  }
  .filter{
    position: fixed;
    width: 100%;
    height: 100%;
    top:0;
    background:#f00000;
    mix-blend-mode: overlay;
    animation: colorChange 30s ease-in-out infinite;animation-fill-mode: both;
  }
  @keyframes colorChange {
    0%,
    100% {
    opacity: 0;
    }
    50% {
    opacity: 0.9;
    }
  }
</style>