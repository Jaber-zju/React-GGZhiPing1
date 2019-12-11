/*
注册laoban--> /laobaninfo
注册大神--> /dasheninfo
登陆laoban --> /laobaninfo 或者/laoban
登陆大神--> /dasheninfo 或者/dashen
*/
export function getRedirectTo(type, header) {
  let path = ''
// 根据type 得到path
  path += type==='laoban' ? '/laoban' : '/dashen'
// 如果没有头像添加info
  if(!header) {
    path = path + 'info'
  }
  return path
}