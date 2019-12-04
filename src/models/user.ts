import { Effect } from 'dva';
import { Reducer } from 'redux';
import { queryUser, login, getMenu } from '@/service/api'
import router from 'umi/router';
import { message } from 'antd';

export interface UserInfo {
  avatar?: string
  name?: string
  userId?: number
  signature?: string
  group?: string
}


export interface UserState {
  userInfo?: UserInfo
  menu?: []
}

export interface userModelType {
  namespace: string
  state: UserState
  effects: {
    fetch?: Effect,
    login?: Effect,
    getCaptcha?: Effect
    getMenu?: Effect
  }
  reducers: {
    save?: Reducer,
    saveMenu?: Reducer
  }
}

const userModel: userModelType = {
  namespace: "user",

  state: {
    userInfo: {
    },
    menu: []
  },

  effects: {
    *fetch({ props }, { call, put }) {
      const response = yield call(queryUser)
      const { status, msg, data } = response
      if (status === 200) {
        yield put({
          type: "save",
          payload: data
        })
        return true
      } else {
        message.error("登录超时！")
        router.push('/user/login')
        return false
      }
    },
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload)
      const { status, msg, data } = response
      if (status === 200) {
        window.localStorage.setItem('wtoken', data.Authority)
        router.push('/')
        message.success("登录成功")
      } else {
        message.error("账号密码错误")
      }
    },
    *getCaptcha({ payload }, { call, put }) {

    },
    *getMenu(_, { call, put }) {
      const response = yield call(getMenu)
      const { data } = response
      yield put({
        type: "saveMenu",
        payload: data
      })
    }
  },
  reducers: {
    save(state, action) {
      state.userInfo = {
        ...state.userInfo,
        ...action.payload
      }
      return state
    },
    saveMenu(state, action) {
      state.menu = action.payload
      return state
    }
  }
}

export default userModel