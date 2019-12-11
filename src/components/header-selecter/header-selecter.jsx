import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Grid,List} from "antd-mobile";
import PropTypes from 'prop-types'

class HeaderSelecter extends Component {
  constructor(props) {
    super(props)
    this.headerList = []
    for (let i=0;i < 20;i++){
      this.headerList.push({
        text:'头像'+(i+1),
        icon:require(`../../assets/images/头像${i+1}.png`) //不能使用import
      })
    }
  }

  static propTypes = {
    setHeader:PropTypes.func.isRequired,
  }

  state = {
    icon:null,
  }

  setHeader = (el) => {
    //el是对象，内部包含icon和text
    const {text,icon} = el
    this.setState({icon})
    this.props.setHeader(text)

  }

  render(){
    const {icon} = this.state
    const listHeader = !icon ? '请选择头像':(
        <div>
          已选择头像&nbsp;&nbsp;&nbsp;<img src={icon}/>
        </div>
    )

    return (
        <List renderHeader ={() => listHeader} >
          <Grid data={this.headerList} columnNum={5} onClick={this.setHeader}/>
        </List>
    )
  }
}

export default connect(
    state => ({}),
    {}
)(HeaderSelecter)

