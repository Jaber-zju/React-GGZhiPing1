import ajax from './ajax'

//注册接口请求封装
export const reqRegister = (user) => ajax('/register',user,'POST')

//登录接口请求封装
export const reqLogin = ({username,password,type}) => ajax('/login',{username,password,type},'POST')

//更新用户请求接口封装
export const reqUpdateUser = (user) => ajax('/update',user,'POST')

//获取用户信息请求接口封装
export const reqUser = () => ajax('/user')

// 请求获取用户列表
export const reqUserList = (type) => ajax('/userlist', {type})

// 请求获取当前用户的所有聊天记录
export const reqChatMsgList = () => ajax('/msglist')

// 标识查看了指定用户发送的聊天信息
export const reqReadChatMsg = (from) => ajax('/readmsg', {from}, 'POST')