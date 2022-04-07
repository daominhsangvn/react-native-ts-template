import {MutableRefObject, useCallback, useRef, useState} from 'react';

function useRefState<T>(
  initialValue: any,
): [any, Function, MutableRefObject<any>] {
  const [state, setState] = useState<T>(initialValue);
  const stateRef = useRef(state);

  const _setState = useCallback(newSate => {
    stateRef.current = newSate;
    setState(newSate);
  }, []);

  // useEffect(() => {
  //   stateRef.current = state;
  // }, [state]);

  return [state, _setState, stateRef];
}
//
// const useRefState: (
//   initialValue: any,
// ) => [any, Function, MutableRefObject<any>] = (initialValue: any) => {
//   const [state, setState] = useState(initialValue);
//   const stateRef = useRef(state);
//
//   const _setState = useCallback(newSate => {
//     stateRef.current = newSate;
//     setState(newSate);
//   }, []);
//
//   // useEffect(() => {
//   //   stateRef.current = state;
//   // }, [state]);
//
//   return [state, _setState, stateRef];
// };

export default useRefState;
