import React, {useCallback, useEffect, useState} from 'react';
import {TextInput, TouchableOpacity} from 'react-native';
import Box from '@components/layouts/Box';
import {mergeStyles} from '@lib/utils/helpers';
import useField from '@components/Form/useField';
import CheckBox from '@components/Checkbox';
import useStyles from '@lib/themes/useStyles';
import Text from '@components/Text';
import ThemeStyles from '@configs/themes/styles';
import {remScale} from '@lib/themes/utils';

const _styles = {
  container: {},
  input: {},
  choiceContainer: {
    ...ThemeStyles.choice_container,
  },
  choice: {
    ...ThemeStyles.choice,
  },
  row: {
    marginBottom: remScale(1),
    flexDirection: 'row',
  },
};

const FormChoices = ({style = {}, options, textStyle = {}, cols = 1}) => {
  const styles = useStyles(_styles);

  const {
    field: {name, onBlur, onChange, ref, value},
    fieldState: {error, invalid, isDirty, isTouched},
    formState: {},
    disabled,
  } = useField();

  const [selectedValue, setSelectedValue] = useState(null);

  const onValueChange = useCallback(
    (checked, selectedItem) => {
      if (disabled) {
        return;
      }

      if (!checked) {
        setSelectedValue(null);
        onChange(null);
      } else {
        setSelectedValue(selectedItem);
        onChange(selectedItem);
      }
    },
    [disabled, onChange],
  );

  useEffect(() => {
    if (!isDirty && value !== null && typeof value !== 'undefined' && options) {
      const itemIndex = options.findIndex(o => o.value === value);
      if (itemIndex !== -1) {
        setSelectedValue(options[itemIndex].value);
      }
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
        <Box key={`choices-${op.value}-${idx}`} style={styles.row}>
          <Box>
            <CheckBox
              onChange={onValueChange}
              disabled={disabled}
              checked={selectedValue === op.value}
              value={op.value}
              icon={<Box />}
              customStyles={{
                container: styles.choiceContainer,
                checkbox: styles.choice,
              }}
            />
          </Box>
          <TouchableOpacity
            disabled={disabled}
            onPress={() => onValueChange(selectedValue !== op.value, op.value)}
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

export default FormChoices;
