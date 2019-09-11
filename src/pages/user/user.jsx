import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtList, AtListItem, } from "taro-ui"

import './user.scss'
import avartar1 from '../../assets/avartar.png'

import pay from '../../assets/userpng/pay.png'
import collection from '../../assets/userpng/collection.png'
import album from '../../assets/userpng/album.png'
import card_bag from '../../assets/userpng/card_bag.png'
import emoji from '../../assets/userpng/emoji.png'
import setting from '../../assets/userpng/setting.png'

export default class User extends Component {
  config = {
    navigationBarTitleText: ''
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  goToUserSetting(){
    Taro.navigateTo({url:'/pages/user/userSetting/userSetting'})
  }
  goToUserDetails(){
    Taro.navigateTo({url:'/pages/user/userDetails/userDetails'})
  }

  render() {
    return (
      <View className='main-container'>
        <View className='first-List-Item'>
          <AtList >
            <AtListItem
              onClick={this.goToUserDetails.bind(this)}
              title='米高'
              note='微信号:soymikey'
              thumb={avartar1}
              arrow='right'
            />
          </AtList>
        </View>
        <View className='padding-top'></View>
        <AtList >
          <AtListItem
            arrow='right'

            title='支付'
            thumb={pay}
          />
        </AtList>
        <View className='padding-top'></View>
        <AtList >
          <AtListItem
            arrow='right'

            title='收藏'
            thumb={collection}
          />
          <AtListItem
            arrow='right'

            title='相册'
            thumb={album}
          />
          <AtListItem
            arrow='right'

            title='卡包'
            thumb={card_bag}
          />
          <AtListItem
            arrow='right'

            title='表情'
            thumb={emoji}
          />
        </AtList>
        <View className='padding-top'></View>

        <AtList >
          <AtListItem
            onClick={this.goToUserSetting.bind(this)}
            arrow='right'

            title='设置'
            thumb={setting}
          />
        </AtList>
      </View>
    )
  }
}
