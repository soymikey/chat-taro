import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'

import { View, Text, Image, } from '@tarojs/components'
import { AtButton, AtTabs, AtTabsPane, AtInput, AtForm, } from 'taro-ui'



import request from '../../api/request'
import api from '../../api'
import { getUserInfo } from '../../newStore/actions/counter'
import './login.scss'
// @connect(({ counter }) => ({
//   counter
// }), (dispatch) => ({
//   onGetUserInfo(params) {
//     dispatch(getUserInfo(params))
//   },

// }))

@connect(
  state => ({
   state
  }),
  { getUserInfo }
)
export default class Login extends Component {
  static externalClasses = ['main-container']
  config = {
    navigationBarTitleText: ''
  }
  constructor() {
    super(...arguments)
    this.regcode = Taro.createRef()
    this.state = {
      current: 0,
      username: '',
      password: '',
      rePassword: '',
      verifyCode: '',
      initCode: '',
      captchaBase64: ''
    }
  }

  componentWillMount() { }

  componentDidMount() {
    // this.setState({username:'m1',password:'1'},()=>{
    //   this.login()
    // })

  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  getCaptcha() {
    request.get('captcha/get').then(res => {
      const { code, data, state } = res.data
      this.setState({
        captchaBase64: data
      })

    }).catch(e => { console.log(e) })
  }
  signUp() {
    const { username, password, rePassword, verifyCode } = this.state
    if (username === '') {
      Taro.showToast({
        title: '请输入账号',
        icon: 'none',
      })
    } else if (password === '') {
      Taro.showToast({
        title: '请输入密码',
        icon: 'none',
      })
    } else if (rePassword === '') {
      Taro.showToast({
        title: '请输入确认密码',
        icon: 'none',
      })
    } else if (password !== rePassword) {
      Taro.showToast({
        title: '两次密码不一样',
        icon: 'none',
      })
    } else {
      let params = {
        name: username,
        pass: password
      }
      Taro.showLoading({
        title: '加载中'
      })
      api.signUp(params).then(r => {

        if (r.data.code === 0) {

          Taro.showToast({
            title: '注册成功',
            icon: 'success',
          })

          this.setState({
            current: 0,
            username: '',
            password: '',
            rePassword: '',
            verifyCode: '',
          })
        } else if (r.data.code === 1) {
          Taro.showToast({
            title: '账号已存在',
            icon: 'none',
          })

        } else {
          Taro.showToast({
            title: '注册失败',
            icon: 'none',
          })

        }
        Taro.hideLoading()
      })
    }
  }
  login() {
    const { username, password, rePassword, verifyCode } = this.state

    if (username === '') {
      Taro.showToast({
        title: '请输入账号',
        icon: 'none',
      })
    } else if (password === '') {
      Taro.showToast({
        title: '请输入密码',
        icon: 'none',
      })
    } else {
      let params = {
        name: username,
        pass: password
      }
      Taro.showLoading({
        title: '加载中'
      })
      api.login(params).then(r => {

        if (r.data.code === 0) {
          Taro.showToast({
            title: '登录成功',
            icon: 'success',
          })
          //  this.$store.dispatch('getUserInfo', this)
          this.props.getUserInfo(Taro)
          this.setState({
            current: 0,
            username: '',
            password: '',
            rePassword: '',
            verifyCode: '',
          })
        } else if (r.data.code === -1) {
          Taro.showToast({
            title: '账号不存在或密码错误',
            icon: 'none',
          })
        } else {
          Taro.showToast({
            title: '登录失败',
            icon: 'none',
          })
        }
        Taro.hideLoading()
      })
    }
  }

  handleTabClick(value) {
    this.setState({
      current: value,
      username: '',
      password: '',
      rePassword: '',
      verifyCode: ''
    }, () => {
      // this.getCaptcha()
    })
  }
  handleUsername(value) {
    this.setState({
      username: value
    })
  }
  handlePassword(value) {
    this.setState({
      password: value
    })
  }
  handleRePassword(value) {
    this.setState({
      rePassword: value
    })
  }

  handleVerifyCode(value) {
    this.setState({
      verifyCode: value
    })
  }
  render() {
    const tabList = [{ title: '登录' }, { title: '注册' }]
    const { captchaBase64 } = this.state
    return (
      <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleTabClick.bind(this)}>

        <AtTabsPane current={this.state.current} index={0} >
          <AtForm>
            <AtInput
              name='username'
              title='用户名'
              type='text'
              placeholder='请输入用户名'
              value={this.state.username}
              onChange={this.handleUsername.bind(this)}
            />

            <AtInput
              name='password'
              title='密码'
              type='password'
              placeholder='密码不能少于6位数'
              value={this.state.password}
              onChange={this.handlePassword.bind(this)}
            />
            <AtInput
              clear
              title='验证码'
              type='text'
              maxLength='4'
              placeholder='验证码'
              value={this.state.verifyCode}
              onChange={this.handleVerifyCode.bind(this)}
            >
              <Image src={captchaBase64} />

            </AtInput>


          </AtForm>
          <AtButton type='primary' onClick={this.login.bind(this)}>登录</AtButton>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1}>
          <AtForm>
            <AtInput
              name='username'
              title='用户名'
              type='text'
              placeholder='请输入用户名'
              value={this.state.username}
              onChange={this.handleUsername.bind(this)}
            />

            <AtInput
              name='password'
              title='密码'
              type='password'
              placeholder='密码不能少于6位数'
              value={this.state.password}
              onChange={this.handlePassword.bind(this)}
            />
            <AtInput
              name='password'
              title='密码'
              type='password'
              placeholder='重新输入密码'
              value={this.state.rePassword}
              onChange={this.handleRePassword.bind(this)}
            />
            <AtInput
              clear
              title='验证码'
              type='text'
              maxLength='4'
              placeholder='验证码'
              value={this.state.verifyCode}
              onChange={this.handleVerifyCode.bind(this)}
            >
              <Image src={captchaBase64} />

            </AtInput>


          </AtForm>
          <AtButton type='primary' onClick={this.signUp.bind(this)}>注册</AtButton>
        </AtTabsPane>

      </AtTabs>
    )
  }
}
