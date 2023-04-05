//Packages
import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux';
import ReduxThunk from 'redux-thunk';
//Reducers
import AuthReducer from './reducers/AuthReducer';
import CategoryReducer from './reducers/CategoryReducer';
import ConfigReducer from './reducers/ConfigReducer';
import LocationReducer from './reducers/LocationReducer';
import StoreReducer from './reducers/StoreReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  categories: CategoryReducer,
  merchant_stores: StoreReducer,
  config: ConfigReducer,
  location: LocationReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;
