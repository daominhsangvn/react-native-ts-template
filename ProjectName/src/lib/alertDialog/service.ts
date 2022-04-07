import {AlertConfigType, AlertDialogRef, IAlertDialogService} from './types';

class Service implements IAlertDialogService {
  _ref: AlertDialogRef | undefined;

  setRef(ref: AlertDialogRef) {
    this._ref = ref;
  }

  show({message, type, promise}: AlertConfigType) {
    if (this._ref?.show) {
      this._ref.show({message, type, promise});
    }
  }
}

const AlertDialogService = new Service();

export default AlertDialogService;
