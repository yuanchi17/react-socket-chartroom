export const SendMsg = msg => ({
  type: 'SEND_MSG',
  payload: { msg },
})

export const SendAlter = msg => ({
  type: 'SEND_ALTER',
  payload: { msg },
})

export const UserLogin = ({ user, id }) => ({
  type: 'USER_LOGIN',
  payload: { ...user, id },
})

export const AddOther = member => ({
  type: 'ADD_OTHER',
  payload: { member },
})
