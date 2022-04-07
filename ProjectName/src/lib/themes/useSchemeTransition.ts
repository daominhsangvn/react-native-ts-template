import {useDerivedValue, withTiming} from 'react-native-reanimated';
import {INTERPOLATE_COLOR_DURATION} from '@configs/themes/var';
import useTheme from '@lib/themes/useTheme';

const useSchemeTransition = () => {
  const {scheme} = useTheme();

  const progress = useDerivedValue(() => {
    return scheme === 'dark'
      ? withTiming(1, {duration: INTERPOLATE_COLOR_DURATION})
      : withTiming(0, {duration: INTERPOLATE_COLOR_DURATION});
  });

  return {progress};
};

export default useSchemeTransition;
