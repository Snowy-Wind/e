<!-- homeHeader -->
<template>
  <div class="homeHeader">
    <!-- 输入框 -->
    <!-- <el-input placeholder="请输入内容" v-model="input3" class="input-with-select header hidden-md-and-down">
      <el-select v-model="select" slot="prepend" :value="1">
        <el-option label="餐厅名" value="1"></el-option>
        <el-option label="订单号" value="2"></el-option>
        <el-option label="用户电话" value="3"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input> -->

    <!-- 小尺寸时的抽屉 -->
    <el-button
      icon="el-icon-s-unfold"
      class="hidden-lg-and-up unfold"
      @click="drawer = true"
    ></el-button>
    <el-drawer :visible.sync="drawer" direction="ltr">
      <slot name="nav"></slot>
    </el-drawer>

    <!-- 头像 -->
    <div @click="show_userinfo">
      <el-avatar
        :src="$store.state.user_avatar"
        :size="30"
        class="item"
      ></el-avatar>
    </div>

    <el-dialog title="个人信息" :visible.sync="updateinfo" width="40%">
      <el-upload
        class="avatar-uploader"
        action="upload-img/"
        :show-file-list="false"
        :on-success="change_ava"
      >
        <img v-if="userinfo.ava" :src="userinfo.ava" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

      <el-row>
        <el-col :span="6" class="col-r"><span>真实姓名：</span></el-col>
        <el-col :span="18" class="col-l"
          ><el-input v-model="userinfo.truename"></el-input
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="col-r"><span>住址：</span></el-col>
        <el-col :span="18" class="col-l"
          ><el-input v-model="userinfo.address"></el-input
        ></el-col>
      </el-row>

      <el-row>
        <el-col :span="6" class="col-r"><span>性别：</span></el-col>
        <el-col :span="18" class="col-l">
          <template>
            <el-radio v-model="userinfo.sex" label="1">男</el-radio>
            <el-radio v-model="userinfo.sex" label="2">女</el-radio>
          </template>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6" class="col-r"><span>生日：</span></el-col>
        <el-col :span="18" class="col-l">
          <el-date-picker
            v-model="userinfo.birthday"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="updateinfo = false">取 消</el-button>
        <el-button type="primary" @click="change_userinfo">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 消息 -->
    <el-popover placement="bottom-start" width="250" trigger="click">
      <div style="height:300px;overflow:auto;">
        <el-scrollbar class="page-component__scroll" style="height:300px;">
          <div
            v-for="(item, index) in $store.state.new_mes"
            :key="index"
            class="new_message"
          >
            <el-avatar
              :src="item.ava"
              :size="30"
              style="margin-right:5px;"
            ></el-avatar>
            <span class="hideP">{{ item["text"] }}</span>
            <el-tag v-for="(tag, index) in item.tags" :key="index" size="mini">
              {{ tag }}
            </el-tag>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              class="friend_check"
              v-if="item.tags"
              @click="delete_new_mes(index)"
            ></el-button>
            <el-button
              type="success"
              icon="el-icon-check"
              circle
              class="friend_check"
              v-if="item.tags"
              @click="s_add_friend(item.user_id, index)"
            ></el-button>
          </div>
        </el-scrollbar>
      </div>
      <el-badge
        :value="$store.state.new_mes.length"
        class="item"
        slot="reference"
        :hidden="$store.state.new_mes.length <= 0"
      >
        <el-button icon="el-icon-s-comment" circle></el-button>
      </el-badge>
    </el-popover>

    <!-- 通知
    
    <el-popover placement="bottom-start" width="250" trigger="click">
      <div style="height:100px;overflow:auto;">
        <el-scrollbar class="page-component__scroll" style="height:300px;">
          <p v-for="(item, index) in maseageList" :key="index" class="hideP">
            {{item['name'] + '+' + item['maseage']}}
          </p>
        </el-scrollbar>
        <el-button @click="bg1(ho)">换颜色</el-button>
      </div>
      <el-badge class="item" slot="reference">
        <el-button type="primary" icon="el-icon-message-solid" circle></el-button>
      </el-badge>
    </el-popover> -->
    <slot name="pf"></slot>
  </div>
</template>

<script>
import { send_data } from "../../network/vuex_axios.js";
import { socketSend } from "../../webSocket/websocket.js";

export default {
  name: "Header",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    return {
      drawer: false,
      select: "1",
      updateinfo: false,
      userinfo: {
        user_id: this.$store.state.user_id,
        truename: "",
        address: "",
        sex: 1,
        birthday: "",
        ava: "",
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    s_add_friend(user_id, index) {
      socketSend("s_add_friend", this.$store.state.user_id, user_id, "true");
      this.$store.commit("delete_new_mes", index);
      setTimeout(() => {
        this.$store.dispatch("getFriendList");
      }, 1000);
    },
    delete_new_mes(index) {
      this.$store.commit("delete_new_mes", index);
    },
    show_userinfo() {
      send_data({
        url: "get_userinfo/",
        data: {
          user_id: this.$store.state.user_id,
        },
      }).then((res) => {
        this.userinfo.ava = this.$store.state.user_avatar;
        this.userinfo.truename = res.data.data.truename;
        this.userinfo.address = res.data.data.address;
        this.userinfo.sex = res.data.data.sex;
        this.userinfo.birthday = res.data.data.birthday;
      });
      this.updateinfo = true;
    },
    change_ava(res) {
      this.userinfo.ava = res.data;
    },
    change_userinfo() {
      send_data({
        url: "change_userinfo/",
        data: this.userinfo,
      }).then((res) => {
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.updateinfo = false;
        this.$store.commit("change_ava", this.userinfo.ava);
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style>
.homeHeader {
  position: relative;
  text-align: initial;
  height: 100%;
  vertical-align: middle;
}

.input-with-select {
  position: absolute;
  font-size: 16px !important;
  margin-top: 27px;
  width: 55% !important;
}
.el-input-group__prepend .el-select {
  margin: -1px -20px !important;
  width: 110px;
  border-radius: 20px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
  border-radius: 20px 0 0 20px;
}

.input-with-select .el-input__inner {
  transition: initial;
}

.input-with-select .el-input__inner:focus,
.el-input__inner:active {
  border: 0px;
  transition: initial;
}

.input-with-select .el-input-group__append {
  border-radius: 0 20px 20px 0;
  font-size: 16px;
}

.input-with-select .el-input-group__append .el-button {
  margin: -1px -20px !important;
}

.el-button .unfold {
  background: transparent;
  padding: 0;
  border: 0;
  font-size: 30px;
  color: #409eff;
  margin-top: 27px;
}
.el-button.el-button.unfold:focus {
  background: transparent;
}
.homeHeader .el-drawer:focus {
  outline: initial;
}

.hideP {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  position: absolute;
}

.homeHeader .item {
  float: right;
  margin-top: 27px;
  margin-right: 10px;
}

.homeHeader .item .el-button {
  padding: 9px !important;
  font-size: 11px !important;
}

.el-scrollbar__wrap {
  overflow-x: hidden !important;
}
.new_message:hover {
  background: rgb(233, 233, 235);
}

.friend_check {
  float: right;
  padding: 4px !important;
  margin-right: 5px;
}

.avatar-uploader {
  text-align: center;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.homeHeader .el-tag {
  margin: 5px;
}
.homeHeader .el-row {
  margin-top: 10px;
}
.homeHeader .col-r {
  line-height: 40px;
  text-align: right;
}
.homeHeader .col-l {
  line-height: 40px;
  text-align: left;
}
</style>
