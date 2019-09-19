import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'

import { View, Text } from '@tarojs/components'
import { AtList, AtListItem, } from "taro-ui"
import { imageBase } from '../../api/baseUrl'
import './user.scss'
import { getUserInfo } from '../../newStore/actions/counter'

import pay from '../../assets/userpng/pay.png'
import collection from '../../assets/userpng/collection.png'
import album from '../../assets/userpng/album.png'
import card_bag from '../../assets/userpng/card_bag.png'
import emoji from '../../assets/userpng/emoji.png'
import setting from '../../assets/userpng/setting.png'

@connect(
  state => ({
    user: state.counter.user.data
  }), { getUserInfo }
)

export default class User extends Component {
  config = {
    navigationBarTitleText: ''
  }

  componentWillMount() { }

  componentDidMount() {


  }

  componentWillReceiveProps(nextProps) {

  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  goToUserSetting() {
    Taro.navigateTo({ url: '/pages/user/userSetting/userSetting' })
  }
  goToUserDetails() {
    Taro.navigateTo({ url: '/pages/user/userDetails/userDetails' })
  }

  render() {

    const { user } = this.props
      return(
        <View className='main-container'>
          <View className='first-List-Item'>
            <AtList >
              {user?<AtListItem
                onClick={this.goToUserDetails.bind(this, user)}
                title={user.name}
                note={'微信号:' + user.code}
                thumb={imageBase + user.photo}
                arrow='right'
              />:null}
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
