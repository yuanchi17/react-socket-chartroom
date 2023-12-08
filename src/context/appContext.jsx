import _ from 'lodash'
import moment from 'moment'
import { createContext, useContext } from 'react'
import { useImmerReducer } from 'use-immer'

const appContextDefaultValue = {
  activeStep: 0,
  // user: {},
  // otherUsers: [], // { id: '', img: '', name: '', intro: ''}[]
  // msgs: [], // { type: '', time: '', userId: '', text: '' }[]
  // NOTE: Dev Use
  user: { id: 'test', img: 'yCC8VdH', name: 'yuan', intro: '123125645646546546' },
  otherUsers: [
    { id: '0', img: 'yCC8VdH', name: 'test-user-1', intro: '123125645646546546', connect: true },
    {
      id: 'other-user-2',
      img: 'yCC8VdH',
      name: 'test-user-2',
      connect: false,
      intro: '123125645646546546123125645646546546123125645646546546123125645646546546123125645646546546',
    },
    {
      id: '1',
      img: 'yCC8VdH',
      name: 'yuan-1',
      intro: 'asdghhsagd',
      connect: false,
    },
    { id: '2', img: 'yCC8VdH', name: 'yuan', intro: '123125645646546546', connect: false },
    { id: '3', img: 'yCC8VdH', name: 'yuan', intro: '123125645646546546', connect: false },
    { id: '4', img: 'yCC8VdH', name: 'yuan', intro: '123125645646546546', connect: false },
  ],
  msgs: [
    {
      type: 'user',
      time: '17:11',
      userId: '',
      text: 'asdghhsagdud',
    },
    { type: 'other', time: '17:11', userId: '0', text: 'asdghhsagd' },
    { type: 'alert', time: '17:11', userId: '', text: '歡迎 XXX 加入聊天室' },
    { type: 'other', time: '17:11', userId: '0', text: 'lalalala' },
    {
      type: 'other',
      time: '17:11',
      userId: '1',
      text: '123125645646546546123125645646546546123125645646546546123125645646546546123125645646546546',
    },
    {
      type: 'other',
      time: '17:11',
      userId: '1',
      text: '123125645646546546123125645646546546123125645646546546123125645646546546123125645646546546',
    },
  ],
}

const AppContext = createContext(undefined)
AppContext.displayName = 'app-context'

const reducer = (draft, action) => {
  switch (action.type) {
    case 'setUser':
      draft.user = {
        ...draft.user,
        ...action.payload,
      }
      break
    case 'addOtherUser': {
      const newUser = action.payload
      const currentOtherUsers = draft.otherUsers
      if (newUser.id === draft.user.id) return
      if (_.find(currentOtherUsers, ['id', newUser.id])) return // 已經有顯示的成員就不用再新增
      draft.otherUsers.push({ ...newUser, connect: true })
      break
    }
    case 'otherUserLogout':
      draft.otherUsers = draft.otherUsers.map(user => ({
        ...user,
        connect: user.connect ? user.id !== action.payload : false,
      }))
      break
    case 'sendMsg': {
      const user = action.payload.user
      draft.msgs.push({
        text: action.payload.msg,
        time: moment().format('HH:mm'),
        type: action.payload.type,
        userId: user.id,
      })
      break
    }
    case 'sendMsgAlert':
      draft.msgs.push({
        text: action.payload,
        time: moment().format('HH:mm'),
        type: 'alert',
      })
      break
    case 'setActiveStep':
      draft.activeStep = action.payload
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
