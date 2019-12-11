/*
包含多个用于生成新的state 的reducer 函数的模块
*/
import {combineReducers} from 'redux'
import {AUTH_SUCCESS,
    ERROR_MSG,
    RECIEVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG,
    MSG_READ,
} from "./action-types";

import {getRedirectTo} from "../utils/index";

const initUser = {
  username:'',
  type:'',
  msg:'',     //用来存储错误信息
  redirectTo: '' // 需要自动跳转的路由path
}

function user(state = initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS:  //  认证成功
        const {type,header} = action.data
      return {...action.data,redirectTo:getRedirectTo(type,header)}  //data是user
    case ERROR_MSG:
      return {...state, msg: action.data} //data是msg
    case RECIEVE_USER:  //data是user
      return action.data
    case RESET_USER:  //data是msg
      return {...initUser,msg:action.data}
    default:
      return state
  }
}

const initUserList = []

function userList(state = initUserList, action) {
  switch (action.type) {
    case RECEIVE_USER_LIST:
      return action.data
    default:
      return state
  }
}


const initChat = {
  users: {}, // 所有用户信息的对象  属性名: userid, 属性值是: {username, header}
  chatMsgs: [], // 当前用户所有相关msg的数组
  unReadCount: 0 // 总的未读数量
}

// 产生聊天状态的reducer
function chat(state=initChat, action) {
  switch (action.type) {
    case RECEIVE_MSG_LIST:  // data: {users, chatMsgs}
      const {users, chatMsgs, userid} = action.data
      return {
        users,
        chatMsgs,
        unReadCount: chatMsgs.reduce((preTotal, msg) => preTotal+(!msg.read&&msg.to===userid?1:0),0)
      }
    case RECEIVE_MSG: // data: chatMsg
      const {chatMsg} = action.data
      return {
        users: state.users,
        chatMsgs: [...state.chatMsgs, chatMsg],
        unReadCount: state.unReadCount + (!chatMsg.read&&chatMsg.to===action.data.userid?1:0)
      }
    case MSG_READ:
      const {from, to, count} = action.data
      state.chatMsgs.forEach(msg => {
        if(msg.from===from && msg.to===to && !msg.read) {
          msg.read = true
        }
      })
      return {
        users: state.users,
        chatMsgs: state.chatMsgs.map(msg => {
          if(msg.from===from && msg.to===to && !msg.read) { // 需要更新
            return {...msg, read: true}
          } else {// 不需要
            return msg
          }
        }),
        unReadCount: state.unReadCount-count
      }
    default:
      return state
  }
}


export default combineReducers({
  user,
  userList,
  chat
})

//向外暴露的结构为：user —— {}，userList —— []