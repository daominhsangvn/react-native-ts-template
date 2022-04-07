import React, {useMemo} from 'react';
import Box from '@components/layouts/Box';
import Text from '@components/Text';
import {mergeStyles} from '@lib/utils/helpers';
import useSchemeValue from '@lib/themes/useSchemeValue';
import {remScale} from '@lib/themes/utils';
import {Path, useController, UseControllerProps} from 'react-hook-form';
import useStyles from '@lib/themes/useStyles';
import ThemeStyles from '@configs/themes/styles';
import {StyleProp, ViewProps, ViewStyle} from 'react-native';
import {Control} from 'react-hook-form/dist/types/form';

interface Props<T> {
  control: Control<T>;
  name: Path<T>;
  disabled?: boolean;
  label?: string;
  leading?: JSX.Element;
  trailing?: JSX.Element;
  containerStyle?: StyleProp<ViewStyle>;
  borderless?: boolean;
  noPadding?: boolean;
  children: JSX.Element;
}

const _styles = {
  container: {},
  label: {},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    ...ThemeStyles.form_field,
  },
  errorContainer: {
    ...ThemeStyles.form_error_container,
  },
  errorText: {
    ...ThemeStyles.form_error_message,
  },
};

function FormField<T>({
  control,
  name,
  disabled = false,
  label,
  leading,
  trailing,
  containerStyle = {},
  borderless = false,
  noPadding = false,
  children,
}: Props<T> & ViewProps) {
  const controller = useController<T>({
    control,
    name,
  });

  const {
    fieldState: {error, isDirty},
  } = controller;

  const styles = useStyles(_styles);

  const borderColor = useSchemeValue<string>('INPUT.border');
  const validBorderColor = useSchemeValue<string>('INPUT.border_valid');
  const borderErrorColor = useSchemeValue<string>('INPUT.border_error');
  const labelColor = useSchemeValue<string>('INPUT.label');
  const labelErrorColor = useSchemeValue<string>('INPUT.label_error');
  const hintErrorColor = useSchemeValue<string>('INPUT.hint_error');
  const inputIconColor = useSchemeValue<string>('INPUT.icon');

  const renderLeading = useMemo(() => {
    if (leading) {
      return (
        <Box style={[ThemeStyles.form_leading]}>
          {React.cloneElement(leading, {
            color: inputIconColor,
            ...ThemeStyles.form_trailing_icon,
          })}
        </Box>
      );
    }
    return null;
  }, [leading, inputIconColor]);

  const renderTrailing = useMemo(() => {
    if (trailing) {
      return (
        <Box style={[ThemeStyles.form_trailing]}>
          {React.cloneElement(trailing, {
            color: inputIconColor,
            ...ThemeStyles.form_trailing_icon,
          })}
        </Box>
      );
    }
    return null;
  }, [trailing, inputIconColor]);

  return (
    <Box style={styles.container} pointerEvents={disabled ? 'none' : 'auto'}>
      {label && (
        <Box style={styles.label}>
          <Text style={{color: error ? labelErrorColor : labelColor}}>
            {label}
          </Text>
        </Box>
      )}
      <Box
        style={mergeStyles(
          styles.inputContainer,
          {
            borderColor: error
              ? borderErrorColor
              : isDirty && !error
              ? validBorderColor
              : borderColor,
          },
          !trailing && !noPadding && {paddingRight: remScale(2)},
          !leading && !noPadding && {paddingLeft: remScale(2)},
          borderless && {borderWidth: 0},
          containerStyle,
        )}>
        {renderLeading}
        {React.cloneElement(children, {name, control})}
        {renderTrailing}
      </Box>
      {error && (
        <Box style={[styles.errorContainer]}>
          <Text style={[styles.errorText, {color: hintErrorColor}]}>
            {error.message}
          </Text>
        </Box>
      )}
    </Box>
  );
}

export default FormField;
