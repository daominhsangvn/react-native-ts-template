import React, {useMemo} from 'react';
import {mergeStyles} from '@lib/utils/helpers';
import {StyleProp, View, ViewProps, ViewStyle} from 'react-native';

interface Props {
  center?: boolean;
  flex?: boolean | number;
  row?: boolean;
  col?: boolean;
  right?: boolean;
  style?: StyleProp<ViewStyle>;
  items?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'start'
    | 'end'
    | 'left'
    | 'right';
  justify?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'start'
    | 'end'
    | 'left'
    | 'right';
  children?: typeof React.Component | boolean | Element | null | void;
}

const Box = React.forwardRef<any, Props & ViewProps>(
  ({center, flex, row, col, right, style, items, justify, ...rest}, ref) => {
    const _styles = useMemo(
      () =>
        mergeStyles(
          typeof flex !== 'undefined' && {
            flex: Number.isInteger(flex) ? flex : 1,
          },
          center && !col && {alignItems: 'center', justifyContent: 'center'},
          row && {flexDirection: 'row'},
          col && {flexDirection: 'column'},
          center && col && {alignItems: 'center'},
          right && {alignItems: 'flex-end'},
          items && {alignItems: items},
          justify && {justifyContent: justify},
          style,
        ),
      [center, col, flex, items, justify, right, row, style],
    );
    return <View {...rest} ref={ref} style={_styles} />;
  },
);

export default Box;
