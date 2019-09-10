import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtAvatar, AtInput, AtIcon } from "taro-ui"
import me from '../../../assets/me.jpg'
import other from '../../../assets/other.jpg'
import "taro-ui/dist/style/components/flex.scss";
import './conversation.scss'


export default class Conversation extends Component {
  config = {
    navigationBarTitleText: this.$router.params.id || 'unknown'
  }
  constructor() {
    super()
    this.state = {
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
  render() {
    const { content } = this.state
    return (
      <View className='main-container'>



        <View className='padding-top'></View>
        {content.map(item => {
          if (item.type === 'me') {
            return <View className='at-row at-row__justify--end my-conversation-wrapper' key={item}>
              <View className='at-col at-col-8 at-col--wrap my-text-wrapper'>{item.content}</View>
              <View className='at-col at-col-2'><AtAvatar circle image={me}></AtAvatar></View>
            </View>
          }
          return <View className='at-row  other-conversation-wrapper' key={item}>
            <View className='at-col at-col-2'><AtAvatar circle image={other}></AtAvatar></View>
            <View className='at-col at-col-8 at-col--wrap other-text-wrapper'> <Text>{item.content}</Text></View>
          </View>
        })
        }

        <View className='padding-bottom'></View>
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
          <View className='at-col at-col-1 icon-wrapper'>
            <AtIcon prefixClass='iconfont icon-emoji' value='clock' size='24' color='#303030'></AtIcon>
          </View>
          <View className='at-col at-col-1 icon-wrapper'>
            <AtIcon prefixClass='iconfont icon-add' value='clock' size='24' color='#303030'></AtIcon>
          </View>
        </View>
        {/* <View className='input-wrapper at-row'>

          <AtIcon prefixClass='iconfont icon-speaker' value='clock' size='24' color='#F00'></AtIcon>
          <AtInput
            type='text'
            maxLength='180'
            value={this.state.inputValue}
            onChange={this.handleInputChange.bind(this)}
          >


          </AtInput>
          <AtIcon prefixClass='iconfont icon-emoji' value='clock' size='24' color='#F00'></AtIcon>
          <AtIcon prefixClass='iconfont icon-add' value='clock' size='24' color='#F00'></AtIcon>
        </View> */}
      </View>
    )
  }
}

