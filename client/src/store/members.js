const _ = require('lodash')

const initState = {
  // user: {
  //   id: 'm1',
  //   img: 'yCC8VdH',
  //   name: '琦怪欸',
  //   intro: '如果你很開心你就拍拍手！',
  // },
  user: {},
  other: [],
}

export default (state = initState, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return {
        ...state,
        user: {
          img: _.sample(['yCC8VdH', 'Xee8Yda', 'ZelpWqC', 'ysk042a']),
          ...action.payload,
        },
      }
    case 'ADD_OTHER': {
      const members = action.payload.member
      if (_.find(state.other, ['id', members.id])) return state // 已經有顯示的成員就不用再新增
      return {
        ...state,
        other: [
          ...state.other,
          { ...action.payload.member, connect: true },
        ],
      }
    }
    case 'LEAVE_OTHER':
      return {
        ...state,
        other: state.other.map(member => ({
          ...member,
          connect: member.id !== action.payload.id,
        })),
      }
    default:
      return state
  }
}
