import { persistStore, persistReducer } from 'redux-persist'
import { createStore, combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'

const smart_reducer = (state = {}, action) => {
    const { type: key, payload } = action

    if (key.includes('/')) { return state }
    if (key === 'xResetState') { return {} }

    if (key.includes('.')) {
        const keySplitter = key.split('.', 2)
        const mainKey = keySplitter[0]
        const subKey = keySplitter[1]
        console.log(`StepReactRedux.${mainKey}.${subKey}`, payload)
        return {
            ...state,
            [mainKey]: {
                ...state[mainKey],
                [subKey]: payload
            }
        }
    } else {
        console.log(`StepReactRedux.${key}`, payload)
        return { ...state, [key]: payload }
    }
}

const reducers = combineReducers({ Step: smart_reducer })
const persistConfig = { key: 'Step', storage, whitelist: ['Step'] }
const persistedReducer = persistReducer(persistConfig, reducers)
export const RootStore = createStore(persistedReducer)
export const AppPersistor = persistStore(RootStore)