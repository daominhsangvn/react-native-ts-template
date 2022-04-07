import React, {useMemo} from 'react';
import {mergeStyles} from '@lib/utils/helpers';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import {BOTTOM_TAB_HEIGHT, HEADER_HEIGHT} from '@configs/themes/var';
import {FlatListProps, ViewStyle} from 'react-native';

interface Props {
  safe: boolean | string;
  grow: boolean;
  navbar: boolean;
}

function FlatList<T>({
  contentContainerStyle = {},
  safe,
  grow,
  navbar,
  ...props
}: Props & FlatListProps<T>): JSX.Element {
  const insets = useSafeAreaInsets();

  const paddingBottom = useMemo(() => {
    const {
      padding,
      paddingBottom: pB,
      paddingHorizontal,
    } = contentContainerStyle as ViewStyle;
    let value =
      insets.bottom +
      parseInt(
        padding?.toString() ||
          pB?.toString() ||
          paddingHorizontal?.toString() ||
          '0',
        10,
      );

    if (safe === true || safe === 'bottom') {
      value = value + BOTTOM_TAB_HEIGHT;
    }

    return value;
  }, [safe, contentContainerStyle, insets]);

  const paddingTop = useMemo(() => {
    const {
      padding,
      paddingTop: pT,
      paddingVertical,
    } = contentContainerStyle as ViewStyle;

    let value = parseInt(
      padding?.toString() ||
        pT?.toString() ||
        paddingVertical?.toString() ||
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
  }, [contentContainerStyle, safe, navbar, insets.top]);

  const contentStyle = useMemo(
    () =>
      mergeStyles(
        contentContainerStyle,
        {
          paddingTop,
          paddingBottom,
        },
        grow && {flexGrow: 1},
      ),
    [contentContainerStyle, grow, paddingBottom, paddingTop],
  );

  return (
    <Animated.FlatList
      {...props}
      scrollEventThrottle={1}
      contentContainerStyle={contentStyle}
    />
  );
}

export default FlatList;
