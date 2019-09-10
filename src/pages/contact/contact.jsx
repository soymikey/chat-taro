import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './contact.scss'

export default class Contact extends Component {
  config = {
    navigationBarTitleText: 'contact'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='contact'>
        <Text>contact</Text>
      </View>
    )
  }
}
