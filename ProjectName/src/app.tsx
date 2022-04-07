import React from 'react';
import {StatusBar, Text} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {store, persistor} from '@configs/store/config';
import {AuthenticationProvider} from '@features/authentication/components/AuthenticationProvider';
import AppRouter from '@configs/router';
import ThemeProvider from '@lib/themes/provider';
import {DataService} from '@lib/data/dataService';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {LogBox} from 'react-native';
import AlertDialogProvider from '@lib/alertDialog/provider';

LogBox.ignoreLogs([
  'Warning: Failed prop type: Invalid props.style key `placeholderTextColor` supplied to',
]);

DataService.init(store);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading....</Text>} persistor={persistor}>
        <StatusBar hidden barStyle="dark-content" />
        <GestureHandlerRootView style={{flex: 1}}>
          <AuthenticationProvider>
            <ThemeProvider>
              <SafeAreaProvider>
                <AppRouter />
              </SafeAreaProvider>
              <AlertDialogProvider />
            </ThemeProvider>
          </AuthenticationProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

export default App;
