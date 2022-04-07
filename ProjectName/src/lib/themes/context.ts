import React from 'react';
import {TThemeColor} from '@configs/themes/types';
import {ColorSchemeName} from 'react-native';
import light from '@configs/themes/light';
import dark from '@configs/themes/dark';

export interface TThemeContext {
  dark: TThemeColor;
  light: TThemeColor;
  scheme: ColorSchemeName;
  deviceScheme: ColorSchemeName;
  COLORS: {[key: string]: string};
}

export const ThemeContext = React.createContext<TThemeContext>({
  deviceScheme: 'light',
  scheme: 'light',
  COLORS: {},
  light,
  dark,
});
