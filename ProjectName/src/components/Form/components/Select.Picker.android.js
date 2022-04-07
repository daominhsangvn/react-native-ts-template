import React, {useCallback, useImperativeHandle, useRef} from 'react';
import {Picker} from '@react-native-picker/picker';
import {windowWidth} from '@lib/utils/helpers';
import useTheme from '@lib/themes/useTheme';
import {COLORS} from '@configs/themes/var';

const SelectPicker = React.forwardRef((props, ref) => {
  const {value, onChange, options} = props;
  const pickerRef = useRef();

  const {scheme} = useTheme();

  const show = useCallback(() => {
    pickerRef.current?.focus();
  }, []);

  useImperativeHandle(ref, () => {
    return {
      show,
    };
  });

  return (
    <Picker
      ref={pickerRef}
      onValueChange={onChange}
      mode="dialog"
      selectedValue={value}
      style={{position: 'absolute', left: windowWidth + 100}}>
      {options.map(op => (
        <Picker.Item
          label={op.label}
          value={op.value}
          key={op.value}
          color={
            value === op.value
              ? COLORS.primary
              : scheme === 'dark'
              ? 'white'
              : 'black'
          }
        />
      ))}
    </Picker>
  );
});

export default SelectPicker;
