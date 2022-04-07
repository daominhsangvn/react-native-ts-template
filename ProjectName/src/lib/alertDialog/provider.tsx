import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Modal, View} from 'react-native';
import Alert from './Alert';
import AlertDialogService from './service';
import {AlertConfigType, AlertDialogRef} from '@lib/alertDialog/types';
import {ILazyPromise} from '@lib/utils/LazyPromise';

const AlertDialogProvider = React.forwardRef(() => {
  const [visible, setVisible] = useState<boolean>(false);
  const [config, setConfig] = useState<AlertConfigType>({
    type: 'error',
    message: '',
  });
  const promise = useRef<ILazyPromise<any> | undefined>(undefined);
  const alertRef = useRef<AlertDialogRef>({});

  const handleCancelAlert = () => {
    // @ts-ignore
    promise.current?.resolve();
    setVisible(false);
  };

  const AlertComponent = useMemo(() => {
    return (
      <Modal animationType="fade" transparent={true} visible={visible}>
        <Alert config={config} onPress={handleCancelAlert} />
      </Modal>
    );
  }, [visible, config]);

  const show = useCallback((cfg: AlertConfigType) => {
    promise.current = cfg.promise;
    setConfig({
      type: cfg.type,
      message: cfg.message,
    });
    setVisible(true);
  }, []);

  useEffect(() => {
    alertRef.current = {
      show,
    };

    AlertDialogService.setRef(alertRef.current);
  }, [show]);

  return <View>{AlertComponent}</View>;
});

export default AlertDialogProvider;
