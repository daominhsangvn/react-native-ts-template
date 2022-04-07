import React, {useCallback, useMemo} from 'react';
import useStyles from '@lib/themes/useStyles';
import Box from '@components/layouts/Box';
import Text from '@components/Text';
import Icon from '@components/Icon';
import {remScale} from '@lib/themes/utils';
import {Pressable, StyleProp, TextStyle, ViewStyle} from 'react-native';
import {mergeStyles} from '@lib/utils/helpers';
import {IOption} from './types';

interface Props {
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
  };
  checked: boolean;
  onPress: (value: IOption) => void;
  data: IOption;
  renderOption?: (value: {data: IOption; checked: boolean}) => JSX.Element;
}

const _styles = {
  container: {
    padding: remScale(2),
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8',
  },
  selected: {
    backgroundColor: '#edf9ff',
  },
};

const Item: React.FC<Props> = ({
  customStyles,
  checked,
  onPress,
  data,
  renderOption,
}) => {
  const styles = useStyles(_styles);

  const press = useCallback(() => {
    onPress(data);
  }, [data, onPress]);

  const containerStyle = useMemo(
    () =>
      mergeStyles(
        styles.container,
        customStyles?.item,
        checked && {
          ...styles.selected,
          ...customStyles?.selected,
        },
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [customStyles?.item, customStyles?.selected, checked],
  );

  const children = useMemo(() => {
    if (renderOption) {
      return renderOption({data, checked});
    }
    return (
      <Box row items="center">
        <Box flex>
          <Text>{data.label}</Text>
        </Box>
        {checked && (
          <Box>
            <Icon
              name="checkmark-outline"
              size={remScale(3)}
              color={'#00a2ff'}
            />
          </Box>
        )}
      </Box>
    );
  }, [checked, data, renderOption]);

  return (
    <Pressable style={containerStyle} onPress={press}>
      {children}
    </Pressable>
  );
};

export default Item;
