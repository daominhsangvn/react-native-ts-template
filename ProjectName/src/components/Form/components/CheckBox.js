import React, {useCallback} from 'react';
import Box from '@components/layouts/Box';
import {mergeStyles} from '@lib/utils/helpers';
import useField from '@components/Form/useField';
import CheckBox from '@components/Checkbox';
import useStyles from '@lib/themes/useStyles';
import Text from '@components/Text';
import ThemeStyles from '@configs/themes/styles';
import {TouchableOpacity} from 'react-native';

const _styles = {
  container: {
    flexDirection: 'row',
  },
  input: {},
};

const FormCheckBox = ({style = {}, children}) => {
  const styles = useStyles(_styles);

  const {
    field: {name, onChange, ref, value},
    fieldState: {error, isDirty},
    formState: {},
    disabled,
  } = useField();

  const onPress = useCallback(() => {
    onChange(!value);
  }, [onChange, value]);

  return (
    <Box style={mergeStyles(styles.container, style)}>
      <Box>
        <CheckBox
          name={name}
          ref={ref}
          onChange={onChange}
          disabled={disabled}
          checked={value}
        />
      </Box>
      <TouchableOpacity
        disabled={disabled}
        style={{flexShrink: 1}}
        onPress={onPress}>
        <Text style={mergeStyles(ThemeStyles.checkBoxText)}>{children}</Text>
      </TouchableOpacity>
    </Box>
  );
};

export default FormCheckBox;
