import {useMemo} from 'react';
import useTheme from '@lib/themes/useTheme';
import get from 'lodash/get';

function useSchemeValue<T>(path: string, system = false): T {
  const {scheme, deviceScheme} = useTheme();
  const {light, dark} = useTheme();

  const currentScheme = useMemo(() => {
    if (system) {
      return deviceScheme;
    }
    return scheme;
  }, [deviceScheme, scheme, system]);

  return currentScheme === 'dark' ? get(dark, path) : get(light, path);
}

export default useSchemeValue;
