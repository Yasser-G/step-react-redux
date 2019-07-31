import { connect as connect_ } from 'react-redux'
import { RootStore } from "./config";

/**
 * State Initializer
 * @example
 * // Top index File before AppRegistry
 * const initialState = { user: { data: {}, loggedIn: false } }
 * setInitialState(initialState)
 * AppRegistry.registerComponent(appName, () => App);
 * @param {object} initialState 
 */
const setInitialState = (initialState: object) => xSetState(initialState)

/**
 * Reset State - Debugging only
 */
const xResetState = () => setStateForKey(null, 'xResetState')
/**
 * X Set State
 * @param {object} state 
 */
const xSetState = (state: object) => {
    if (typeof state == 'object') {
        Object.keys(state).forEach((key) => setStateForKey(state[key], key))
    } else { throw Error('Provided argument is not an object') }
}

/**
    * Get State for Keys and subkeys ("key.subkey")
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
            console.log(`StepReactRedux.${key} not found.`)
            return null
        }
    }
}
const getSubstateForKeys = (mainKey: string, subKey: string) => {
    const mainState = getStateForKey(mainKey)
    if ((mainState) && (subKey in mainState)) {
        return mainState[subKey]
    } else {
        console.log(`StepReactRedux.${mainKey}.${subKey} not found.`)
        return null
    }
}

/**
 * Set State for Keys and subkeys ("key.subkey")
 * @deprecated Use xSetState instead
 */
const setStateForKey = (state: any, key: string) => {
    RootStore.dispatch({ type: key, payload: state })
}

/**
 * React Component Connector HOC
 * @deprecated Use xConnect instead
 */
const connect = (WrappedComponent) => (connect_(({ Khtwah }) => Khtwah)(WrappedComponent));
/**
 *  React Component Connector HOC
 * @param WrappedComponent React Class Component
 */
const xConnect = connect

export {
    connect, xConnect,
    xSetState, xResetState,
    setStateForKey, getStateForKey,
    setInitialState
}