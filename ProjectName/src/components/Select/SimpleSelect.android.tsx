import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import {Picker} from '@react-native-picker/picker';
import {windowWidth} from '@lib/utils/helpers';
import useRefState from '@lib/hooks/useRefState';
import useSchemeValue from '@lib/themes/useSchemeValue';
import {IOption, ISimpleSelectRef} from '@components/Select/types';
import {ISelectColor} from '@configs/themes/types';

interface Props {
  value: any;
  onChange: (items: any[]) => void;
  options: IOption[];
  color: string;
}

const SimpleSelect = React.forwardRef<ISimpleSelectRef, Props>((props, ref) => {
  const {value, onChange, options, color = 'primary'} = props;
  const pickerRef = useRef<Picker<any> | null>(null);

  const [selectedValue, setSelectedValue] = useRefState(value);
  const [, setInitial, initialRef] = useRefState(true);
  const selectColor = useSchemeValue<ISelectColor>(`SELECT.${color}`, true);

  const show = useCallback(() => {
    if (initialRef.current) {
      setInitial(false);
    }
    pickerRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChange = useCallback(
    selectedItemValue => {
      if (!initialRef.current) {
        onChange([selectedItemValue]);
        setSelectedValue(selectedItemValue);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onChange, setSelectedValue],
  );

  useImperativeHandle(ref, () => {
    return {
      show,
    };
  });

  useEffect(() => {
    if (value) {
      setSelectedValue(value[0]);
    } else {
      setSelectedValue(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Picker
      ref={pickerRef}
      onValueChange={handleOnChange}
      mode="dialog"
      selectedValue={selectedValue}
      style={{position: 'absolute', left: windowWidth + 100}}>
      {options.map(op => (
        <Picker.Item
          label={op.label}
          value={op.value}
          key={op.value}
          color={
            selectedValue === op.value
              ? selectColor.selected.text
              : selectColor.text
          }
        />
      ))}
    </Picker>
  );
});

export default SimpleSelect;
