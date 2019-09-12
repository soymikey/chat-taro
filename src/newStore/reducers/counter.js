import {
  SETCONVERSATIONLIST,
  SETUSER
} from '../constants/counter'

const INITIAL_STATE = {
  num: 0,
  user: {}, // 用户基础信息
  transitionName: '', // 页面过渡动画
  conversationsList: [], // 会话列表
  OnlineUser: {}, // 在线人数
  unRead: [], // 未读消息
  currSation: {},
  Vchat: {}, // 官方账号信息
  unReadRequest: []// 未读请求消息
}

export default function counter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SETUSER:
      console.log('action.payload.data', action.payload.data);

      return {
        ...state,
        user: action.payload.data
      }
    case SETCONVERSATIONLIST:
      return {
        ...state,
        conversationsList: action.payload.data
      }
    default:
      return state
  }
}
