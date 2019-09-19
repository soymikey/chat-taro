

import Taro from '@tarojs/taro'

export const importWeappCookieOnDiffPlatform= ()=> {
  if (process.env.TARO_ENV==="weapp") {
    require('weapp-cookie')
  }
}
export const navigateToHomeOnDiffPlatform=()=>{
  if (process.env.TARO_ENV==="weapp") {
   Taro.reLaunch({ url: '/pages/home/home' })
  }else if(process.env.TARO_ENV==='alipay'){
    Taro.redirectTo({ url: '/pages/home/home' })
  }

}

