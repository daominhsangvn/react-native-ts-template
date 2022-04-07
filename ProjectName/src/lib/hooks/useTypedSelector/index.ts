import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {TRootState} from '@configs/store/root.reducer';

const useTypedSelector: TypedUseSelectorHook<TRootState> = useSelector;

export default useTypedSelector;
