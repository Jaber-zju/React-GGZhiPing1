/*
用户列表的UI 组件
*/
import React from 'react'
import PropTypes from 'prop-types'
import {Card, WingBlank, WhiteSpace} from 'antd-mobile'
import QueueAnim from 'rc-queue-anim';

import {withRouter} from 'react-router-dom'

const Header = Card.Header
const Body = Card.Body

class UserList extends React.Component {
  static propsTypes = {
    userList: PropTypes.array.isRequired
  }

  render() {
    return (
        <WingBlank style={{marginBottom:50,marginTop:45}} >
          <QueueAnim type='scale'>
            {
              this.props.userList.map(user => (
                  <div key={user._id}>
                    <WhiteSpace/>
                    <Card onClick={() => this.props.history.push(`/chat/${user._id}`)}>
                      <Header
                          thumb={user.header ?
                              require(`../../assets/images/${user.header}.png`) : null}
                          extra={user.username}
                      />
                      <Body>
                        <div>职位: {user.post}</div>
                        {user.company ? <div>公司: {user.company}</div> : null}
                        {user.salary ? <div>月薪: {user.salary}</div> : null}
                        <div>描述: {user.info}</div>
                      </Body>
                    </Card>
                  </div>
              ))
            }
          </QueueAnim>

        </WingBlank>
    )
  }
}
export default withRouter(UserList)