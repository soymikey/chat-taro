import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtList, AtListItem, AtSearchBar } from "taro-ui"

import avartar1 from '../../assets/avartar.png'
import avartar2 from '../../assets/me.jpg'
import avartar3 from '../../assets/other.jpg'
import avartar4 from '../../assets/logo.png'
import './contact.scss'

export default class Contact extends Component {
  config = {
    navigationBarTitleText: '通讯录'
  }
  constructor() {
    super()
    this.state = {
      searchTitle: ''
    }
  }


  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  onChangeSearch(value) {
    console.log(value)
  }

goToFriendVerify(){
Taro.navigateTo({url:'/pages/contact/friendVerify/friendVerify'})
}
  render() {
    const { searchTitle } = this.state

    return (
      <View className='main-container'>
        <AtSearchBar
          value={searchTitle}
          onChange={this.onChangeSearch.bind(this)}
        />
        <AtList>

          <AtListItem
            onClick={this.goToFriendVerify.bind(this)}
            title={avartar1}
            thumb={avartar1}
          />
          <AtListItem
            title={avartar2}
            thumb={avartar2}
          />
          <AtListItem
            title={avartar3}
            thumb={avartar3}
          />
          <AtListItem
            title={avartar4}
            thumb={avartar4}
          />

        </AtList>

        <View className='bottom-block'><Text>10位联系人</Text></View>

      </View>
    )
  }
}
