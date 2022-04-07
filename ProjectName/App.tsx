/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import App from './src/app';
import {enableFreeze} from 'react-native-screens';

enableFreeze(true);

let Root = () => {
  return <App />;
};

export default Root;
