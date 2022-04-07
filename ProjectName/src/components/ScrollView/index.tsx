import React, {useMemo} from 'react';
import {mergeStyles} from '@lib/utils/helpers';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import {BOTTOM_TAB_HEIGHT, HEADER_HEIGHT} from '@configs/themes/var';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ScrollViewProps, StyleProp, ViewStyle} from 'react-native';

interface Props {
  safe?: boolean | string;
  grow?: boolean;
  navbar?: boolean;
  full?: boolean;
  keyboardAvoid?: boolean;
  contentContainerStyle: StyleProp<ViewStyle>;
}

const ScrollView: React.FC<Props & ScrollViewProps> = ({
  contentContainerStyle = {},
  safe = false,
  grow = false,
  navbar = false,
  full = false,
  keyboardAvoid = false,
  children,
  ...props
}) => {
  const insets = useSafeAreaInsets();

  const paddingBottom = useMemo(() => {
    let value =
      insets.bottom +
      parseInt(
        contentContainerStyle.padding?.toString() ||
          contentContainerStyle.paddingBottom?.toString() ||
          contentContainerStyle.paddingHorizontal?.toString() ||
          '0',
        10,
      );

    if (safe === true || safe === 'bottom') {
      value = value + BOTTOM_TAB_HEIGHT;
    }

    return value;
  }, [safe, contentContainerStyle, insets]);

  const paddingTop = useMemo(() => {
    let value = parseInt(
      contentContainerStyle.padding?.toString() ||
        contentContainerStyle.paddingTop?.toString() ||
        contentContainerStyle.paddingVertical?.toString() ||
        '0',
      10,
    );
    if (safe === true || safe === 'top') {
      value = value + insets.top;
    }
    if (navbar) {
      value = value + HEADER_HEIGHT;
    }

    return value;
  }, [
    contentContainerStyle.padding,
    contentContainerStyle.paddingTop,
    contentContainerStyle.paddingVertical,
    safe,
    navbar,
    insets.top,
  ]);

  const contentContainerStyleAll = useMemo(
    () =>
      mergeStyles(
        contentContainerStyle,
        {
          paddingTop,
          paddingBottom,
        },
        grow && {flexGrow: 1},
        full && {minHeight: '100%'},
      ),
    [contentContainerStyle, grow, paddingBottom, paddingTop, full],
  );

  const childrenContent = useMemo(() => {
    if (keyboardAvoid) {
      return (
        <KeyboardAwareScrollView style={{flex: 1}}>
          {children}
        </KeyboardAwareScrollView>
      );
    }
    return children;
  }, [children, keyboardAvoid]);

  return (
    <Animated.ScrollView
      {...props}
      scrollEventThrottle={1}
      contentContainerStyle={contentContainerStyleAll}>
      {childrenContent}
    </Animated.ScrollView>
  );
};

export default ScrollView;
