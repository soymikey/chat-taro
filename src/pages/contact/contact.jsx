import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'

import { View, Text } from '@tarojs/components'
import { AtList, AtListItem, AtSearchBar } from "taro-ui"


import { imageBase } from '../../api/baseUrl'

import './contact.scss'
@connect(
  state => ({
    conversationsList: state.counter.conversationsList
  }),
)
export default class Contact extends Component {
  config = {
    navigationBarTitleText: '通讯录'
  }
  constructor() {
    super(...arguments)
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

  goToFriendVerify() {
    Taro.navigateTo({ url: '/pages/contact/friendVerify/friendVerify' })
  }
  render() {
    const { searchTitle } = this.state
    const { conversationsList } = this.props
    return (
      <View className='main-container'>
        <AtSearchBar
          value={searchTitle}
          onChange={this.onChangeSearch.bind(this)}
        />
        <AtList>
          {conversationsList.length ? conversationsList.map((item) => {
            return <AtListItem key={item.id}
              onClick={this.goToFriendVerify.bind(this)}
              title={item.name}
              thumb={imageBase + item.photo}
            />
          }) : null}


        </AtList>

        <View className='bottom-block'><Text>{conversationsList.length}位联系人</Text></View>

      </View>
    )
  }
}
