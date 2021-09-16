exports.SendMsg = msg => ({
  type: 'SEND_MSG',
  payload: { msg },
})

exports.SendAlter = msg => ({
  type: 'SEND_ALTER',
  payload: { msg },
})

exports.UserLogin = ({ user, id }) => ({
  type: 'USER_LOGIN',
  payload: { ...user, id },
})

exports.AddOther = member => ({
  type: 'ADD_OTHER',
  payload: { member },
})
