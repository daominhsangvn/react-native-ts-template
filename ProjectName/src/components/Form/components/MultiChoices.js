import React, {useCallback, useEffect} from 'react';
import {TextInput, TouchableOpacity} from 'react-native';
import Box from '@components/layouts/Box';
import {mergeStyles} from '@lib/utils/helpers';
import useField from '@components/Form/useField';
import CheckBox from '@components/Checkbox';
import useStyles from '@lib/themes/useStyles';
import Text from '@components/Text';
import ThemeStyles from '@configs/themes/styles';
import {remScale} from '@lib/themes/utils';
import useRefState from '@lib/hooks/useRefState';

const _styles = {
  container: {},
  input: {},
  row: {
    marginBottom: remScale(1),
    flexDirection: 'row',
  },
};

const FormMultiChoices = ({style = {}, options, textStyle = {}, cols = 1}) => {
  const styles = useStyles(_styles);

  const {
    field: {name, onBlur, onChange, ref, value},
    fieldState: {error, invalid, isDirty, isTouched},
    formState: {},
    disabled,
  } = useField();

  const [selectedValue, setSelectedValue, selectedValueRef] = useRefState([]);

  const onValueChange = useCallback(
    (checked, selectedItem) => {
      if (disabled) {
        return;
      }

      let newSelected = [...selectedValueRef.current];

      if (checked) {
        newSelected.push(selectedItem);
      } else {
        newSelected = newSelected.filter(s => s !== selectedItem);
      }

      setSelectedValue(newSelected);
      onChange(newSelected);
    },
    [disabled, onChange],
  );

  useEffect(() => {
    if (!isDirty && value !== null && typeof value !== 'undefined' && options) {
      const defaultSelected = options
        .filter(o => value.includes(o.value))
        .map(o => o.value);
      setSelectedValue(defaultSelected);
    }
  }, [isDirty, options, value]);

  return (
    <Box style={mergeStyles(styles.container, style)}>
      <TextInput
        name={name}
        ref={ref}
        style={{
          opacity: 0,
          width: 1,
          height: 1,
          position: 'absolute',
        }}
      />
      {options.map((op, idx) => (
        <Box key={`multi-${op.value}-${idx}`} style={styles.row}>
          <Box>
            <CheckBox
              onChange={onValueChange}
              disabled={disabled}
              checked={selectedValue.includes(op.value)}
              value={op.value}
            />
          </Box>
          <TouchableOpacity
            disabled={disabled}
            onPress={() =>
              onValueChange(!selectedValue.includes(op.value), op.value)
            }
            style={{flexShrink: 1}}>
            <Text style={mergeStyles(ThemeStyles.checkBoxText, textStyle)}>
              {op.label}
            </Text>
          </TouchableOpacity>
        </Box>
      ))}
    </Box>
  );
};

export default FormMultiChoices;
