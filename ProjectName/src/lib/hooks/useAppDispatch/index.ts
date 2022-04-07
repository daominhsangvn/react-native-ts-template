import {useDispatch} from 'react-redux';
import {TAppDispatch} from '@configs/store/config';

const useTypedDispatch = () => useDispatch<TAppDispatch>();

export default useTypedDispatch;
