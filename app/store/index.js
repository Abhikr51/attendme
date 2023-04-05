//Packages
import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux';
import ReduxThunk from 'redux-thunk';
//Reducers
import AuthReducer from './reducers/AuthReducer';
import ConfigReducer from './reducers/ConfigReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  config: ConfigReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;
