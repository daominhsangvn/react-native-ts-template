import useTheme from '@lib/themes/useTheme';

const useCustomSchemeColor = (
  lightColor: string,
  darkColor: string,
  system = false,
): string => {
  const {scheme, deviceScheme} = useTheme();

  if (system) {
    return deviceScheme === 'dark' ? darkColor : lightColor;
  }

  return scheme === 'dark' ? darkColor : lightColor;
};

export default useCustomSchemeColor;
