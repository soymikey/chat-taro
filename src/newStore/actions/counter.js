import {
  SETCONVERSATIONLIST,
  SETUSER,
  SETUNREAD,
  SETUNREADREQUEST,
  SETCURRSATION
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
import {navigateToHomeOnDiffPlatform} from '../../utils/platformImport'

export const getUserInfo = (that) => { // 获取用户登录信息

  return dispatch => api.getUserInfo().then(r => {
    if (r.data.code === 0) {

      dispatch({ type: SETUSER, payload: { data: r.data.data } })
      dispatch({ type: SETCONVERSATIONLIST, payload: r.data.data.conversationsList  })
      getVchatInfo()
      if (that) {
        that.hideLoading()
        navigateToHomeOnDiffPlatform()
        // that.redirectTo({ url: '/pages/home/home' })
      }
    } else {
      that.showToast({
        title:'获取用户信息失败',
        icon: 'none',
      })
      dispatch({ type: SETUSER, payload:'' })

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

export const setUnRead = data => {
  return dispatch => {
    dispatch({
      type: SETUNREAD,
      payload: data
    })
  }
}
export const setUnReadRequest = data => {
  return dispatch => {
    dispatch({
      type: SETUNREADREQUEST,
      payload: data
    })
  }
}
export const setCurrSation = (data) => {
  return dispatch => {
    dispatch({
      type: SETUNREADREQUEST,
      payload: data
    })
  }
}
export const test = (data) => {
  return dispatch => {
    dispatch({ type: SETCONVERSATIONLIST, payload: data  })
  }
}




