<!-- 验证码 -->
<template>
  <transition name="el-zoom-in-top">
    <div v-show="show">
        <div id="slideBar">
        </div>
    </div>
  </transition>
</template>

<script>

  export default {
  name: 'yzm',
//import引入的组件需要注入到对象中才能使用
  components: {},
  data() {return {
      show : true,
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
  const SliderBar = function (targetDom, options) {
        // 判断是用函数创建的还是用new创建的。这样我们就可以通过MaskShare("dom") 或 new MaskShare("dom")来使用这个插件了  
        if (!(this instanceof SliderBar)) return new SliderBar(targetDom, options);
        // 参数
        this.options = this.extend({
            dataList: []
        }, options);
        // 获取dom
        this.targetDom = document.getElementById(targetDom);
        var dataList = this.options.dataList;
        if (dataList.length > 0) {
            var html = "<div class='slide-box'><div class='slide-img-block'>" +
                "<div class='slide-loading'></div><div class='slide-img-border'>" +
                "<div class='scroll-background slide-top'></div><div class='slide-img-div'>" +
                "<div class='slide-img-nopadding'><img class='slide-img' id='slideImg' src='' />" +
                "<div class='slide-block' id='slideBlock'></div><div class='slide-box-shadow' id='cutBlock'></div></div>" +
                "<div class='scroll-background  slide-img-hint-info' id='slideHintInfo'>" +
                "<div class='slide-img-hint'><div class='scroll-background slide-icon' id='slideIcon'></div>" +
                "<div class='slide-text'><span class='slide-text-type' id='slideType'></span>" +
                "<span class='slide-text-content' id='slideContent'></span></div></div></div></div>" +
                "<div class='scroll-background slide-bottom'>" +
                "<div class='scroll-background slide-bottom-refresh' id='refreshBtn' title='更换图片'></div>" +
                "<div class='slide-bottom-no-logo'></div></div></div></div>" +
                "<div class='scroll-background scroll-bar'>" +
                "<div class='scroll-background slide-btn' id='slideBtn'></div>" +
                "<div class='slide-title' id='slideHint'> <-按住滑块，拖动完成上面拼图</div></div></div>";
            this.targetDom.innerHTML = html;
            this.slideBtn = document.getElementById("slideBtn");                 // 拖拽按钮
            this.refreshBtn = document.getElementById("refreshBtn");             // 换图按钮
            this.slideHint = document.getElementById("slideHint");               // 提示名称
            this.slideImg = document.getElementById("slideImg");                 // 图片
            this.cutBlock = document.getElementById("cutBlock");                 // 裁剪区域
            this.slideBlock = document.getElementById("slideBlock");             // 裁剪的图片
            this.slideIcon = document.getElementById("slideIcon");               // 正确、失败的图标
            this.slideType = document.getElementById("slideType");               // 正确、失败
            this.slideContent = document.getElementById("slideContent");         // 正确、失败的正文
            this.slideHintInfo = document.getElementById("slideHintInfo");       // 弹出
            this.resultX = 0;
            this.startX = 0;
            this.timer = 0;
            this.startTamp = 0;
            this.endTamp = 0;
            this.x = 0;
            this.imgWidth = 0;
            this.imgHeight = 0;
            this.imgList = [];
            this.isSuccess = true;
            for (var i = 1; i < 6; i++) {
                this.imgList.push(i + ".png");
            }
        }
        this.init();
    }
  SliderBar.prototype = {
      init: function () {
          this.event();
      },
      extend: function (obj, obj2) {
          for (var k in obj2) {
              obj[k] = obj2[k];
          }
          return obj;
      },
      event: function () {
          var _this = this;
          _this.reToNewImg();
          _this.slideBtn.onmousedown = function(event){
              _this.mousedown(_this, event);
          } 
          _this.refreshBtn.onclick = function(){
              _this.refreshBtnClick(_this);
          }
      },
      refreshBtnClick: function(_this){
          _this.isSuccess = true;
          _this.slideBlock.style.cssText = "";
          _this.cutBlock.style.cssText = "";
          _this.reToNewImg();
      },
      reToNewImg: function () {
          var _this = this;
          var index = Math.round(Math.random() * 3);         // 该方法有等于0 的情况
          var imgSrc = "static/images/yzm/" + _this.imgList[index] + "";
          _this.slideImg.setAttribute("src", imgSrc);
          _this.slideBlock.style.backgroundImage = "url("+ imgSrc +")";
          _this.slideImg.onload = function (e) {
              e.stopPropagation();
              _this.imgWidth = _this.slideImg.offsetWidth;                   // 图片宽
              _this.imgHeight = _this.slideImg.offsetHeight;                 // 图片高
          }
      },
      cutImg: function () {
          var _this = this;
          _this.cutBlock.style.display = "block";
          var cutWidth = _this.cutBlock.offsetWidth;                // 裁剪区域宽
          var cutHeight = _this.cutBlock.offsetHeight;              // 裁剪区域高
          // left 
          _this.resultX = Math.floor(Math.random() * (_this.imgWidth - cutWidth * 2 - 4) + cutWidth);
          // top
          var cutTop = Math.floor(Math.random() * (_this.imgHeight - cutHeight * 2) + cutHeight);
          // 设置样式
          _this.cutBlock.style.cssText = "top:" + cutTop + "px;" + "left:" + _this.resultX + "px; display: block;";
          _this.slideBlock.style.top = cutTop + "px";
          _this.slideBlock.style.backgroundPosition = "-" + _this.resultX + "px -" + cutTop + "px";
          _this.slideBlock.style.opacity = "1";
      },
      mousedown: function (_this, e) {
          e.preventDefault();
          _this.startX = e.clientX;
          _this.startTamp = (new Date()).valueOf();
          var target = e.target;
          target.style.backgroundPosition = "0 -216px";
          _this.slideHint.style.opacity = "0";
          if(_this.isSuccess){
              _this.cutImg();
          }
          document.addEventListener('mousemove', mousemove);
          document.addEventListener('mouseup', mouseup);
      
          // 拖拽
          function mousemove(event) {
              _this.x = event.clientX - _this.startX;
              if (_this.x < 0) {
                  _this.slideBtn.style.left = "0px";
                  _this.slideBlock.style.left = "2px";
              } else if (_this.x >= 0 && _this.x <= 217) {
                  _this.slideBtn.style.left = _this.x + "px";
                  _this.slideBlock.style.left = _this.x + "px";
              } else {
                  _this.slideBtn.style.left = "217px";
                  _this.slideBlock.style.left = "217px";
              }
              _this.slideBtn.style.transition = "none";
              _this.slideBlock.style.transition = "none";
          };
          // 鼠标放开
          function mouseup() {
              document.removeEventListener('mousemove', mousemove);
              document.removeEventListener('mouseup', mouseup);
              var left = _this.slideBlock.style.left;
              left = parseInt(left.substring(0, left.length-2));
              if(_this.resultX > (left - 5) && _this.resultX < (left + 5)){
                  _this.isSuccess = true;
                  _this.endTamp = (new Date()).valueOf();
                  _this.timer = ((_this.endTamp - _this.startTamp) / 1000).toFixed(1);
                  // 裁剪图片(拼图的一块)
                  _this.slideBlock.style.opacity = "0";
                  _this.slideBlock.style.transition = "opacity 0.6s";
                  // 裁剪的区域(黑黑的那一块)
                  _this.cutBlock.style.opacity = "0";
                  _this.cutBlock.style.transition = "opacity 0.6s";
                  // 正确弹出的图标
                  _this.slideIcon.style.backgroundPosition = "0 -1207px";
                  _this.slideType.className = "slide-text-type greenColor";
                  _this.slideType.innerHTML = "验证通过:";
                  _this.slideContent.innerHTML = "用时" + _this.timer + "s";
                  setTimeout(function(){
                    _this.cutBlock.style.display = "none";
                    _this.slideBlock.style.left = "2px";
                    _this.options.success&&_this.options.success();
                    //   _this.reToNewImg();
                  }, 1000);
              }else{
                  _this.isSuccess = false;
                  // 设置样式
                  // 裁剪图片(拼图的一块)
                  _this.slideBlock.style.left = "2px";
                  _this.slideBlock.style.transition = "left 0.6s";
                  // 错误弹出的图标
                  _this.slideIcon.style.backgroundPosition = "0 -1229px";
                  _this.slideType.className = "slide-text-type redColor";
                  _this.slideType.innerHTML = "验证失败:";
                  _this.slideContent.innerHTML = "拖动滑块将悬浮图像正确拼合";
                  _this.options.fail&&_this.options.fail();
              }
              // 设置样式
              _this.slideHintInfo.style.height = "22px";
              setTimeout(function(){
                  _this.slideHintInfo.style.height = "0px";
              }, 1300);
              _this.slideBtn.style.backgroundPosition = "0 -84px";
              _this.slideBtn.style.left = "0";
              _this.slideBtn.style.transition = "left 0.6s";
              _this.slideHint.style.opacity = "1";
          }
      }
  }
  var dataList = ["0","1"];
  var options = {
    dataList: dataList,
    success:()=>{
        this.show = false
        this.$emit('tpok',true) 
    },
    fail: function(){
        console.log("ccccccccc");  
    }
  };
  SliderBar("slideBar", options);
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
.slide-box{
    display: block;
    position: relative;
}
.scroll-background{
    background-image: url("../../../../public/images/yzm/sprite.3.2.0.png");
    background-repeat: no-repeat;
}
.scroll-bar{
    margin: 0 auto;
    width: 261px;
    background-position: 0 0;
    height: 28px;
    position: relative;
}
.slide-btn{
    height: 44px;
    width: 44px;
    background-position: 0 -84px;
    cursor: pointer;
    display: block;
    position: absolute;
    left: 0;
    top: -9px;
    -moz-box-shadow: none;
    box-shadow: none;
    border-radius: 13px;
    z-index: 399;
}
.slide-title{
    cursor: default;
    position: absolute;
    left: 35px;
    font-size: 12px !important;
    color: #486c80;
    opacity: 1;
    filter: alpha(opacity=100);
    height: 28px;
    line-height: 28px !important;
    text-align: center;
    width: 220px;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
    user-select: none;
}
.slide-img-div{
    margin: 0 auto;
    width: 260px;
    height: 116px;
    padding: 0 15px 2px 13px;
    position: relative;
    background-color: #f2ece1;
    border-left: 1px solid #e4ddd1;
    border-right: 1px solid #e4ddd1;
}
.slide-img-div img{
    width: 100%;
    height: 100%;
}
.slide-top{
    margin: 0 auto;
    height: 14px;
    width: 290px;
    background-position: 0 -1341px;
    position: relative;
}
.slide-bottom{
    margin: 0 auto;
    height: 28px;
    width: 290px;
    background-position: 0 -56px;
    line-height: 14px !important;
    position: relative;
    text-align: left;
    overflow: visible;
}
.slide-bottom-no-logo{
    margin-right: 15px;
    width: 65px;
    height: 16px;
    position: absolute;
    right: 0;
    top: 6px;
    background-color: #f2ece1 !important;
    cursor: default;
}
.slide-bottom-refresh{
    overflow: visible;
    display: block;
    zoom: 1;
    display: inline-block;
    cursor: pointer;
    margin-right: 16px !important;
    background-color: #f1e9de;
    margin: 6px 0 0 18px !important;
    height: 14px;
    width: 14px;
    background-position: 0 -1179px;
}

.slide-box-shadow{
    display: none;
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5) inset;
}
.slide-block{
    opacity: 0;
    position: absolute;
    top: 0;
    left: 2px;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    background-repeat: no-repeat;
    background-attachment: scroll;
    border: 1px solid rgba(255, 255, 0, 0.8);
    background-size: 260px 116px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4), 0 0 10px 0 rgba(90, 90, 90, 0.4);
    box-sizing: border-box;
    z-index: 10;
}
.slide-img-nopadding{
    position: relative;
    width: 100%;
    height: 100%;    
}
.slide-icon{
    float: left;
    height: 22px;
    width: 26px;
}
.slide-img-hint{
    -webkit-font-smoothing: subpixel-antialiased;
    font-size: 12px !important;
    line-height: 22px !important;
    margin: 0 auto;
    position: relative;
}
.slide-text{
    text-align: left !important;
    color: #4b3f33;
}
.slide-img-hint-info{
    height: 22px;
    width: 260px;
    background-position: 0 -674px;
    height: 0;
    overflow: hidden;
    position: absolute;
    bottom: 1px;
    transition: height 0.3s;
    z-index: 11;
}
.redColor{
    color: red;
}
.greenColor{
    color: green;
}
.slide-img-border{
    margin-bottom: 3px;
}
</style>