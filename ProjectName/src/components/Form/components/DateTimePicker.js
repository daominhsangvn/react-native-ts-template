import React, {useCallback, useMemo} from 'react';
import {isDate, toFullDate, toShortDate, toTime} from '@lib/utils/helpers';
import {remScale} from '@lib/themes/utils';
import Box from '@components/layouts/Box';
import useToggle from '@lib/hooks/useToggle';
import RNDatePicker from 'react-native-date-picker';
import FormBaseInput from '@components/Form/components/BaseTextInput';
import useField from '@components/Form/useField';
import useStyles from '@lib/themes/useStyles';
import useSchemeValue from '@lib/themes/useSchemeValue';

const _styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  eyeIcon: {
    paddingLeft: remScale(0.4),
    paddingRight: remScale(0.4),
  },
};

const FormDateTimePicker = ({
  style = {},
  inputProps = {},
  placeholder = '',
  clearable = true,
  color = 'primary',
  ...rest
}) => {
  const styles = useStyles(_styles);

  const {
    field: {name, onBlur, onChange, ref, value},
    fieldState: {error, invalid, isDirty, isTouched},
    formState: {},
    disabled,
  } = useField();

  const dateTimePickerColor = useSchemeValue(`DATETIMEPICKER.${color}`, true);

  const formattedValue = useMemo(() => {
    if (value && isDate(value)) {
      if (rest.mode === 'date') {
        return toShortDate(value);
      } else if (rest.mode === 'time') {
        return toTime(value);
      } else {
        return toFullDate(value);
      }
    } else {
      return '';
    }
  }, [value, rest.mode]);

  const today = useMemo(() => new Date(), []);

  const pickerValue = useMemo(() => {
    return isDate(value) ? value : today;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const {open, toggle} = useToggle(false);

  const onConfirm = useCallback(
    data => {
      toggle();
      onChange(data);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [toggle],
  );

  const onCancel = useCallback(() => {
    toggle();
  }, [toggle]);

  const clear = useCallback(() => {
    onChange(null);
  }, []);

  const onPress = useCallback(() => {
    if (disabled) {
      return;
    }
    toggle();
  }, [toggle, disabled]);

  return (
    <Box style={styles.container}>
      <Box style={{flex: 1}}>
        <FormBaseInput
          {...inputProps}
          onPress={onPress}
          onClear={clear}
          pointerEvents="none"
          placeholder={placeholder}
          name={name}
          ref={ref}
          value={formattedValue}
          editable={false}
          disabled={disabled}
        />
      </Box>
      <RNDatePicker
        modal
        mode="datetime"
        open={open}
        date={pickerValue}
        onConfirm={onConfirm}
        onCancel={onCancel}
        textColor={dateTimePickerColor.text}
        title={null}
        {...rest}
      />
    </Box>
  );
};

export default FormDateTimePicker;
