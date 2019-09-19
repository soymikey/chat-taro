import {
  SETCONVERSATIONLIST,
  SETUSER,
  SETUNREAD,
  SETUNREADREQUEST,
  SETCURRSATION
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
  const { type, payload } = action
  switch (type) {
    case SETUSER:

      return {
        ...state,
        user: payload
      }
    case SETCONVERSATIONLIST:
      return {
        ...state,
        conversationsList: payload
      }
    case SETUNREAD:
      const newUnRead=[... state.unRead]
      console.log('payload',payload)
      if (payload.clear) {
        newUnRead.forEach(v => {
          if (v.roomid === payload.roomid) {
            v.count = 0
          }
        })
        return{ ...state,unRead:newUnRead}
      }

      let unRead = state.unRead.filter(v => v.roomid === payload.roomid)

      if (unRead.length) {
        newUnRead.forEach(v => {
          if (v.roomid === payload.roomid) {
            if (payload.add) {
              v.count++
              v.lastMes = payload.lastMes
            } else {
              v.count = payload.count
              v.lastMes = payload.lastMes
            }
          }
        })
        return{ ...state,unRead:newUnRead}
      } else {
        newUnRead.push({ roomid: payload.roomid, count: payload.count, lastMes: payload.lastMes })

        return  { ...state,unRead:newUnRead}
      }
    case SETUNREADREQUEST:
      if (payload.reset) {
        state.unReadRequest = payload.content
      } else {
        if (Array.isArray(payload.content)) {
          state.unReadRequest = state.unReadRequest.concat(payload.content)
        } else {
          state.unReadRequest.push(payload.content)
        }
      }
      case SETCURRSATION:
          state.currSation = payload

    default:
      return state
  }
}
