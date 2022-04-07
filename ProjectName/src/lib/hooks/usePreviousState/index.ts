import {Dispatch, SetStateAction, useState} from 'react';
import {usePrevious} from 'react-use';

function usePreviousState<T>(
  defaultValue: T,
): [T, Dispatch<SetStateAction<T>>, T?] {
  const [value, setValue] = useState<T>(defaultValue);
  const previousValue = usePrevious<T>(value);

  return [value, setValue, previousValue];
}

export default usePreviousState;
