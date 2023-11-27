import _ from 'lodash'
import moment from 'moment'
import { createContext, useContext } from 'react'
import { useImmerReducer } from 'use-immer'

const appContextDefaultValue = {
  user: {},
  otherUsers: [
    // { id: '', img: '', name: '', intro: ''}
  ],
  msgs: [
    // { type: '', time: '', userId: '', text: '' },
  ],
}

const AppContext = createContext(undefined)
AppContext.displayName = 'app-context'

const reducer = (draft, action) => {
  switch (action.type) {
    case 'userLogin':
      draft.user = action.payload
      break
    case 'addOtherUser':
      const newUser = action.payload
      const currentOtherUsers = draft.otherUsers
      if (newUser.id === draft.user.id) return 
      if (_.find(currentOtherUsers, ['id', newUser.id])) return  // 已經有顯示的成員就不用再新增
      draft.otherUsers.push({ ...newUser, connect: true })
      break
    case 'otherUserLogout':
      draft.otherUsers = draft.otherUsers.map(user => ({
        ...user,
        connect: user.connect ? user.id !== action.payload : false,
      }))
      break
    case 'sendMsg':
      const user = action.payload.user
      draft.msgs.push({
        text: action.payload.msg,
        time: moment().format('HH:mm'),
        type: action.payload.type,
        userId: user.id,
      })
      break
    case 'sendMsgAlert':
      draft.msgs.push({
        text: action.payload,
        time: moment().format('HH:mm'),
        type: 'alert',
      })
      break
  }
}

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useImmerReducer(reducer, appContextDefaultValue)

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useApp = () => {
  const context = useContext(AppContext)
  if (context === undefined) throw new Error('useApp must be used within a AppContextProvider')
  return context
}

// eslint-disable-next-line react-refresh/only-export-components
export { AppContext, AppContextProvider, appContextDefaultValue, useApp }

