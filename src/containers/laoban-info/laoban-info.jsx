import React,{Component} from 'react'
import {connect} from 'react-redux'
import {NavBar,
  Button,
  InputItem,
  List,
  TextareaItem
} from "antd-mobile";
import HeaderSelecter from '../../components/header-selecter/header-selecter'

import {Redirect} from 'react-router-dom'
import {updateUser} from "../../redux/actions";

class LaobanInfo extends Component {

  state = {
    header: '', // 头像名称
    post: '', // 职位
    info: '', // 个人或职位简介
    company: '', // 公司名称
    salary: '' // 工资
  }

  setHeader = (header) => {
    this.setState({header})
  }

  //处理输入数据的改变：更新对应的改变
  handleChange = (name,val) => {
    this.setState({
      [name]:val    //[]括起来表示这个是个变量，而不是字符串
    })
  }

  save = () => {
    this.props.updateUser(this.state)
  }

  keyUpSave = (event) => {
    if (event.keyCode === 13){
      this.props.updateUser(this.state)
    }
  }

  render(){
    const {header,type} = this.props.user
    if (header){
      const path = type==='dashen' ? '/dashen' : '/laoban'
      return <Redirect to={path}/>
    }

    return (
        <div>
          <NavBar className='myThemeColor'>老板信息完善</NavBar>
          <HeaderSelecter setHeader={this.setHeader}/>
            <List>
              <InputItem onChange={val => {this.handleChange('post',val)}} placeholder='请输入招聘职位'>招聘职位：</InputItem>
              <InputItem onChange={val => {this.handleChange('company',val)}} placeholder='请输入公司名称'>公司名称：</InputItem>
              <InputItem onChange={val => {this.handleChange('salary',val)}} placeholder='请输入职位薪资'>职位薪资：</InputItem>
              <TextareaItem
                  onChange={val => {this.handleChange('info',val)}}
                  title='职位要求：'
                  rows={3}
                  placeholder='请输入职位要求'
                  onKeyUp={this.keyUpSave}
              />
            </List>

          <Button type='primary' onClick={this.save} style={{textDecoration:'none'}} className='myThemeColor'>保&nbsp;&nbsp;存</Button>
        </div>
    )
  }
}

export default connect(
    state => ({user:state.user}),
    {updateUser}
)(LaobanInfo)

