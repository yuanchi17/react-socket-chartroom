const moment = require('moment')

const initState = [
  // {
  //   type: 'other',
  //   time: '16:00',
  //   userId: 'm2',
  //   text: '跟你說！我碰到水會長大哦XD',
  // },
  // { type: 'user', time: '16:01', userId: 'm1', text: '真假啦 想看!!!' },
  // { type: 'alter', time: '16:10', text: '歡迎 珊迪 加入聊天室' },
  // {
  //   type: 'other',
  //   time: '16:10',
  //   userId: 'm3',
  //   text: '嗨 珊迪',
  // },
  // {
  //   type: 'other',
  //   time: '16:11',
  //   userId: 'm4',
  //   text: '大家好~~~~',
  // },
]

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
    case 'SEND_ALTER':
      return [
        ...state,
        {
          text: payload.msg,
          time: moment().format('HH:mm'),
          type: 'alter',
        },
      ]
    default:
      return state
  }
}
