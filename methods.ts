import { connect as connect_ } from 'react-redux'
import { RootStore } from "./config";

/**
 * State Initializer
 * @example
 * const myInitialState = { user: { data: {}, loggedIn: false } }
 * setInitialState(myInitialState)
 * @param {object} initialState 
 */
const setInitialState = (initialState = {}) => {
    const initializedState = getStateForKey('initializedState')
    if (!initializedState) {
        xSetState(initialState)
        setStateForKey(true, 'initializedState')
    }
}

/**
 * X Clear State
 */
const xClearState = () => setStateForKey(null, 'xClearState')

/**
 * X Set State
 * @param {object} state 
 */
const xSetState = (state: object) => {
    Object.keys(state).forEach((key) => setStateForKey(state[key], key))
}

/**
    * Get State for Keys and subkeys (key.subkey)
    * @example 
    * // Get userData Object (key)
    * const userData = getStateForKey('userData')
    * 
    * // Get user's name from userData Object (Subkey)
    * const userName = getStateForKey('userData.name')
    * @param {string} key Key for required state
 */
const getStateForKey = (key: string) => {
    if (key.includes('.')) {
        const keySplitter = key.split('.', 2)
        const mainKey = keySplitter[0]
        const subKey = keySplitter[1]
        return getSubstateForKeys(mainKey, subKey)
    } else {
        const currentState = RootStore.getState()['Khtwah']
        if (key in currentState) {
            return currentState[key]
        } else {
            console.log(`Key "${key}" not found.`)
            return null
        }
    }
}
const getSubstateForKeys = (mainKey: string, subKey: string) => {
    const mainState = getStateForKey(mainKey)
    if ((mainState) && (subKey in mainState)) {
        return mainState[subKey]
    } else {
        console.log(`Key "${mainKey}.${subKey}" not found.`)
        return null
    }
}

/**
 * Set State for Keys and subkeys ("key.subkey")
 * @deprecated
 * @param state 
 * @param key 
 */
const setStateForKey = (state: any, key: string) => {
    RootStore.dispatch({ type: key, payload: state })
}

/**
 *  React Component Connector HOC
 * @param WrappedComponent React Class Component
 */
const connect = (WrappedComponent) => (connect_(({ Khtwah }) => Khtwah)(WrappedComponent));

export {
    connect, xSetState, xClearState,
    setStateForKey, getStateForKey,
    setInitialState
}