import {useState, useEffect, useRef} from 'react';
import {InteractionManager} from 'react-native';

const useAfterInteractions = () => {
  const [areInteractionsComplete, setInteractionsComplete] = useState(false);

  const subscriptionRef = useRef(null);

  const transitionRef = useRef(null);

  useEffect(() => {
    // @ts-ignore
    subscriptionRef.current = InteractionManager.runAfterInteractions(() => {
      // @ts-ignore
      transitionRef.current?.animateNextTransition();
      setInteractionsComplete(true);
      subscriptionRef.current = null;
    });
    return () => {
      // @ts-ignore
      subscriptionRef.current?.cancel();
    };
  }, []);

  return {
    areInteractionsComplete,
    transitionRef,
  };
};

export default useAfterInteractions;
