import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import UserReducer from './src/reducers/UserReducer';
import ServiceReducer from './src/reducers/ServiceReducer';

const reducer = combineReducers({
  user: UserReducer,

  services: ServiceReducer
});

const initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware),
);

export default store;
