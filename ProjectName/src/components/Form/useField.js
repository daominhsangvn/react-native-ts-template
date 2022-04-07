import React, {useContext} from 'react';
import {FormFieldContext} from '@components/Form/FieldContext';

const useField = () => {
  const fieldContext = useContext(FormFieldContext);

  return {
    ...fieldContext,
  };
};

export default useField;
