import moment from 'moment'

const initState = [
  // {
  //   type: 'other',
  //   time: '16:00',
  //   userId: '3e6wMD-FRnBbR60aAAAt',
  //   text: '跟你說！我碰到水會長大哦XD',
  // },
  // { type: 'user', time: '16:01', userId: '000000-FRnBbR60aAAAt', text: '真假啦 想看!!!' },
  // { type: 'alert', time: '16:10', text: '歡迎 珊迪 加入聊天室' },
]

// reducer
export default (state = initState, action) => {
  const payload = action.payload
  switch (action.type) {
    case 'SEND_MSG': {
      const user = payload.user
      return [
        ...state,
        {
          text: payload.msg,
          time: moment().format('HH:mm'),
          type: payload.type,
          userId: user.id,
        },
      ]
    }
    case 'SEND_ALERT':
      return [
        ...state,
        {
          text: payload.msg,
          time: moment().format('HH:mm'),
          type: 'alert',
        },
      ]
    default:
      return state
  }
}
