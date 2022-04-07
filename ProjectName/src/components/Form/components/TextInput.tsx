import React, {useCallback} from 'react';
import Box from '@components/layouts/Box';
import FormBaseInput from './BaseTextInput';
import {mergeStyles} from '@lib/utils/helpers';
import useStyles from '@lib/themes/useStyles';
import {StyleProp, TextInputProps, TextStyle, ViewStyle} from 'react-native';
import {Path, useController} from 'react-hook-form';
import {Control} from 'react-hook-form/dist/types/form';

interface Props<T> {
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  secure?: boolean;
  control?: Control<T>;
  name?: Path<T>;
}

const _styles = {
  container: {
    flex: 1,
  },
};

function FormTextInput<T>({
  style = {},
  inputStyle = {},
  control,
  name,
  ...props
}: Props<T> & TextInputProps) {
  const styles = useStyles(_styles);

  const controller = useController<T>({
    control,
    name: name as Path<T>,
  });

  const {
    field: {onChange, ref, value},
    // fieldState: {error},
    // formState: {},
  } = controller;

  const onClear = useCallback(() => {
    onChange('');
  }, [onChange]);

  return (
    <Box style={mergeStyles(styles.container, style)}>
      <FormBaseInput
        style={mergeStyles(styles.input, inputStyle)}
        onChangeText={onChange}
        onClear={onClear}
        value={value as string}
        ref={ref}
        {...props}
      />
    </Box>
  );
}

export default FormTextInput;
