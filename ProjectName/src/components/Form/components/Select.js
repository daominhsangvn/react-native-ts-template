import React, {useEffect, useState} from 'react';
import Box from '@components/layouts/Box';
import {mergeStyles} from '@lib/utils/helpers';
import useField from '@components/Form/useField';
import useStyles from '@lib/themes/useStyles';
import Select from '@components/Select';

const _styles = {
  container: {
    flex: 1,
  },
  input: {},
};

const FormSelect = ({style = {}, inputProps = {}, options = [], ...rest}) => {
  const styles = useStyles(_styles);
  const {
    field: {name, onBlur, onChange, ref, value},
    fieldState: {error, invalid, isDirty, isTouched},
    formState: {},
    disabled,
  } = useField();

  const [defaultValue, setDefaultValue] = useState([]);

  useEffect(() => {
    if (!isDirty && value && options) {
      const defaultSelected = options
        .filter(o => value.includes(o.value))
        .map(o => o.value);
      setDefaultValue(defaultSelected);
    }
  }, [isDirty, value, options]);

  return (
    <Box style={mergeStyles(styles.container, style)}>
      <Select
        options={options}
        name={name}
        onChange={onChange}
        value={defaultValue}
        {...rest}
      />
    </Box>
  );
};

export default FormSelect;
