import React,{Component} from 'react'
import Logo from "../../components/logo/logo";
import {NavBar,
        Button,
        InputItem,
        List,
        WhiteSpace,
        Radio,
        WingBlank,
} from "antd-mobile";
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {register} from "../../redux/actions";

const ListItem = List.Item

class Register extends Component {

  state = {
    username:'',
    password:'',
    password2:'',
    type:'dashen'//用户类型名称
  }

  registerClick = () => {
    this.props.register(this.state)
  }

  keyUpRegister = (event) => {
    if (event.keyCode === 13) {
      this.props.register(this.state)
    }
  }

  toLogin = () => {
    this.props.history.replace('/login')
  }

  //处理输入数据的改变：更新对应的改变
  handleChange = (name,val) => {
    this.setState({
      [name]:val    //[]括起来表示这个是个变量，而不是字符串
    })
  }

  render() {
    const {type} = this.state
    const {msg,redirectTo} = this.props.user

    if (redirectTo){
      return <Redirect to={redirectTo}/>
    }

    return (
        <div>
          <NavBar className='myThemeColor'>硅 谷 直 聘</NavBar>
          <Logo/>
          <WhiteSpace/>

          <WingBlank>
              <List>
                {msg?<div className='error-msg'>{msg}</div>:null}
                <InputItem placeholder="请输入你的名字" onChange={val => {this.handleChange('username',val)}}>用户名：</InputItem>
                <WhiteSpace/>
                <InputItem type="password" placeholder="请输入密码" onChange={val => {this.handleChange('password',val)}}>密&nbsp;&nbsp;&nbsp;码：</InputItem>
                <WhiteSpace/>
                <InputItem type="password" placeholder="请确认密码" onChange={val => {this.handleChange('password2',val)}} onKeyUp={this.keyUpRegister}>确认密码：</InputItem>

                <ListItem>
                  <span>用户类型：</span>
                  <Radio className="my-radio" checked={type === 'dashen'} onClick={() => {this.handleChange('type','dashen')}}>大神</Radio>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Radio className="my-radio" checked={type === 'laoban'} onClick={() => {this.handleChange('type','laoban')}}>老板</Radio>
                </ListItem>

                <Button type="primary" onClick={this.registerClick} style={{textDecoration:'none'}} className='myThemeColor'>注册</Button>
                <Button type="default" onClick={this.toLogin} style={{textDecoration:'none'}}>已有账户</Button>
              </List>
          </WingBlank>
        </div>
    )
  }
}

export default connect(
    state => ({user:state.user}),
    {register}
)(Register)


