import store from '../store/index'
import {Message} from 'element-ui'

export function socketConnect(userid) {
  const websocketUrl = 'ws://' + window.location.host + '/ws/' + userid + '/'
  const ws = new WebSocket(websocketUrl)
  ws.onopen = (msg) => {
    //链接服务端
  }
  ws.onmessage = function(msg){
    //接受消息
    const data = JSON.parse(msg.data)
    if (data['msg_type'] == 'friend_login') {//好友登录
      store.commit('setFriendLogin',data['friend_id'])
    }
    else if(data['msg_type'] == 'friend_unlogin') {//好友下线
      store.commit('setFriendUnlogin',data['friend_id'])
    }
    else if(data['msg_type'] == 'chat') {//好友私聊
      const chat = [data['sender_id'],data['content'],1,data['emotional']]
      store.commit('setChatHistory',chat)
    }
    else if(data['msg_type'] == 'send_article') {
      store.commit('setNewMes',[data['sender_id'],'art'])
    }
    else if(data['msg_type'] == 'add_friend') {
      store.commit('add_friend',data['userinfo'])
    }
    else if(data['msg_type'] == 's_add_friend') {
      store.dispatch('getFriendList')
    }
    else if(data.msg_type == 'is_mute') {
      const ti = data.ti
      Message.error('您被禁言至' + ti);
    }
  }
  ws.onclose = (msg) => {
    //结束链接
  }
  ws.onerror = (msg) => {
    //错误信息
    console.log(msg)
  }
  // _this.socketOver = () =>{
  //   ws.close()
  // }
  // this.$store.commit('setWebSocket',ws)
  store.state.wSocket = ws;
}

export function socketSend(type,user_id,user_by_id,content) {
  store.state.wSocket.msgSend = function (type,user_id,user_by_id,content) {
    let wsData = {};
    wsData = {
      type,
      user_id,
      user_by_id,
      content
    }
    store.state.wSocket.send(JSON.stringify(wsData))
  }
  store.state.wSocket.msgSend(type,user_id,user_by_id,content)
}