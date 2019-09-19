import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import 'taro-ui/dist/style/index.scss' // 全局引入一次即可
import {importWeappCookieOnDiffPlatform} from './utils/platformImport'
import Index from './pages/index'
import configStore from './newStore'
import './styles/iconfont.css'
import './styles/style.scss'
import './app.scss'
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

import io from './webSocket/socket.io-mp'
//Weappcookie 的插件只需要编译微信小程序的时候才需要导入
importWeappCookieOnDiffPlatform()

const socket = io('http://localhost:9988')
const store = configStore()

class App extends Component {

  // eslint-disable-next-line react/sort-comp
  config = {

    pages: [
      //  'pages/index/index',
      'pages/login/login',
      'pages/home/home',//主页
      'pages/home/conversation/conversation',//聊天页面
      'pages/home/addFriend/addFriend',// 添加好友
      'pages/commonPages/friendDetails/friendDetails',//好友详情

      'pages/home/friendRequest/friendRequest',//好友请求
      'pages/user/user',//个人
      'pages/user/userDetails/userDetails',//个人信息
      'pages/user/userSetting/userSetting',//个人设置
      'pages/explore/explore',//发现
      'pages/contact/contact',//联系人
      'pages/contact/friendVerify/friendVerify',//联系人
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#EDEDED',
      navigationBarTitleText: '微信',
      backgroundColor:'#EDEDED',
      navigationBarTextStyle: 'black',
      enablePullDownRefresh:true
    },
    tabBar: {
      color: "#666",
      selectedColor: "#57BE6A",
      backgroundColor: "#fafafa",
      borderStyle: 'black',

    list: [{
      pagePath: "pages/home/home",
      iconPath: "./assets/tabBar/wechat.png",
      selectedIconPath: "./assets/tabBar/wechat-actived.png",
      text: "微信"
    }, {
      pagePath: "pages/contact/contact",
      iconPath: "./assets/tabBar/contact.png",
      selectedIconPath: "./assets/tabBar/contact-actived.png",
      text: "通讯录"
    }, {
      pagePath: "pages/explore/explore",
      iconPath: "./assets/tabBar/explore.png",
      selectedIconPath: "./assets/tabBar/explore-actived.png",
      text: "发现"
    }, {
      pagePath: "pages/user/user",
      iconPath: "./assets/tabBar/user.png",
      selectedIconPath: "./assets/tabBar/user-actived.png",
      text: "我的"
    }]
    }
  }
  componentWillMount(){
    socket.on('connect', d => {
      console.log('连接成功',d)
    })
    socket.on('joined', (OnlineUser) => {
      console.log('加入了', OnlineUser)
      // this.$store.commit('setOnlineUser', OnlineUser)
    })

    Taro.$socket = socket
  }

  componentDidMount() {

   }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        {/* <Index /> */}
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
