import {useCallback, useState} from 'react';

interface Props {
  open: boolean;
  toggle: () => void;
}

const useToggle = (defaultValue: boolean): Props => {
  const [open, setOpen] = useState(defaultValue);
  const toggle = useCallback(() => {
    setOpen(!open);
  }, [open]);
  return {open, toggle};
};
export default useToggle;
