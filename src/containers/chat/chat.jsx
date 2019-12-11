/*
对话聊天的路由组件
*/
import React, {Component} from 'react'
import {connect} from 'react-redux'

import {NavBar, List, InputItem,Icon,Grid} from 'antd-mobile'


import {sendMsg,readMsg} from '../../redux/actions'

const Item = List.Item
const Brief = List.Brief

class Chat extends Component {

  state = {
    content:'',
    isShow:false
  }

  // 在第一次render()之前回调
  componentWillMount () {
    // 初始化表情列表数据
    const emojis = ['😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀'
      ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
      ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
      ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣']
    this.emojis = emojis.map(emoji => ({text: emoji}))
  }

  componentDidMount() {
    // 初始显示列表
    window.scrollTo(0, document.body.scrollHeight)

    const from = this.props.match.params.userid
    const to = this.props.user._id
    this.props.readMsg(from,to)

  }

  componentDidUpdate () {
    // 更新显示列表
    window.scrollTo(0, document.body.scrollHeight)
  }

  componentWillUnmount () { // 在退出之前
    // 发请求更新消息的未读状态
    const from = this.props.match.params.userid
    const to = this.props.user._id
    this.props.readMsg(from, to)
  }

  submit = () => {
    const content = this.state.content.trim()
    const to = this.props.match.params.userid
    const from = this.props.user._id
    if (content){
      this.props.sendMsg({from,to,content})
    }
    this.setState({
      content:'',
      isShow:false
    })
  }

  keyupSubmit = (event) => {
    if (event.keyCode === 13){
      const content = this.state.content.trim()
      const to = this.props.match.params.userid
      const from = this.props.user._id
      if (content){
        this.props.sendMsg({from,to,content})
      }
      this.setState({
        content:'',
        isShow:false
      })
    }
  }

  toggleShow = () => {
    const isShow = !this.state.isShow
    this.setState({isShow})
    if(isShow) {
      // 异步手动派发resize事件,解决表情列表显示的bug
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 0)
    }
  }

  render() {
    const {user} = this.props
    const {chatMsgs, users} = this.props.chat
    const targetId = this.props.match.params.userid
    if(!users[targetId]) {
      return null
    }
    const meId = user._id
    const chatId = [targetId, meId].sort().join('_')
    const msgs = chatMsgs.filter(msg => msg.chat_id===chatId)
    const targetIcon = users[targetId] ?
        require(`../../assets/images/${users[targetId].header}.png`) : null
    const meIcon = users[meId] ?
        require(`../../assets/images/${users[meId].header}.png`) : null


    return (
        <div id='chat-page'>
          <NavBar
              className='stick-top myThemeColor'
              icon={<Icon type='left'/>}
              onLeftClick={() => this.props.history.goBack()}
          >
            {users[targetId].username}
          </NavBar>
          <List style={{marginBottom:50, marginTop:45}}>
            {
              msgs.map(msg => {
                  if(msg.from===targetId) {
                    return (
                        <Item
                            key={msg._id}
                            thumb={targetIcon}
                            multipleLine
                            wrap
                        >
                          <span className='messageItem message1'>
                            &nbsp;&nbsp;&nbsp;{msg.content}&nbsp;&nbsp;&nbsp;
                          </span>
                        </Item>
                    )
                  } else {
                    return (
                        <Item
                            key={msg._id}
                            className='chat-me'
                            extra={<img src={meIcon}/>}
                            multipleLine
                            wrap
                        >
                          <span className='messageItem message2'>
                            &nbsp;&nbsp;&nbsp;{msg.content}&nbsp;&nbsp;&nbsp;
                          </span>

                        </Item>
                    )
                  }
                })
            }


          </List>
          <div className='am-tab-bar'>
            <InputItem
                placeholder="请输入"
                value={this.state.content}
                onChange={val => this.setState({content: val})}
                onFocus={() => this.setState({isShow:false})}
                onKeyUp={this.keyupSubmit}
                extra={
                  <span>
                    <span onClick={this.toggleShow} style={{marginRight:10}}>😊</span>
                    <span onClick={this.submit}>发送</span>
                  </span>
                }
            />

            {this.state.isShow ? (
                <Grid
                    data={this.emojis}
                    columnNum={8}
                    carouselMaxRow={4}
                    isCarousel={true}
                    onClick={(item) => {
                      this.setState({content: this.state.content + item.text})
                    }}
                />
            ) : null}

          </div>
        </div>
    )
  }
}

export default connect(
    state => ({user:state.user, chat:state.chat}),
    {sendMsg,readMsg}
)(Chat)