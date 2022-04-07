import React, {useEffect, useMemo} from 'react';
import {Platform, StatusBarStyle} from 'react-native';
import {ThemeSelectors} from '@lib/themes/store';
import {StatusBar, useColorScheme} from 'react-native';
import lightTheme from '@configs/themes/light';
import darkTheme from '@configs/themes/dark';
import {ThemeContext} from './context';
import {COLORS} from '@configs/themes/var';
import useTypedSelector from '@lib/hooks/useTypedSelector';

interface Props {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<Props> = ({children}) => {
  const deviceScheme = useColorScheme();
  const autoTheme = useTypedSelector(ThemeSelectors.selectIsThemeAuto);
  const themeScheme = useTypedSelector(ThemeSelectors.selectThemeScheme);

  const scheme = useMemo<typeof deviceScheme>(() => {
    return autoTheme ? deviceScheme : themeScheme;
  }, [autoTheme, deviceScheme, themeScheme]);

  useEffect(() => {
    if (scheme === 'dark') {
      StatusBar.setBarStyle(
        Platform.select({
          android: 'dark-content',
          ios: 'light-content',
        }) as StatusBarStyle,
      );
    } else {
      StatusBar.setBarStyle(
        Platform.select({
          android: 'light-content',
          ios: 'dark-content',
        }) as StatusBarStyle,
      );
    }
  }, [scheme]);

  // useEffect(() => {
  //   Logger.log('scheme', scheme);
  //   if (scheme === 'dark') {
  //     StatusBar.setBarStyle(
  //       Platform.select({
  //         android: 'dark-content',
  //         ios: 'light-content',
  //       }) as StatusBarStyle,
  //     );
  //   } else {
  //     StatusBar.setBarStyle(
  //       Platform.select({
  //         android: 'light-content',
  //         ios: 'dark-content',
  //       }) as StatusBarStyle,
  //     );
  //   }
  // }, [scheme]);

  return (
    <ThemeContext.Provider
      value={{
        dark: darkTheme,
        light: lightTheme,
        scheme,
        deviceScheme,
        COLORS,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
