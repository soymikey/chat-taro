/* eslint-disable taro/this-props-function */
import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'

import { View, Text } from '@tarojs/components'
import { AtAvatar, AtInput, AtIcon, AtForm ,AtButton} from "taro-ui"

import "taro-ui/dist/style/components/flex.scss";
import './conversation.scss'
import dataEmojiJson from '../../../utils/emoji.json'
import { setUnRead, setCurrSation } from '../../../newStore/actions/counter'
import { imageBase } from '../../../api/baseUrl';
import { formatTime } from '../../../utils/formater'

@connect(
  state => ({
    conversationsList: state.counter.conversationsList,
    user: state.counter.user.data,
    currSation: state.counter.currSation
  }), { setUnRead, setCurrSation }
)
export default class Conversation extends Component {
  config = {
    navigationBarTitleText: this.$router.params.id || 'unknown',
    enablePullDownRefresh: false
  }
  constructor() {
    super(...arguments)
    this.state = {
      message: '',
      chatList: [],
      iSshowOptions: false,
      moreOptionsList: [
        { name: '照片', className: 'picture' },
        { name: '拍摄', className: 'camera' },
        { name: '语音通话', className: 'voice-call' },
        { name: '位置', className: 'location' },
        { name: '红包', className: 'envelop' },
        { name: '语音输入', className: 'voice-input' },
        { name: '收藏', className: 'collection' },
        { name: '个人名片', className: 'personal-card' }
      ],
      iSshowEmoji: false,
      emojiJson: dataEmojiJson.data.split(','),



    }
  }


  componentWillMount() {
    Taro.$socket.on('mes', r => {

      if (
        r.roomid === this.props.currSation.id
      ) {
        this.setState({
          chatList: this.state.chatList.concat(Object.assign({}, r, { type: 'other' }))

        })

        Taro.$socket.emit('setReadStatus', {
          roomid: r.roomid,
          name: this.props.user.name
        })
        this.props.setUnRead({ roomid: r.roomid, clear: true })
      }
    })
    Taro.$socket.on('getHistoryMessages', r => {

      if (r.length) {
        this.props.setUnRead({
          roomid: r[0].roomid,
          clear: true,
          count: 0,
          lastMes: r[r.length - 1].mes
        })

      }
      const newChatList = r.map(v => {
        if (v.type !== 'org') {
          if (v.name === this.props.user.name) {
            v.type = 'mine'
          } else {
            v.type = 'other'
          }
        }
        return v
      })
      this.setState({
        chatList: newChatList
      })

    })

  }

  componentDidMount() {

    // <Text>{this.$router.params.id}</Text>

  }
  componentWillReceiveProps(nextProps) {

  }

  componentWillUnmount() { }

  componentDidShow() {
    if (!this.props.currSation.id) {
      this.setState({ chatList: [] })
    }
    if (this.props.currSation.type === 'group' || this.props.currSation.type === 'friend') {
      if (this.props.currSation.type === 'group') {
        // this.getGroupUsers(this.props.currSation.id)
      }
      Taro.$socket.emit('setReadStatus', {
        roomid: this.props.currSation.id,
        name: this.props.user.name
      })
      this.props.setUnRead({ roomid: this.props.currSation.id, clear: true })

      Taro.$socket.emit('getHistoryMessages', {
        roomid: this.props.currSation.id,
        offset: 1,
        limit: 100
      })
    }
  }


  componentDidHide() { }
  handleInputChange(value) {
    this.setState({ message: value })
  }
  emojiButtonHandler() {
    this.setState({ iSshowEmoji: !this.state.iSshowEmoji, iSshowOptions: false })
  }
  moreOptionsButtonHandler() {
    this.setState({ iSshowOptions: !this.state.iSshowOptions, iSshowEmoji: false })
  }
  send(type, params) {

    if (!this.state.message && !params) {
      return
    }
    let val = {
      name: this.props.user.name,
      mes: this.state.message,
      time: formatTime(new Date()),
      avatar: this.props.user.photo,
      nickname: this.props.user.nickname,
      read: [this.props.user.name],
      roomid: this.props.currSation.id,
      style: 'mess',
      userM: this.props.user.id
    }
    if (type === 'emoji') {
      // 发送表情
      val.style = 'emoji'
      val.mes = '表情'
      val.emoji = params
    } else if (type === 'img') {
      val.style = 'img'
      val.mes = '图片'
      val.emoji = params
    } else if (type === 'file') {
      val.style = 'file'
      val.mes = params.name
      val.emoji = params.response.data
    }
    this.setState({ chatList: this.state.chatList.concat(Object.assign({}, val, { type: 'mine' })) })
    Taro.$socket.emit('mes', val)
    this.props.setUnRead({
      roomid: val.roomid,
      count: 0,
      lastMes: val
    })
    if (type === 'mess') {
      this.setState({ message: '' })
    }

  }
  render() {
    const { iSshowEmoji, iSshowOptions, emojiJson, moreOptionsList, chatList } = this.state
    return (

      <View className='main-container'>
        <View className='conversation-container'>
          <View className='padding-top'></View>
          {chatList.length ? chatList.map((item) => {
            if (item.type === 'mine') {
              return <View className='at-row at-row__justify--end my-conversation-wrapper' key={item._id}>
                <View className='at-col at-col-8 at-col--wrap my-text-wrapper'>{item.mes}</View>
                <View className='at-col at-col-2' style='text-align:right'><View style='display:inline-block' >
                  <AtAvatar circle image={imageBase + item.avatar}></AtAvatar></View></View>
              </View>
            }
            return <View className='at-row  other-conversation-wrapper' key={item._id}>
              <View className='at-col at-col-2'><AtAvatar circle image={imageBase + item.avatar}></AtAvatar></View>
              <View className='at-col at-col-8 at-col--wrap other-text-wrapper'> <Text>{item.mes}</Text></View>
            </View>
          }) : null
          }
          <View className='padding-bottom'></View>
        </View>

        <View className='input-container' >
          <View className='at-row input-wrapper'>
            <View className='at-col at-col-1 icon-wrapper'>
              <AtIcon prefixClass='iconfont icon-speaker' value='clock' size='24' color='#303030'></AtIcon>
            </View>
            <View className='at-col at-col-9'>
              <AtForm
                onSubmit={this.send.bind(this,'mes')}
              >
                <AtInput
                  type='text'
                  maxLength='180'
                  value={this.state.inputValue}
                  onChange={this.handleInputChange.bind(this)}
                >
                </AtInput>
                <AtButton formType='submit'>发送</AtButton>
              </AtForm>
            </View>
            <View className='at-col at-col-1 icon-wrapper' onClick={this.emojiButtonHandler.bind(this)}>
              <AtIcon prefixClass='iconfont icon-emoji' value='clock' size='24' color='#303030'></AtIcon>
            </View>
            <View className='at-col at-col-1 icon-wrapper' onClick={this.moreOptionsButtonHandler.bind(this)}>
              <AtIcon prefixClass='iconfont icon-add' value='clock' size='24' color='#303030'></AtIcon>
            </View>
          </View>
          {iSshowEmoji ? <View class='emoji-default'>
            {emojiJson.map((item, index) => {
              return <View key={index} className='emoji-item'>{item}</View>
            })}
          </View> : null}
          {iSshowOptions ? <View className='moreOptions-default'>
            {moreOptionsList.map((item, index) => {
              return <View key={index} className='item-wrapper'>
                <View class='item-container'>
                  <AtIcon prefixClass={'iconfont icon-' + item.className} size='25' color='#808080'></AtIcon>
                  <Text className='text'>{item.name}</Text>
                </View>
              </View>
            })}
          </View> : null}
        </View>

      </View>
    )
  }
}

