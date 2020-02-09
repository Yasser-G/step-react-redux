import { persistStore, persistReducer } from 'redux-persist';
import { createStore, combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { stateSetter } from './depth';

const smart_reducer = (state = {}, action) => stateSetter(state, action.type, action.payload);
const reducers = combineReducers({ Step: smart_reducer });
const persistConfig = { key: 'Step', storage, whitelist: ['Step'] };
const persistedReducer = persistReducer(persistConfig, reducers);
export const RootStore = createStore(persistedReducer);
export const AppPersistor = persistStore(RootStore);
