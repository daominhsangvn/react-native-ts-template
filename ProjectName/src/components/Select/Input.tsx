import React, {useEffect, useMemo} from 'react';
import {Pressable, StyleProp, TextStyle, ViewStyle} from 'react-native';
import useStyles from '@lib/themes/useStyles';
import {mergeStyles} from '@lib/utils/helpers';
import Text from '@components/Text';
import Box from '@components/layouts/Box';
import {remScale} from '@lib/themes/utils';
import usePreviousState from '@lib/hooks/usePreviousState';
import {IOption} from './types';

interface Props {
  onPress: () => void;
  customStyles?: {
    headerText?: TextStyle;
    searchBox?: StyleProp<ViewStyle>;
    searchInput?: TextStyle;
    modal?: StyleProp<ViewStyle>;
    modalContent?: StyleProp<ViewStyle>;
    header?: StyleProp<ViewStyle>;
    list?: StyleProp<ViewStyle>;
    item?: StyleProp<ViewStyle>;
    selected?: StyleProp<ViewStyle>;
    value?: StyleProp<ViewStyle>;
    placeholder?: StyleProp<ViewStyle>;
    inputContainer?: StyleProp<ViewStyle>;
    input?: StyleProp<ViewStyle>;
  };
  placeholder: any;
  selected: string[] | number[];
  multi: boolean;
  options: IOption[];
}

const _styles = {
  container: {},
  input: {
    height: remScale(6),
    justifyContent: 'center',
  },
  placeholder: {
    color: '#cccccc',
  },
  value: {},
};

const Input = React.forwardRef<any, Props>(
  ({onPress, customStyles, placeholder, selected, options, multi}) => {
    const styles = useStyles(_styles);
    const [value, setValue, previousValue] = usePreviousState<
      string[] | number[]
    >([]);

    const valueComponent = useMemo(() => {
      if (value) {
        if (multi) {
          return (
            <Text style={[styles.value, customStyles?.value]}>
              Selected ({value.length})
            </Text>
          );
        } else {
          return (
            <Text style={[styles.value, customStyles?.value]}>{value}</Text>
          );
        }
      } else {
        return (
          <Text style={[styles.placeholder, customStyles?.placeholder]}>
            {placeholder}
          </Text>
        );
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      value,
      multi,
      customStyles?.value,
      customStyles?.placeholder,
      placeholder,
    ]);

    const input = useMemo(() => {
      return (
        <Pressable
          onPress={onPress}
          style={[styles.container, customStyles?.inputContainer]}>
          <Box style={mergeStyles(styles.input, customStyles?.input)}>
            {valueComponent}
          </Box>
        </Pressable>
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      customStyles?.input,
      customStyles?.inputContainer,
      customStyles?.placeholder,
      onPress,
      placeholder,
      valueComponent,
    ]);

    useEffect(() => {
      if (!multi) {
        if (selected.length > 0) {
          const opt = options.find(o => o.value === selected[0]);
          if (opt) {
            setValue([opt.label]);
          } else {
            setValue([]);
          }
        } else {
          setValue([]);
        }
      } else {
        if (selected.length > 0) {
          if (previousValue !== selected) {
            // @ts-ignore
            const opt = options.find(o => selected.includes(o.value));
            if (opt) {
              setValue([opt.label]);
            } else {
              setValue([]);
            }
          }
        } else {
          setValue([]);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [multi, selected]);

    return input;
  },
);

export default Input;
