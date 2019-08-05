import { connect as connectX } from 'react-redux'
import { RootStore } from "./config";

/**
 * State Initializer
 * @deprecated user xSetState instead
 * @example
 * // Top index File before AppRegistry
 * const initialState = { user: { data: {}, loggedIn: false } }
 * // setInitialState(initialState)
 * xSetState(initialState)
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
    } else { throw Error('Provided state is not an object') }
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
        const Khtwah = RootStore.getState()['Khtwah']
        if (key in Khtwah) {
            return Khtwah[key]
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
 * React Component Connector 
 * @param WrappedComponent Class Component 
 * @param {Array<string>} requiredKeys Array Of required keys to be connected.
 */
const connect = (WrappedComponent, requiredKeys: Array<string> = []) => {
    if (typeof WrappedComponent == 'undefined') {
        throw Error("WrappedComponent is required")
    }
    const errorTemplate = (reason: string) => `StepReactRedux.connect\nFailed to connect "${WrappedComponent.name}"\nReason: ${reason}`
    if (!Array.isArray(requiredKeys)) {
        throw Error(errorTemplate("required keys is not an Array"))
    }
    const allStrings = requiredKeys.every((key) => typeof key == 'string')
    if (!allStrings) {
        throw Error(errorTemplate("all required keys should be strings"))
    }
    console.warn('allStrings', allStrings)
    const mstp = ({ Khtwah }) => {
        if (requiredKeys.length == 0) return Khtwah
        const propsToConnect = {}
        requiredKeys.forEach((key) => {
            if (key in Khtwah) { propsToConnect[key] = Khtwah[key] } else {
                throw Error(errorTemplate(`required key "${key}" not found`))
            }
        })
        return propsToConnect
    }
    return connectX(mstp)(WrappedComponent)
};


export {
    connect, xSetState,
    getStateForKey, xResetState,

    // Depreacted
    setStateForKey, setInitialState
}