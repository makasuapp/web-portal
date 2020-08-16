import { reducer as FormReducer } from 'redux-form'
import {combineReducers} from 'redux';
import {ApiReducer} from "app/common/duck/reducers";

const reducers = combineReducers({
  api: ApiReducer,
  form: FormReducer
});

export default reducers;
export type ReduxState = ReturnType<typeof reducers>
