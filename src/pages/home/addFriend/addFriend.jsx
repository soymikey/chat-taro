import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtSearchBar, AtListItem, AtList } from "taro-ui"
import avartar1 from '../../../assets/avartar.png'

import './addFriend.scss'

export default class AddFriend extends Component {
  config = {
    navigationBarTitleText: '添加朋友',
  }
  constructor() {
    super()
    this.state = {
      searchTitle: '',
      resultList: [1,2,3,4]
    }
  }

  componentWillMount() { }

  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }
  onChangeSearch(value) {
    this.setState({ searchTitle: value })
  }
  goToFriendDetails(){
    Taro.navigateTo({ url: '/pages/commonPages/friendDetails/friendDetails' })

  }
  render() {
    const { searchTitle, resultList } = this.state
    return (
      <View className='main-container'>
        <AtSearchBar
          value={searchTitle}
          onChange={this.onChangeSearch.bind(this)}
        />
        <AtList>
          {resultList.length ? resultList.map((item, index) => {
            return <AtListItem key={index}
              title='Taro 开发交流群'
              note='1231'
              thumb={avartar1}
              onClick={this.goToFriendDetails.bind(this)}
            />
          }) : null}
        </AtList>


      </View>
    )
  }
}
