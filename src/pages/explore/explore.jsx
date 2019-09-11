import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtList, AtListItem, } from "taro-ui"

import './explore.scss'
import moment from '../../assets/explorepng/moment.png'
import scan from '../../assets/explorepng/scan.png'
import shake from '../../assets/explorepng/shake.png'
import look from '../../assets/explorepng/look.png'
import search from '../../assets/explorepng/search.png'
import nearby from '../../assets/explorepng/nearby.png'
import shopping from '../../assets/explorepng/shopping.png'
import game from '../../assets/explorepng/game.png'
import mini_program from '../../assets/explorepng/mini_program.png'

export default class Explore extends Component {
  config = {
    navigationBarTitleText: '发现'
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='main-container'>

        <AtList >
          <AtListItem
            arrow='right'
            title='朋友圈'
            thumb={moment}
          />
        </AtList>
        <View className='padding-top'></View>
        <AtList >
          <AtListItem
            arrow='right'

            title='扫一扫'
            thumb={scan}
          />
          <AtListItem
            arrow='right'

            title='摇一摇'
            thumb={shake}
          />
        </AtList>
        <View className='padding-top'></View>
        <AtList >
          <AtListItem
            arrow='right'

            title='看一看'
            thumb={look}
          />
          <AtListItem
            arrow='right'

            title='搜一搜'
            thumb={search}
          />
        </AtList>
        <View className='padding-top'></View>
        <AtList >
          <AtListItem
            arrow='right'

            title='附近的人'
            thumb={nearby}
          />

        </AtList>
        <View className='padding-top'></View>
        <AtList >
          <AtListItem
            arrow='right'

            title='购物'
            thumb={shopping}
          />
          <AtListItem
            arrow='right'

            title='游戏'
            thumb={game}
          />
        </AtList>
        <View className='padding-top'></View>
        <AtList >
          <AtListItem
            arrow='right'

            title='小程序'
            thumb={mini_program}
          />

        </AtList>

      </View>
    )
  }
}
