import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtAvatar, AtInput, AtIcon } from "taro-ui"
import me from '../../../assets/me.jpg'
import other from '../../../assets/other.jpg'
import "taro-ui/dist/style/components/flex.scss";
import './conversation.scss'
import dataEmojiJson from '../../../utils/emoji.json'


export default class Conversation extends Component {
  config = {
    navigationBarTitleText: this.$router.params.id || 'unknown',
    enablePullDownRefresh:false
  }
  constructor() {
    super()
    this.state = {
      iSshowOptions:false,
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
      iSshowEmoji:false,
      emojiJson: dataEmojiJson.data.split(','),
      inputValue: '',
      content: [
        { type: 'me', content: 'hello world' },
        { type: 'other', content: 'hello world' },
        { type: 'me', content: 'hello world' },
        { type: 'me', content: 'hello world' },
        { type: 'other', content: 'hello world' },
        { type: 'me', content: 'hello world' },
        { type: 'me', content: 'hello world' },
      ],

    }
  }

  componentWillMount() { }

  componentDidMount() {
    // <Text>{this.$router.params.id}</Text>

  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  handleInputChange(value) {
    this.setState({ inputValue: value })
  }
  emojiButtonHandler(){
    this.setState({iSshowEmoji:!this.state.iSshowEmoji,iSshowOptions:false})
  }
  moreOptionsButtonHandler(){
    this.setState({iSshowOptions:!this.state.iSshowOptions,iSshowEmoji:false})
  }
  render() {
    const { content,iSshowEmoji,iSshowOptions,emojiJson,moreOptionsList } = this.state
    return (
      <View className='main-container'>



        <View className='padding-top'></View>
        {content.map((item,index) => {
          if (item.type === 'me') {
            return <View className='at-row at-row__justify--end my-conversation-wrapper' key={index}>
              <View className='at-col at-col-8 at-col--wrap my-text-wrapper'>{item.content}</View>
              <View className='at-col at-col-2' style='text-align:right'><View style='display:inline-block' ><AtAvatar circle image={me}></AtAvatar></View></View>

            </View>
          }
          return <View className='at-row  other-conversation-wrapper' key={index}>
            <View className='at-col at-col-2'><AtAvatar circle image={other}></AtAvatar></View>
            <View className='at-col at-col-8 at-col--wrap other-text-wrapper'> <Text>{item.content}</Text></View>
          </View>
        })
        }

        <View className='padding-bottom'></View>
        <View className='input-container'>
        <View className='at-row input-wrapper'>
          <View className='at-col at-col-1 icon-wrapper'>
            <AtIcon prefixClass='iconfont icon-speaker' value='clock' size='24' color='#303030'></AtIcon>
          </View>
          <View className='at-col at-col-9'>
            <AtInput
              type='text'
              maxLength='180'
              value={this.state.inputValue}
              onChange={this.handleInputChange.bind(this)}
            >
            </AtInput>
          </View>
          <View className='at-col at-col-1 icon-wrapper' onClick={this.emojiButtonHandler.bind(this)}>
            <AtIcon prefixClass='iconfont icon-emoji' value='clock' size='24' color='#303030'></AtIcon>
          </View>
          <View className='at-col at-col-1 icon-wrapper'  onClick={this.moreOptionsButtonHandler.bind(this)}>
            <AtIcon prefixClass='iconfont icon-add' value='clock' size='24' color='#303030'></AtIcon>
          </View>
        </View>
        {iSshowEmoji? <View class='emoji-default'>
      {emojiJson.map((item,index)=>{
         return <View key={index} className='emoji-item'>{item}</View>
      })}
      </View>:null}
        {iSshowOptions? <View className='moreOptions-default'>
          {moreOptionsList.map((item,index)=>{
            return <View  key={index}  className='item-wrapper'>
            <View class='item-container'>
              <AtIcon prefixClass={'iconfont icon-'+item.className}  size='25' color='#808080'></AtIcon>
              <Text className='text'>{item.name}</Text>
            </View>
          </View>
          })}
        </View>:null}
      </View>



      </View>
    )
  }
}

