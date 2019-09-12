import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'

import { View, Text } from '@tarojs/components'
import { AtList, AtListItem, AtSearchBar, AtIcon, AtActionSheet, AtActionSheetItem } from "taro-ui"
import { imageBase } from '../../api/baseUrl'
import './home.scss'
import avartar1 from '../../assets/avartar.png'
import avartar2 from '../../assets/me.jpg'
import avartar3 from '../../assets/other.jpg'
import avartar4 from '../../assets/logo.png'

@connect(
  state => ({
    conversationsList:state.counter.conversationsList
  }),
)

export default class Home extends Component {
  static externalClasses = ['main-container']
  config = {
    navigationBarTitleText: '微信',
  }
  constructor() {
    super(...arguments)
    this.state = {
      searchTitle: '',
      isShowMoreOptions: false,
      moreOptionsList: [
        { name: '发起群聊' },
        { name: '添加朋友' },
        { name: '扫一扫' },
        { name: '收付款' },
      ]
    }
  }

  componentWillMount() { }

  componentDidMount() {
    // Taro.removeTabBarBadge({ index: 0,})
    // Taro.showTabBar()

  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  onChangeSearch(value) {
    console.log(value)
  }
  moreOptionsButtonHandler() {
    this.setState({ isShowMoreOptions: !this.state.isShowMoreOptions }, () => {
      if (this.state.isShowMoreOptions) {
        Taro.hideTabBar()
      } else {
        Taro.showTabBar()
      }
    })
  }
  closeShowMoreOptions() {

    this.setState({ isShowMoreOptions: false })
    Taro.showTabBar().catch(err => {

    })
  }
  goToConverstationPage(value) {
    Taro.navigateTo({ url: '/pages/home/conversation/conversation?id=' + value, })
  }
  handlerMoreOptionsItemButton(value) {
    if (value === '添加朋友') {
      Taro.showTabBar()
      this.setState({ isShowMoreOptions: false }, function () {
        Taro.navigateTo({ url: '/pages/home/addFriend/addFriend', })
      })

    } else {
      Taro.showToast({
        title: value + '功能开发中..',
        icon: 'none',
      })
    }
  }
  render() {
    const { searchTitle, isShowMoreOptions, moreOptionsList } = this.state
    const { conversationsList } = this.props


    return (
      <View className='main-container'>

        <View className='at-row'>
          <View className='at-col'>
            <AtSearchBar
              value={searchTitle}
              onChange={this.onChangeSearch.bind(this)}
            />
          </View>
          <View className='at-col at-col-1 at-col--auto' onClick={this.moreOptionsButtonHandler.bind(this)}>
            <AtIcon prefixClass='iconfont icon-add' value='clock' size='24' color='#303030'></AtIcon>
          </View>
        </View>


        <AtList>
          {conversationsList.length ? conversationsList.map((item) => {
            return <AtListItem key={item.id}
              title={item.name}
              note={item.photo}
              thumb={imageBase + item.photo}
              onClick={this.goToConverstationPage.bind(this, item.id)}
            />
          }) : null}
        </AtList>
        <AtActionSheet isOpened={isShowMoreOptions} onClose={this.closeShowMoreOptions.bind(this)}>

          {moreOptionsList.map((item, index) => {
            return <AtActionSheetItem key={index} onClick={this.handlerMoreOptionsItemButton.bind(this, item.name)}>{item.name}</AtActionSheetItem>
          })}

        </AtActionSheet>
      </View>
    )
  }
}
