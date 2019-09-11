import {
  SETCONVERSATIONLIST,
  SETUSER
} from '../constants/counter'

// export const add = () => {
//   return {
//     type: ADD
//   }
// }
// export const minus = () => {
//   return {
//     type: MINUS
//   }
// }

// // 异步的action
// export function asyncAdd () {
//   return dispatch => {
//     setTimeout(() => {
//       dispatch(add())
//     }, 2000)
//   }
// }
/**
 */
import api from '../../api'


export const getUserInfo = (that) => { // 获取用户登录信息

  return dispatch => api.getUserInfo().then(r => {


    if (r.data.code === 0) {

      dispatch({ type: SETUSER, payload: { data: r.data.data } })
      dispatch({ type: SETCONVERSATIONLIST, payload: { data: r.data.data.conversationsList } })

      getVchatInfo()
      if (that) {
        that.hideLoading()
        that.reLaunch({url:'/pages/home/home'})
      }
    } else {
      dispatch({ type: SETUSER, payload: { data: '' } })

    }
  })
}
export const setTheme = ({ state }) => { // 设置主题
  document.body.id = 'theme-' + state.user.projectTheme
}
export const setTransitionName = ({ state }) => { // 设置页面过渡动画类型
  state.transitionName = 'moveOut'
  setTimeout(_ => {
    state.transitionName = ''
  }, 500)
}
export const getVchatInfo = () => { // 获取官方账号信息
  return (dispatch, getState) => api.getVchatInfo().then(r => {
    if (r.data.code === 0) {
      const { user } = getState()
      let id = user.id + '-' + r.data.data.id

      const newConversationsList = Object.assign({}, r.data, { type: 'vchat' }, { id })
      dispatch({ type: SETCONVERSATIONLIST, payload: { data: newConversationsList } })
    }
  })
}



