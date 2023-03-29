import _ from 'lodash'

const initState = {
  user: {},
  other: [
    // {
    //   id: '3e6wMD-FRnBbR60aAAAt',
    //   img: 'yCC8VdH',
    //   name: '琦怪欸',
    //   intro: '如果你很開心你就拍拍手！',
    // }
  ],
}

// reducer
export default (state = initState, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return {
        ...state,
        user: action.payload,
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
          connect: member.connect ? member.id !== action.payload.id : false,
        })),
      }
    default:
      return state
  }
}
