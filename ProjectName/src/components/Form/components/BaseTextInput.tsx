import React, {useCallback, useMemo} from 'react';
import {TextInput, TextInputProps, TouchableOpacity} from 'react-native';
import {mergeStyles} from '@lib/utils/helpers';
import useSchemeValue from '@lib/themes/useSchemeValue';
import Box from '@components/layouts/Box';
import Icon from '@components/Icon';
import Button from '@components/Button';
import useToggle from '@lib/hooks/useToggle';
import useStyles from '@lib/themes/useStyles';
import ThemeStyles from '@configs/themes/styles';
import {TThemeContext} from '@lib/themes/context';

interface Props {
  theme?: TThemeContext;
  secure?: boolean;
  clearable?: boolean;
  onClear?: () => void;
  disabled?: boolean;
  onPress?: () => void;
}

const _styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    padding: 0,
    ...ThemeStyles.input,
  },
};

const FormBaseInput = React.forwardRef<TextInput, Props & TextInputProps>(
  (
    {
      style = {},
      secure = false,
      clearable = true,
      onClear,
      disabled,
      onPress,
      ...props
    },
    ref,
  ) => {
    const styles = useStyles(_styles);
    const {open, toggle} = useToggle(secure);
    const inputTextColor = useSchemeValue<string>('INPUT.text');
    const inputIconColor = useSchemeValue<string>('INPUT.icon');
    const placeholderTextColor = useSchemeValue<string>('INPUT.placeholder');

    const toggleIcon = useMemo(() => {
      if (open) {
        return (
          <Icon
            name="eye-off-outline"
            {...ThemeStyles.form_trailing_icon}
            color={inputIconColor}
          />
        );
      }
      return (
        <Icon
          name="eye-outline"
          {...ThemeStyles.form_trailing_icon}
          color={inputIconColor}
        />
      );
    }, [inputIconColor, open]);

    const handleClear = useCallback(() => {
      if (onClear) {
        onClear();
      }
    }, [onClear]);

    const baseInput = useMemo(() => {
      return (
        <TextInput
          {...props}
          ref={ref}
          placeholderTextColor={placeholderTextColor}
          style={mergeStyles(styles.input, {color: inputTextColor}, style)}
          secureTextEntry={open}
        />
      );
    }, [
      props,
      ref,
      placeholderTextColor,
      styles.input,
      inputTextColor,
      style,
      open,
    ]);

    const input = useMemo(() => {
      if (onPress) {
        return (
          <TouchableOpacity
            style={{flex: 1}}
            disabled={disabled}
            onPress={onPress}>
            {baseInput}
          </TouchableOpacity>
        );
      }
      return <Box flex>{baseInput}</Box>;
    }, [baseInput, disabled, onPress]);

    const clearBtn = useMemo(() => {
      if (!clearable || !props.value) {
        return null;
      }
      return (
        <Button
          color="transparent"
          onPress={handleClear}
          style={[{padding: 0}, ThemeStyles.input_clear_btn]}>
          <Icon
            name="ios-close"
            {...ThemeStyles.form_trailing_icon}
            color={inputIconColor}
          />
        </Button>
      );
    }, [clearable, props.value, handleClear, inputIconColor]);

    return (
      <Box style={styles.container}>
        {input}
        {clearBtn}
        {secure && (
          <Button
            color="transparent"
            onPress={toggle}
            style={[{padding: 0}, ThemeStyles.input_secure_onoff_btn]}>
            {toggleIcon}
          </Button>
        )}
      </Box>
    );
  },
);

export default FormBaseInput;
