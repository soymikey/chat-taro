import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './explore.scss'

export default class Explore extends Component {
  config = {
    navigationBarTitleText: 'explore'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='explore'>
        <Text>explore</Text>
      </View>
    )
  }
}
