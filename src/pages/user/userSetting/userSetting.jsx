import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtList, AtListItem, } from "taro-ui"

import './userSetting.scss'
import avartar1 from '../../../assets/avartar.png'

export default class UserSetting extends Component {
  config = {
    navigationBarTitleText: '设置',
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

  render() {
    return (
      <View className='main-container'>
        <AtList >
          <AtListItem
            title='账号与安全'
            arrow='right'
          />
        </AtList>
        <View className='padding-top'></View>
        <AtList >
          <AtListItem
            arrow='right'
            title='新消息通知
        '

          />
          <AtListItem
            arrow='right'
            title='隐私'
          />
          <AtListItem
            arrow='right'
            title='通用'
          />
        </AtList>
        <View className='padding-top'></View>
        <AtList >
          <AtListItem
            arrow='right'
            title='帮助与反馈
        '

          />
          <AtListItem
            arrow='right'
            title='关于微信'
          />

        </AtList>
        <View className='padding-top'></View>
        <AtList >
          <AtListItem
            arrow='right'
            title='插件'
          />


        </AtList>
        <View className='padding-top'></View>
        <AtList >
          <AtListItem
            title='切换帐号'
          />


        </AtList>
        <View className='padding-top'></View>
        <AtList >
          <AtListItem
            title='退出登录'
          />


        </AtList>
      </View>
    )
  }
}
