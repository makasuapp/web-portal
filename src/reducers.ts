import { reducer as FormReducer } from 'redux-form'
import { combineReducers } from 'redux'
import { ApiReducer } from './app/common/duck/reducers'
import AuthReducer from './app/auth/duck/reducers'

const reducers = combineReducers({
  api: ApiReducer,
  auth: AuthReducer,
  form: FormReducer,
})

export default reducers
export type ReduxState = ReturnType<typeof reducers>
