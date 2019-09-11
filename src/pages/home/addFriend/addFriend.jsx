import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './addFriend.scss'

export default class AddFriend extends Component {
   config = {
    navigationBarTitleText: '添加朋友',
  }

  componentWillMount () {}

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  render () {
    return (
      <View className='main-container'>addFriend</View>
    )
  }
}
