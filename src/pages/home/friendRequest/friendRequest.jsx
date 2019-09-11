import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTextarea, AtButton } from 'taro-ui'
import './friendRequest.scss'

export default class FriendRequest extends Component {
  config = {
    navigationBarTitleText: '好友请求',
  }
  constructor() {
    super()
    this.state = {
      content: ''
    }
  }

  componentWillMount() { }

  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }
  handleExtaAreaChange(value) {
    this.setState({ content: value })
  }
  sendRequest() {

  }
  render() {
    const { content } = this.state
    return (
      <View className='main-container'>
        <AtTextarea
          value={content}
          onChange={this.handleExtaAreaChange.bind(this)}
          maxLength={200}
          placeholder='你的问题是...'
        />
        <AtButton type='primary' onClick={this.sendRequest.bind(this)}>发送</AtButton>

      </View>
    )
  }
}
