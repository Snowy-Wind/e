import Vue from 'vue'
import Vuex from 'vuex'
import {send_data} from '../network/vuex_axios'
import {socketConnect} from '../webSocket/websocket'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sign_name: '',
    sign_password: '',

    user_id: '',//用户id
    user_nikename: '',//用户昵称
    user_avatar: '',//用户头像
    user_tag: '',//用户标签
    user_today_event: '',
    friendList: '',//在线好友列表
    sort_friends: '',
    expression: '',
    new_mes: [],



    //基础设置
    clientHeight : '',//屏幕高度
    appLoading: false,//app的加载样式
    wSocket: '',//websocket实例
    f_color: '#000',
  },

  mutations: {
    // setWebSocket(state,webso) {
    //   state.wSocket = webso
    // },
    setScreenHeight(state,height){//获取屏幕高度
      state.clientHeight = height
    },
    setAppLoading(state){//设置加载特效
      state.appLoading = !state.appLoading
    },
    setColor(state,color) {
      state.f_color = color
    },
    //************************上面是系统设置，下面是用户相关信息设置 */
    setSignDate(state,data) {
      state.sign_name = data[0]
      state.sign_password = data[1]
    },

    setFriendLogin(state,data) {//每次好友登录触发
      for (let f of state.sort_friends){
        if (f.userId == data)
          f.status = 1
      }

      state.sort_friends.sort((a,b) => {
        if (a.status === b.status){
          return a.userName - b.userName
        }
        else{
          return b.status - a.status
        }
      })
    },
    setFriendUnlogin(state,data) {//好友下线
      for (let f of state.sort_friends){
        if (f.userId == data)
          f.status = 0
      }
      state.sort_friends.sort((a,b) => {
        if (a.status === b.status){
          return a.userName - b.userName
        }
        else{
          return b.status - a.status
        }
      })
    },
    setUserinfo(state,data) {//设置用户信息
      // console.log(data['userinfo'])
      [state.user_id,state.user_nikename,state.user_avatar,state.user_tag] = data['userinfo']
      // console.log(state.user_id)
      state.user_today_event = data['userEvent']
      console.log(data)
      let news = []
      for (let item of data['news_message']) {
        let result = {}
        result['user_id'] = item[0]
        // result['text'] = data[1] + '请求添加你为好友'
        result['text'] = '请求添加你为好友'
        result['ava'] = item[2]
        result['tags'] = item[3]
        news.push(result)
      }
      state.new_mes = news
    },
    setFriendList(state,list){//设置好友列表
      state.friendList = list
      state.sort_friends = Object.values(list).sort((a,b) => {
        if (a.status === b.status){
          return a.userName - b.userName
        }
        else{
          return b.status - a.status
        }
      })
      console.log(state.sort_friends)
    },
    deleteTag(state,tag){//删除用户标签
      state.user_tag.splice(state.user_tag.indexOf(tag), 1);
    },
    addTag(state,inputValue){//添加用户标签
      state.user_tag.push(inputValue);
    },
    setChatHistory(state,data) {//设置聊天记录
      state.friendList[data[0]].chat_history.push([data[2],data[1]])
      if (data[3] == 'positive'){
        state.expression = 'sunny'
      }
      else if (data[3] == 'negative') {
        state.expression = 'rainy'
      }
      
    },
    setNewMes(state,data) {
      let text = ''
      let ava = ''
      let name = ''
      let result = {}
      for (let f of Object.values(state.friendList)) {
        if (f.userId == data[0]) {
          ava = f.imgUrl
          name = f.userName
        }
      }
      if (data[1]=='art') {
        text = '发布了一篇文章'
      }
      result['ava'] = ava
      result['text'] = name + text
      state.new_mes.push(result)
    },
    delete_new_mes(state,data) {
      state.new_mes.splice(data,1)
    },
    add_friend(state,data){
      console.log(data)
      let result = {}
      result['user_id'] = data[0]
      // result['text'] = data[1] + '请求添加你为好友'
      result['text'] = '请求添加你为好友'
      result['ava'] = data[2]
      result['tags'] = data[3]
      state.new_mes.push(result)
    },
    change_ava(state,ava) {
      state.user_avatar = ava
    },
  },

  actions: {
    getFriendList(context){
      send_data({url: 'getFriendList/', data : {'user_id' : context.state.user_id}})
      .then(res =>{
        context.commit('setFriendList',res.data)
      })
    },
    setWebSocket(context){
      socketConnect(context.state.user_id)
    }
  },
  modules: {
  }
})
