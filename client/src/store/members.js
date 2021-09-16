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
    case 'ADD_OTHER':
      return {
        ...state,
        other: [
          ...state.other,
          action.payload.member,
        ],
      }
    default:
      return state
  }
}
