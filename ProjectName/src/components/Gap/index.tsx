import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {mergeStyles} from '@lib/utils/helpers';
import {remScale} from '@lib/themes/utils';

interface Props {
  w?: number;
  h?: number;
  style?: StyleProp<ViewStyle>;
}

const Gap: React.FC<Props> = ({w, h, style}) => {
  return (
    <View
      style={mergeStyles(
        w && {width: remScale(w)},
        h && {height: remScale(h)},
        style,
      )}
    />
  );
};

export default Gap;
