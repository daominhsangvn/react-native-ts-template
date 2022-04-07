import {ILazyPromise} from '@lib/utils/LazyPromise';

export type AlertType = 'error' | 'success' | 'warning';

export type AlertConfigType = {
  type: AlertType;
  message: string;
  promise?: ILazyPromise<any>;
};

export interface IAlertDialogService {
  setRef: (ref: AlertDialogRef) => void;
  show: (data: AlertConfigType) => void;
}

export interface AlertDialogRef {
  show?: (data: AlertConfigType) => void;
}
