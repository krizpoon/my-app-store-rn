/**
 * A simple app-listing app
 *
 * @format
 * @flow
 */

import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import { Provider } from 'react-redux';
import { AppListScreen } from './components/app-list-screen';
import { ReadyGate } from './components/ready-gate';
import configureStore from './redux/store';

const store = configureStore();

const App: () => React$Node = () => {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <ReadyGate>
                    <AppListScreen />
                </ReadyGate>
            </ThemeProvider>
        </Provider>
    );
};

export default App;
