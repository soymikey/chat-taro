/* eslint-disable taro/this-props-function */
import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'

import { View, Text, Image } from '@tarojs/components'
import { AtList, AtListItem, AtSearchBar, AtIcon, AtActionSheet, AtActionSheetItem, AtBadge, AtAvatar } from "taro-ui"
import { imageBase } from '../../api/baseUrl'
import { formatTime } from '../../utils/formater'
import { setUnRead, setUnReadRequest, setCurrSation, test } from '../../newStore/actions/counter'

import './home.scss'



@connect(
  state => ({
    conversationsList: state.counter.conversationsList,
    user: state.counter.user.data,
    currSation: state.counter.currSation,
    unRead: state.counter.unRead
  }), { setUnRead, setUnReadRequest, setCurrSation, test }
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
      contactList: [],
      moreOptionsList: [
        { name: '发起群聊' },
        { name: '添加朋友' },
        { name: '扫一扫' },
        { name: '收付款' },
      ]
    }
  }

  componentWillMount() {
    Taro.$socket.on('getHistoryMessages', mesdata => {
      let data = mesdata.filter(
        v =>
          v.read.indexOf(this.props.user.name) === -1 &&
          v.type !== 'info' &&
          v.type !== 'validate'
      )
      let validate = mesdata.filter(
        v => v.type === 'validate' && v.status === '0'
      )

      // 聊天历史记录
      if (data.length) {
        this.props.setUnRead({
          roomid: data[0].roomid,
          count: data.length,
          lastMes: data[data.length - 1]
        })

      } else {
        if (mesdata.length) {
          this.props.setUnRead({
            roomid: mesdata[0].roomid,
            count: 0,
            lastMes: mesdata[mesdata.length - 1]
          })
        } else {

          this.props.setUnRead({ roomid: 0, count: 0, lastMes: {} })
        }
      }
      if (validate.length) {
        this.props.setUnReadRequest({
          reset: false,
          content: validate
        })
      }
    })
    Taro.$socket.on('mes', r => {
      this.props.setUnRead({
        roomid: r.roomid,
        add: true,
        count: 1,
        lastMes: r
      })
    })

  }

  componentDidMount() {
    this.joinRoom()
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.conversationsList !== nextProps.conversationsList) {
      this.joinRoom()
    }
    if (this.props.unRead !== nextProps.unRead) {
      console.log('nextProps.unRead', nextProps.unRead)
      const newContactList = [...this.state.contactList]
      newContactList.forEach((v, i) => {
        nextProps.unRead.forEach(m => {

          if (v.id === m.roomid) {
            console.log('m.count', m.count)
            Object.assign(newContactList[i], { unRead: m.count, lastMes: m.lastMes.mes })
            // this.$set(
            //   this.contactsList,
            //   i,
            //   Object.assign({}, v, { unRead: m.count, lastMes: m.lastMes.mes })
            // )
          }
        })
      })
      this.setState({ contactList: newContactList })
    }

  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  //======================================
  joinRoom() {
    if (!this.props.user.name) {
      return
    }
    this.props.conversationsList.forEach(v => {
      let val = {
        name: this.props.user.name,
        time: formatTime(new Date()),
        avatar: this.props.user.photo,
        roomid: v.id
      }
      this.setState({ contactList: JSON.parse(JSON.stringify(this.props.conversationsList)) })

      let room = { roomid: v.id, offset: 1, limit: 200 }
      Taro.$socket.emit('join', val)
      Taro.$socket.emit('getHistoryMessages', room)
    })
  }
  //========================================
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
    this.props.setCurrSation(value)
    Taro.navigateTo({ url: '/pages/home/conversation/conversation?id=' + value.id })
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

    const { searchTitle, isShowMoreOptions, moreOptionsList, contactList } = this.state
    const { unRead } = this.props
    console.log('unRead', unRead)
    console.log('contactList', contactList)
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
          {contactList.length ? contactList.map((item) => {

            return item.unRead !== 0 ? <AtBadge value={item.unRead} key={item.id}>

              <AtListItem

                title={item.name}
                note={item.lastMes}
                thumb={imageBase + item.photo}
                onClick={this.goToConverstationPage.bind(this, item)}
              ></AtListItem>

            </AtBadge> : <AtListItem

              title={item.name}
              note={item.lastMes}
              thumb={imageBase + item.photo}
              onClick={this.goToConverstationPage.bind(this, item)}
            ></AtListItem>


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
