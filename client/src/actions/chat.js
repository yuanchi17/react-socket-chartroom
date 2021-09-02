exports.SendMsg = msg => ({
  type: 'SEND_MSG',
  payload: { msg },
})

exports.UserLogin = ({ name, intro }) => ({
  type: 'USER_LOGIN',
  payload: { name, intro },
})
