import React from 'react';
import { Provider as ProviderX } from 'react-redux';
import { RootStore, AppPersistor } from './config';
import { PersistGate } from 'redux-persist/integration/react';
import { xSetState, getStateForKey } from './methods';

const stateInitalizer = (initialState) => {
    const didInit = getStateForKey('didInit');
    if (!didInit) { xSetState({ ...initialState, didInit: true }); }
};

/**
 * Step React Redux Provider
 * @example
 * const myInitialState = {
 *    // initial state
 * }
 * <Provider
 *  initialState={myInitialState}
 *  loading={
 *  // your loading UI *
 *  }
 *  >
 *   <App />
 * </Provider>
 * @param {object} initialState
*/
export const Provider = ({
    initialState = {},
    loading,
    children,
}) => {
    stateInitalizer(initialState);
    return (
        React.createElement(ProviderX, { store: RootStore },
            React.createElement(PersistGate, {
                persistor: AppPersistor,
                loading: loading,
                children: children
            }))
    );
};
