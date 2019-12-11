/*
老板的主路由组件
*/
import React from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/actions'
import UserList from '../../components/user-list/user-list'


class Laoban extends React.Component {
  componentDidMount() {
    this.props.getUserList('dashen')
  }
  render() {
    return <UserList userList={this.props.userList} />
  }
}
export default connect(
    state => ({userList: state.userList}),
    {getUserList}
)(Laoban)
