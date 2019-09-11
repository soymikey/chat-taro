import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtList, AtListItem, AtSearchBar } from "taro-ui"

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
      searchTitle: ''
    }
  }

  componentWillMount() { }

  componentDidMount() {
    // Taro.removeTabBarBadge({ index: 0,})
    Taro.setTabBarBadge({
      index: 0,
      text: '20'
    })
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  onChangeSearch(value) {
    console.log(value)
  }
  goToConverstationPage(value){
    console.log('value',value)
    Taro.navigateTo({url: '/pages/home/conversation/conversation?id='+value,})
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
            title='Taro 开发交流群'
            note={avartar1}
            thumb={avartar1}
            onClick={this.goToConverstationPage.bind(this,avartar1)}
          />
          <AtListItem
            title='Taro 开发交流群'
            note={avartar2}
            thumb={avartar2}
            onClick={this.goToConverstationPage.bind(this,avartar2)}
          />
          <AtListItem
            title='Taro 开发交流群'
            note={avartar3}
            thumb={avartar3}
            onClick={this.goToConverstationPage.bind(this,avartar3)}
          />
          <AtListItem
            title='Taro 开发交流群'
            note={avartar4}
            thumb={avartar4}
            onClick={this.goToConverstationPage.bind(this,avartar4)}
          />


        </AtList>
      </View>
    )
  }
}
