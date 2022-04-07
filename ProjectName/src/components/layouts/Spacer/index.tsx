import React from 'react';
import {View, ViewProps} from 'react-native';
import {remScale} from '@lib/themes/utils';

interface Props {
  spacing?: number;
}

const Spacer: React.FC<Props & ViewProps> = ({
  children,
  spacing = 1,
  ...rest
}) => {
  return (
    <View {...rest}>
      {Array.isArray(children) && spacing > 0
        ? React.Children.map(children, (child, idx) => {
            if (child && idx === children.length - 1) {
              return React.cloneElement(child);
            } else if (child) {
              return (
                <>
                  {React.cloneElement(child)}
                  {!!children[idx + 1] && (
                    <View style={{height: remScale(spacing)}} />
                  )}
                </>
              );
            }
          })
        : children}
    </View>
  );
};

export default Spacer;
