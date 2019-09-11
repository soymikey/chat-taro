import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtList, AtListItem, AtSearchBar, AtIcon, AtActionSheet, AtActionSheetItem } from "taro-ui"

import './home.scss'
import avartar1 from '../../assets/avartar.png'
import avartar2 from '../../assets/me.jpg'
import avartar3 from '../../assets/other.jpg'
import avartar4 from '../../assets/logo.png'

export default class Home extends Component {
  static externalClasses = ['main-container']
  config = {
    navigationBarTitleText: '微信',


  }
  constructor() {
    super()
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



    Taro.showTabBar()

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
    Taro.showTabBar().catch(err=>{

    })
  }
  goToConverstationPage(value) {
    Taro.navigateTo({ url: '/pages/home/conversation/conversation?id=' + value, })
  }
  handlerMoreOptionsItemButton(value){
    if(value==='添加朋友'){
      Taro.showTabBar()
       this.setState({ isShowMoreOptions: false },function (){
        Taro.navigateTo({ url: '/pages/home/addFriend/addFriend', })
       })

    }else{
      Taro.showToast({
        title: value+'功能开发中..',
        icon: 'none',
      })
    }
  }
  render() {

    const { searchTitle, isShowMoreOptions, moreOptionsList } = this.state
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
          <AtListItem
            title='Taro 开发交流群'
            note={avartar1}
            thumb={avartar1}
            onClick={this.goToConverstationPage.bind(this, avartar1)}
          />
          <AtListItem
            title='Taro 开发交流群'
            note={avartar2}
            thumb={avartar2}
            onClick={this.goToConverstationPage.bind(this, avartar2)}
          />
          <AtListItem
            title='Taro 开发交流群'
            note={avartar3}
            thumb={avartar3}
            onClick={this.goToConverstationPage.bind(this, avartar3)}
          />
          <AtListItem
            title='Taro 开发交流群'
            note={avartar4}
            thumb={avartar4}
            onClick={this.goToConverstationPage.bind(this, avartar4)}
          />


        </AtList>
        <AtActionSheet isOpened={isShowMoreOptions} onClose={this.closeShowMoreOptions.bind(this)}>

          {moreOptionsList.map((item, index) => {
            return <AtActionSheetItem key={index} onClick={this.handlerMoreOptionsItemButton.bind(this,item.name)}>{item.name}</AtActionSheetItem>
          })}

        </AtActionSheet>
      </View>
    )
  }
}
