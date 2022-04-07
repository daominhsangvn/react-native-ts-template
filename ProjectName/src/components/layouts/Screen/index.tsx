import React, {useMemo} from 'react';
import {mergeStyles} from '@lib/utils/helpers';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import useTheme from '@lib/themes/useTheme';
import useSchemeTransition from '@lib/themes/useSchemeTransition';
import {BOTTOM_TAB_HEIGHT, HEADER_HEIGHT} from '@configs/themes/var';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StyleProp, ViewProps, ViewStyle} from 'react-native';

interface Props {
  safe?: boolean | string;
  navbar?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Screen: React.FC<Props & ViewProps> = ({
  style = {},
  children,
  safe = false,
  navbar = false,
  ...props
}) => {
  const theme = useTheme();
  const {dark, light} = theme;
  const insets = useSafeAreaInsets();
  const {progress} = useSchemeTransition();

  const backgroundStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [light.BACKGROUND.primary, dark.BACKGROUND.primary],
    );

    return {backgroundColor};
  });

  const paddingTop = useMemo(() => {
    let value = parseInt(
      style.padding?.toString() ||
        style.paddingTop?.toString() ||
        style.paddingVertical?.toString() ||
        '0',
      10,
    );
    if (safe) {
      value = value + insets.top;
    }
    if (navbar) {
      value = value + HEADER_HEIGHT;
    }
    return value;
  }, [
    style.padding,
    style.paddingTop,
    style.paddingVertical,
    safe,
    navbar,
    insets.top,
  ]);

  const paddingBottom = useMemo(() => {
    let value =
      insets.bottom +
      parseInt(
        style.padding?.toString() ||
          style.paddingBottom?.toString() ||
          style.paddingHorizontal?.toString() ||
          '0',
        10,
      );

    if (safe === true || safe === 'bottom') {
      value = value + BOTTOM_TAB_HEIGHT;
    }

    return value;
  }, [
    insets.bottom,
    style.padding,
    style.paddingBottom,
    style.paddingHorizontal,
    safe,
  ]);

  return useMemo(
    () => (
      <Animated.View
        style={[
          backgroundStyle,
          ...mergeStyles(
            {flex: 1},
            style,
            (safe === true || safe === 'top') && {paddingTop},
            safe === 'bottom' && {paddingBottom},
            safe === 'both' && {paddingTop, paddingBottom},
          ),
        ]}
        {...props}>
        {children}
      </Animated.View>
    ),
    [backgroundStyle, children, paddingBottom, paddingTop, props, safe, style],
  );
};

export default Screen;
