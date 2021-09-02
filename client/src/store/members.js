const initState = {
  // user: {
  //   id: 'm1',
  //   img: 'yCC8VdH',
  //   name: '琦怪欸',
  //   intro: '如果你很開心你就拍拍手！',
  // },
  user: {},
  other: [
    { id: 'm2', img: 'Xee8Yda', name: '海綿寶寶', intro: '我是海綿' },
    {
      id: 'm3',
      img: 'ZelpWqC',
      name: '派大星',
      intro: '想體驗被石頭壓扁的感覺嗎',
    },
    {
      id: 'm4',
      img: 'ysk042a',
      name: '珊迪',
      intro: '好想在水裡可以不用戴著魚缸生活哦QQ',
    },
  ],
}

export default (state = initState, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return {
        ...state,
        user: {
          id: 'm1',
          img: 'yCC8VdH',
          ...action.payload,
        },
      }
    default:
      return state
  }
}
