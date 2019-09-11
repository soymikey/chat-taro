import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtListItem, AtList, AtButton } from "taro-ui"

import './friendDetails.scss'
import avartar1 from '../../../assets/avartar.png'

export default class FriendDetails extends Component {
  config = {
    navigationBarTitleText: '好友详情',
  }
  constructor() {
    super()
    this.state = {

    }
  }

  componentWillMount() { }

  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }
  addToContact(){

    Taro.navigateTo({ url: '/pages/home/friendRequest/friendRequest' })
    setTimeout(() => {
      Taro.navigateBack({ delta: 1 })
    }, 2000);
  }
  render() {
    return (
      <View className='main-container'>
        <AtList>

          <AtListItem
            title='米高'
            note='微信号:soymikey'
            thumb={avartar1}
          />
        </AtList>
        <AtButton type='primary' onClick={this.addToContact.bind(this)}>添加到通讯录</AtButton>

      </View>
    )
  }
}
