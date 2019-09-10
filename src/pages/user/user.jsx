import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './user.scss'

export default class User extends Component {
  config = {
    navigationBarTitleText: 'user'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='user'>
        <Text>user</Text>
      </View>
    )
  }
}
