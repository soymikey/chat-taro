import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import 'taro-ui/dist/style/index.scss' // 全局引入一次即可

import Index from './pages/index'
import configStore from './store'
import './styles/iconfont.css'
import './styles/style.scss'
import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  config = {

    pages: [
      // 'pages/login/login',
      'pages/home/conversation/conversation',
      'pages/home/home',
      'pages/user/user',
      'pages/explore/explore',
      'pages/contact/contact',




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

  componentDidMount() { }

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
