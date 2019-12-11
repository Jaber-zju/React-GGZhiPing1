import React,{Component} from 'react'
import {Route,Switch,Redirect} from "react-router-dom";
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {NavBar} from "antd-mobile";

import LaobanInfo from '../../containers/laoban-info/laoban-info'
import DashenInfo from '../../containers/dashen-info/dashen-info'

import Laoban from '../../containers/laoban/laoban'
import Dashen from '../../containers/dashen/dashen'
import Message from '../../containers/message/message'
import Personal from '../../containers/personal/personal'
import NotFound from '../../components/notfound/notfound'
import NavFooter from '../../components/nav-footer/nav-footer'
import Chat from '../../containers/chat/chat'


import {getRedirectTo} from "../../utils";
import {getUser} from "../../redux/actions";

class Main extends Component {

  // 给组件对象添加属性,前面加static之后表示是给组件内添加属性
  navList = [ // 包含所有导航组件的相关信息数据
    {
      path: '/laoban', // 路由路径
      component: Laoban,
      title: '大神列表',
      icon: 'dashen',
      text: '大神',
      hide:''
    },
    {
      path: '/dashen', // 路由路径
      component: Dashen,
      title: '老板列表',
      icon: 'laoban',
      text: '老板',
      hide:''
    },
    {
      path: '/message', // 路由路径
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息',
    },
    {
      path: '/personal', // 路由路径
      component: Personal,
      title: '用户中心',
      icon: 'personal',
      text: '个人',
    }
  ]

  componentDidMount() {

    //登录过（cookie中有userID），但没有登录（即redux管理的user没有_id），则要发送请求获取对应的user
    const userid = Cookies.get('userid')  //读取userID
    const {_id} = this.props.user
    if (userid && !_id){
      //发送请求获取对应的user
      this.props.getUser()

    }

  }

  render(){

    // 如果浏览器中没有保存userid 的cookie, 直接跳转到login
    const userid = Cookies.get('userid')  //读取userID
    if (!userid) {
      this.props.history.replace('/login')  //如果没有userid，自动重定向跳转到登录界面
      //return null
    }
    //如果有userid，读取redux中的user状态
    const {user,unReadCount} = this.props
    if (!user._id){
      return null   //如果user中没有_id，暂时返回null
    } else {
      let path = this.props.location.pathname   //如果user中有_id，显示对应的界面
      if(path === '/'){
        path = getRedirectTo(user.type,user.header)   //根据user的type和header来计算出一个重定向的路由路径，并自动重定向
        return <Redirect to={path}/>
      }
    }

    const {navList} = this
    const path = this.props.location.pathname
    const currentNav = navList.find(nav => nav.path === path)

    if (currentNav) {
      //决定哪个路由应该被隐藏
      if (user.type === 'laoban'){
        //隐藏数组的第二个
        navList[1].hide = true
      } else if (user.type === 'dashen') {
        //隐藏数组的第一个
        navList[0].hide = true
      }
    }

    return (
        <div>
          {currentNav ? <NavBar className='stick-top myThemeColor'>{currentNav.title}</NavBar> : null }

          <Switch>
            {
              navList.map(nav => <Route path={nav.path} component={nav.component} key={nav.path}/>)
            }
            <Route path='/dasheninfo' component={DashenInfo}/>
            <Route path='/laobaninfo' component={LaobanInfo}/>
            <Route path='/chat/:userid' component={Chat}/>

            <Route component={NotFound}/>
          </Switch>

          {currentNav ? <NavFooter navList={navList} unReadCount={unReadCount}/> : null }
        </div>
    )
  }
}

export default connect(
    state => ({user:state.user,unReadCount:state.chat.unReadCount}),
    {getUser}
)(Main)


//功能如下：
/*
* 1、实现自动登录：
*   如果cookie中没有userID，则会自动进入登录页面；
*   如果有ID，则会发送请求获取相应的user，读取redux中的state，暂时不做任何显示
*
* 2、如果已经登录，当请求根路径时：根据user的type和header来计算出一个重定向的路由路径，并自动重定向
*
* */


