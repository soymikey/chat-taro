import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, } from '@tarojs/components'
import { AtButton, AtTabs, AtTabsPane, AtInput, AtForm, } from 'taro-ui'

import './login.scss'

import request from '../../api/request'


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
    this.getCaptcha()
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  getCaptcha() {
    request.get('captcha/get').then(res => {
      const { code, data, state } = res.data
      console.log(res.data)
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
      console.log(params)
      // this.loading = true
      // api.signUp(params).then(r => {
      //   if (r.code === 0) {
      //     this.toast('注册成功', 'success')
      //     this.signForm = {
      //       name: '',
      //       pass: '',
      //       repass: '',
      //       regcode: ''
      //     }
      //     this.tabIndex = 0
      //   } else if (r.code === 1) {
      //     this.toast('账号已存在', 'warn')
      //   } else {
      //     this.toast('注册失败', 'warn')
      //   }
      //   this.loading = false
      // })
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
      this.getCaptcha()
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
          <AtButton type='primary'>登录</AtButton>
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
