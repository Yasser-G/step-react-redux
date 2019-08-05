import React from "react"
import { Provider as ProviderX } from 'react-redux'
import { RootStore, AppPersistor } from "./config";
import { PersistGate } from 'redux-persist/integration/react'

/** 
 * Step Provider
 * @example
 * <Provider loading={<ActivityIndicator />}>
 *   <NavigationContainer />
 * </Provider>
*/
export const Provider = ({ children, loading }) => (
    <ProviderX store={RootStore}>
        <PersistGate
            persistor={AppPersistor}
            loading={loading}
            children={children}
        />
    </ProviderX>
);