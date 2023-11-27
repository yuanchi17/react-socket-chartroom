export const SendMsg = obj => ({
  type: 'SEND_MSG',
  payload: obj,
})

export const Sendalert = msg => ({
  type: 'SEND_ALERT',
  payload: { msg },
})

export const AddOther = member => ({
  type: 'ADD_OTHER',
  payload: { member },
})

export const DelOther = id => ({
  type: 'LEAVE_OTHER',
  payload: { id },
})
