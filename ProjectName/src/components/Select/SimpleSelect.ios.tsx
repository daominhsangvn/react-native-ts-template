import React, {
  useCallback,
  useRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import BottomSheet, {IBottomSheetRef} from '@components/BottomSheet';
import {Picker} from '@react-native-picker/picker';
import useRefState from '@lib/hooks/useRefState';
import useSchemeValue from '@lib/themes/useSchemeValue';
import Box from '@components/layouts/Box';
import useStyles from '@lib/themes/useStyles';
import {IOption, ISimpleSelectRef} from './types';
import {ISelectColor} from '@configs/themes/types';

interface Props {
  value: any;
  onChange: (items: any[]) => void;
  options: IOption[];
  color: string;
}

const _styles = {
  container: {height: 200},
};

const SimpleSelect = React.forwardRef<ISimpleSelectRef, Props>((props, ref) => {
  const styles = useStyles(_styles);
  const {value, onChange, options, color = 'primary'} = props;
  const actionSheetRef = useRef<IBottomSheetRef>();

  const [selectedValue, setSelectedValue] = useRefState<any>(value);

  const selectColor = useSchemeValue<ISelectColor>(`SELECT.${color}`);

  const handleOnChange = useCallback(
    selectedItemValue => {
      onChange([selectedItemValue]);
      setSelectedValue(selectedItemValue);
    },
    [onChange, setSelectedValue],
  );

  const show = useCallback(() => {
    actionSheetRef.current?.open();
  }, []);

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
    <BottomSheet ref={actionSheetRef}>
      <Box style={styles.container}>
        <Picker onValueChange={handleOnChange} selectedValue={selectedValue}>
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
      </Box>
    </BottomSheet>
  );
});

SimpleSelect.displayName = 'SimpleSelect';

export default SimpleSelect;
