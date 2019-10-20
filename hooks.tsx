import { useSelector, useStore } from 'react-redux'

const useStepSubState = (mainKey, subKey) => {
    const mainState = useStepState(mainKey)
    if ((mainState) && (subKey in mainState)) {
        return mainState[subKey]
    } else {
        console.log(`StepReactRedux.${mainKey}.${subKey} not found.`)
        return null
    }
}

const useStepState = (key) => {
    if (typeof key != 'string') { throw Error("useStepState: Givin key must be string!") }

    if (key.includes('.')) {
        const keySplitter = key.split('.', 2)
        const mainKey = keySplitter[0]
        const subKey = keySplitter[1]
        return useStepSubState(mainKey, subKey)
    } else {
        const store = useStore()
        const Step = store.getState()['Step']
        if (key in Step) {
            return useSelector(({ Step }) => Step[key])
        } else {
            console.log(`StepReactRedux.${key} not found.`)
            return null
        }
    }
}

export { useStepState }