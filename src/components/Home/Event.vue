<!-- 事件 -->
<template>
  <div class="event">
    <el-row :gutter="20">
      <el-col :span="18">
        <el-card>
          <el-calendar>
            <template #dateCell="data">
              <p @click="getEvent(data.data.day)" class="data">
                {{ data.data.day.split("-").slice(2)[0] }}
              </p>
            </template>
          </el-calendar>
        </el-card>
      </el-col>

      <el-col :span="6" class="eventList">
        <el-card>
          <el-scrollbar class="page-component__scroll">
            <h2 style="text-align:center;">
              {{ editEvent["selectTime"] + "日" }}
            </h2>
            <el-row :gutter="10" class="event-input">
              <el-col :span="20">
                <el-input
                  placeholder="请输入内容"
                  v-model="editEvent.event"
                  maxlength="15"
                ></el-input>
              </el-col>
              <el-col :span="4">
                <el-button @click="addEvent(editEvent.selectTime1)"
                  >保存</el-button
                >
              </el-col>
            </el-row>
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                class="pHidden"
              >
                {{ activity }}
              </el-timeline-item>
            </el-timeline>
          </el-scrollbar>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { send_data } from "../../network/vuex_axios";
export default {
  name: "",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    return {
      editEvent: {
        selectTime: "",
        selectTime1: "",
        event: "",
      },
      dialogVisible: false,
      activities: [],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getEvent(date) {
      this.$store.commit("setAppLoading");
      send_data({
        url: "getEvents/",
        data: {
          user_id: this.$store.state.user_id,
          date,
        },
      }).then((res) => {
        console.log(res.data.events);
        this.activities = res.data.events;
        console.log(res.data.events);
      });
      this.editEvent.selectTime1 = date;
      this.editEvent["selectTime"] = date.split("-").slice(2)[0];
      this.$store.commit("setAppLoading");
    },
    addEvent(data) {
      send_data({
        url: "addEvent/",
        data: {
          user_id: this.$store.state.user_id,
          data,
          event: this.editEvent.event,
        },
      }).then((res) => {
        this.activities.push(this.editEvent.event);
        this.editEvent.event = "";
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.activities = this.$store.state.user_today_event;
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    const now = new Date();
    this.editEvent["selectTime"] = now.getDate();
  },
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
.event {
  text-align: initial;
}

.event .el-row {
  margin: 0 20px !important;
}

.event .eventList .el-card {
  height: 611px;
}

.event .eventList .el-card__body {
  height: 611px;
  padding: 0;
}

.event .page-component__scroll {
  height: 611px;
}

.event .el-scrollbar__wrap {
  overflow-x: hidden;
}

/* .el-calendar-table .el-calendar-day {
    height: initial;
  } */

.event .data {
  user-select: none;
  width: 100%;
  height: 60%;
}

.event .el-calendar-table .el-calendar-day {
  height: 70px;
}

.event .event-input {
  margin-bottom: 15px;
  width: 70%;
}

.event .el-dialog {
  box-shadow: initial;
}

.event .el-timeline {
  margin-top: 10px;
}
</style>
