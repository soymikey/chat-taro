import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './example.scss'

export default class App extends Component {
  config = {
    navigationBarTitleText: '微信',
  }
  constructor() {
    super()
    this.state = {

    }
  }

  componentWillMount () {}

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  render () {
    return (
      <View className='main-container'>微信</View>
    )
  }
}
