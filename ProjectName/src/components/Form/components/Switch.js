import React from 'react';
import Box from '@components/layouts/Box';
import {mergeStyles} from '@lib/utils/helpers';
import useField from '@components/Form/useField';
import Switch from '@components/Switch';
import useStyles from '@lib/themes/useStyles';
import Text from '@components/Text';
import ThemeStyles from '@configs/themes/styles';

const _styles = {
  container: {
    flexDirection: 'row',
  },
  input: {},
};

const FormSwitch = ({style = {}, children}) => {
  const styles = useStyles(_styles);

  const {
    field: {name, onChange, ref, value},
    fieldState: {error, isDirty},
    formState: {},
    disabled,
  } = useField();

  return (
    <Box style={mergeStyles(styles.container, style)}>
      <Box style={{flexShrink: 1, flex: 1}}>
        <Text style={mergeStyles(ThemeStyles.switchText)}>{children}</Text>
      </Box>
      <Box>
        <Switch
          name={name}
          ref={ref}
          onChange={onChange}
          disabled={disabled}
          checked={value}
        />
      </Box>
    </Box>
  );
};

export default FormSwitch;
