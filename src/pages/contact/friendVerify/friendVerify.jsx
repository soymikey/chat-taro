import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtListItem, AtList, AtButton } from "taro-ui"

import './friendVerify.scss'
import avartar1 from '../../../assets/avartar.png'

export default class FriendVerify extends Component {
  config = {
    navigationBarTitleText: '',
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
  agree(){

  }
  render () {
    return (
      <View className='main-container'>
        <View className='main-container'>
        <AtList>

          <AtListItem
            title='米高'
            note='微信号:soymikey'
            thumb={avartar1}
          />
          <AtListItem
            note='个性签名个性签名个性签名个性签名个性签名个性签名个性签名'
            title='个性签名'
          />

          <AtListItem
            note='来源来源来源来源来源来源'
            title='来源'
          />

        </AtList>
        <AtButton type='primary' onClick={this.agree.bind(this)}>通过验证</AtButton>

      </View>
      </View>
    )
  }
}
