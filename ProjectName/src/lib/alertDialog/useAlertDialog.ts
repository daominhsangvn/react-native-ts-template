import LazyPromise from '@lib/utils/LazyPromise';
import AlertDialogService from '@lib/alertDialog/service';

interface IUserAlertDialog {
  showError: (message: string) => Promise<any>;
  showSuccess: (message: string) => Promise<any>;
  showWarning: (message: string) => Promise<any>;
}

const useAlertDialog = (): IUserAlertDialog => {
  const showError = (message: string) => {
    const promise = new LazyPromise<any>();

    AlertDialogService.show({
      message,
      type: 'error',
      promise,
    });

    return promise.deferred;
  };

  const showSuccess = (message: string) => {
    const promise = new LazyPromise<any>();

    AlertDialogService.show({
      message,
      type: 'success',
      promise,
    });

    return promise.deferred;
  };

  const showWarning = (message: string) => {
    const promise = new LazyPromise<any>();

    AlertDialogService.show({
      message,
      type: 'warning',
      promise,
    });

    return promise.deferred;
  };

  return {showError, showSuccess, showWarning};
};

export default useAlertDialog;
