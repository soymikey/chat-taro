import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtList, AtListItem, } from "taro-ui"

import './userDetails.scss'
import avartar1 from '../../../assets/avartar.png'

export default class UserDetails extends Component {
  config = {
    navigationBarTitleText: '个人信息',
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
      <View className='main-container'>
        <AtList >
            <AtListItem

              title='头像'
              thumb={avartar1}
              arrow='right'
            />
            <AtListItem
              extraText='米高'
              title='名字'
              arrow='right'
            />
            <AtListItem
              extraText='soymikey'
              title='微信号'
              arrow='right'
            />
            <AtListItem

              title='我的二维码'
              arrow='right'
            />
            <AtListItem

              title='更多'
              arrow='right'
            />



          </AtList>
          <View className='padding-top'></View>
          <AtList >
          <AtListItem
            arrow='right'

            title='我的地址'

          />
        </AtList>
      </View>
    )
  }
}
