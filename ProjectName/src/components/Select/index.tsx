import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Box from '@components/layouts/Box';
import useStyles from '@lib/themes/useStyles';
import Input from './Input';
import Modal from './Modal';
// @ts-ignore
import SimpleSelect from './SimpleSelect';
import {IOption, ISimpleSelectRef} from './types';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';

interface Props {
  searchable: boolean;
  options: IOption[];
  renderOption?: (value: {data: IOption; checked: boolean}) => JSX.Element;
  placeholder: string;
  value: any[] | any;
  onChange: (values: any[]) => void;
  multi: boolean;
  customStyles?: {
    headerText?: TextStyle;
    searchBox?: StyleProp<ViewStyle>;
    searchInput?: TextStyle;
    modal?: StyleProp<ViewStyle>;
    modalContent?: StyleProp<ViewStyle>;
    header?: StyleProp<ViewStyle>;
    list?: StyleProp<ViewStyle>;
    item?: StyleProp<ViewStyle>;
    selected?: StyleProp<ViewStyle>;
    value?: StyleProp<ViewStyle>;
    placeholder?: StyleProp<ViewStyle>;
    inputContainer?: StyleProp<ViewStyle>;
    input?: StyleProp<ViewStyle>;
    container?: StyleProp<ViewStyle>;
  };
  itemHeight: number;
  modal: boolean;
  onFilter?: (item: IOption) => boolean;
  name: string;
  hideOnSelect: boolean;
}

const _styles = {
  container: {},
};

const Select = React.forwardRef<any, Props>((props, ref) => {
  const styles = useStyles(_styles);
  const {
    searchable = false,
    options = [],
    renderOption,
    placeholder = '',
    value,
    onChange,
    multi = false,
    customStyles = {},
    itemHeight = 50,
    modal = false,
    onFilter,
    name,
    hideOnSelect = true,
  } = props;

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<any[] | any>([]);
  const pickerRef = useRef<ISimpleSelectRef>();

  const containerStyle = useMemo(
    () => [styles.container, customStyles?.container],
    [customStyles?.container, styles.container],
  );

  const shouldUseModal = useMemo(() => {
    return multi || searchable || modal;
  }, [multi, searchable, modal]);

  const onPress = useCallback(() => {
    if (shouldUseModal) {
      setVisible(true);
    } else {
      pickerRef?.current?.show();
    }
  }, [shouldUseModal]);

  const onUpdate = useCallback(selectedValues => {
    setSelected(selectedValues);
    onChange(selectedValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Array.isArray(value)) {
      setSelected(value);
    } else {
      setSelected([]);
    }
  }, [value]);

  return (
    <Box style={containerStyle}>
      <Input
        onPress={onPress}
        placeholder={placeholder}
        customStyles={customStyles}
        selected={selected}
        multi={multi}
        ref={ref}
        options={options}
      />
      {shouldUseModal && (
        <Modal
          data={options}
          visible={visible}
          setVisible={setVisible}
          customStyles={customStyles}
          multi={multi}
          searchable={searchable}
          itemHeight={itemHeight}
          onChange={onUpdate}
          selected={selected}
          onFilter={onFilter}
          renderOption={renderOption}
          hideOnSelect={hideOnSelect}
        />
      )}
      {!shouldUseModal && (
        <SimpleSelect
          ref={pickerRef}
          onChange={onUpdate}
          value={selected}
          options={options}
          name={name}
        />
      )}
    </Box>
  );
});

export default Select;
