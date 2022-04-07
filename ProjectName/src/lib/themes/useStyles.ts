import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import useTheme from '@lib/themes/useTheme';

const useStyles = (styles: Function | object) => {
  const theme = useTheme();
  return useMemo(() => {
    return StyleSheet.create(
      typeof styles === 'function' ? styles(theme) : styles,
    );
  }, [styles, theme]);
};

export default useStyles;
