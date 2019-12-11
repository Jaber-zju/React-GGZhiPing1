import React,{Component} from 'react'
import {List, InputItem, Button, WhiteSpace, WingBlank, NavBar} from "antd-mobile";

import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from "../../redux/actions";

import Logo from '../../components/logo/logo'

class Login extends Component {

  state = {
    username:'',
    password:'',
    //password2:'',
    //type:'dashen'//用户类型名称
  }

  login = () => {
    //console.log(this.state)
    this.props.login(this.state)
  }

  keyUpLogin = (event) => {
    if (event.keyCode === 13) {
      this.props.login(this.state)
    }
  }

  toRegister = () => {
    this.props.history.replace('/register')
  }

  //处理输入数据的改变：更新对应的改变
  handleChange = (name,val) => {
    this.setState({
      [name]:val    //[]括起来表示这个是个变量，而不是字符串
    })
  }

  render(){
    const {msg,redirectTo} = this.props.user
    if (redirectTo){
      return <Redirect to={redirectTo}/>
    }

    return (
        <div>
          <NavBar className='myThemeColor'>硅 谷 直 聘</NavBar>
          <Logo/>
          <WingBlank>
            <div>
              <List>
                {msg?<p className='error-msg'>{msg}</p>:null}
                <InputItem
                    placeholder="请输入你的名字"
                    onChange={val => {this.handleChange('username',val)}}
                    onKeyUp={this.keyUpSave}
                >
                  用户名：
                </InputItem>
                <WhiteSpace />

                <InputItem
                    type="password"
                    placeholder="请输入密码"
                    onChange={val => {this.handleChange('password',val)}}
                    onKeyUp={this.keyUpLogin}
                >
                  密&nbsp;&nbsp;&nbsp;码：
                </InputItem>
                <WhiteSpace/>

                <Button type="primary" onClick={this.login} style={{textDecoration:'none'}} className='myThemeColor'>登录</Button>
                <Button type="default" onClick={this.toRegister} style={{textDecoration:'none'}}>还没有账户</Button>
              </List>
            </div>
          </WingBlank>

        </div>
    )
  }
}

export default connect(
    state => ({user:state.user}),
    {login}
)(Login)

