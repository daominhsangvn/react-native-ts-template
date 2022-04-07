import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import useField from '@components/Form/useField';
import Box from '@components/layouts/Box';
import ActionSheet from '@components/ActionSheet';
import {Image, TextInput, TouchableOpacity} from 'react-native';
import Icon from '@components/Icon';
import Spacer from '@components/layouts/Spacer';
import {remScale} from '@lib/themes/utils';
import ImagePicker from 'react-native-image-crop-picker';
import * as mimeTypes from 'react-native-mime-types';

import Text from '@components/Text';
import Video from '@components/Video';
import Gap from '@components/Gap';
import useStyles from '@lib/themes/useStyles';

const _styles = {
  container: {
    flex: 1,
  },
  button: {
    alignItems: 'center',
    padding: remScale(0.7),
  },
  buttonText: {
    fontWeight: '500',
  },
  imageContainer: {
    width: '100%',
    backgroundColor: '#f6f6f6',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    position: 'relative',
  },
  actionContainer: {
    padding: remScale(1),
  },
};

const FormMedia = ({
  mediaType,
  cropping = false,
  width,
  height,
  previewHeight = 300,
  previewWidth = '100%',
  previewResize = 'contain',
  front = true,
  mime = null,
}) => {
  const styles = useStyles(_styles);
  const {
    field: {name, onChange, ref, value},
    fieldState: {error, isDirty},
    formState: {},
    disabled,
  } = useField();

  const [selectedValue, setSelectedValue] = useState(null);

  const takeActionText = useMemo(() => {
    if (mediaType === 'video') {
      return 'Record Video';
    } else if (mediaType === 'photo') {
      return 'Take Photo';
    } else {
      return 'Take Photo or Record Video';
    }
  }, [mediaType]);

  const placeHolderIcon = useMemo(() => {
    if (mediaType === 'photo') {
      return <Icon name="ios-image-outline" size={40} color="#dddddd" />;
    } else if (mediaType === 'video') {
      return <Icon name="ios-videocam-outline" size={40} color="#dddddd" />;
    } else {
      return (
        <Box style={{flexDirection: 'row'}}>
          <Icon name="ios-image-outline" size={40} color="#dddddd" />
          <Gap h={1} />
          <Icon name="ios-videocam-outline" size={40} color="#dddddd" />
        </Box>
      );
    }
  }, [mediaType]);

  const actionSheetRef = useRef();

  const options = useMemo(() => {
    const result = {
      cropping,
    };

    if (mediaType) {
      result.mediaType = mediaType;
    }

    if (width) {
      result.width = width;
    }

    if (height) {
      result.height = height;
    }

    result.useFrontCamera = front;

    return result;
  }, [mediaType, cropping, width, height, front]);

  const openActionSheet = useCallback(() => {
    actionSheetRef.current?.show();
  }, []);

  const takePhoto = useCallback(() => {
    ImagePicker.openCamera(options)
      .then(result => {
        setSelectedValue(result);
      })
      .catch(e => {})
      .finally(() => {
        actionSheetRef.current?.hide();
      });
  }, [options]);

  const chooseFromLibrary = useCallback(() => {
    ImagePicker.openPicker(options)
      .then(result => {
        setSelectedValue(result);
      })
      .catch(e => {})
      .finally(() => {
        actionSheetRef.current?.hide();
      });
  }, [options]);

  const deleteMedia = useCallback(() => {
    actionSheetRef.current?.hide();
    setSelectedValue(null);
  }, []);

  const edit = useCallback(() => {
    actionSheetRef.current?.show();
  }, []);

  useEffect(() => {
    if (selectedValue) {
      onChange(selectedValue.path);
    } else {
      onChange(null);
    }
  }, [onChange, selectedValue]);

  useEffect(() => {
    if (!isDirty && value) {
      if (mimeTypes.lookup(value) || mimeTypes.lookup(mime)) {
        setSelectedValue({
          mime: mimeTypes.lookup(value) || mimeTypes.lookup(mime),
          path: value,
        });
      } else {
        throw new Error(`Unknown file type ${value}`);
      }
    }
  }, [isDirty, mime, value]);

  return (
    <Box style={styles.container}>
      <TextInput
        name={name}
        ref={ref}
        style={{
          opacity: 0,
          width: 1,
          height: 1,
          position: 'absolute',
        }}
      />
      <TouchableOpacity
        activeOpacity={1}
        onPress={openActionSheet}
        disabled={disabled}
        style={[
          styles.imageContainer,
          {height: previewHeight, width: previewWidth},
        ]}>
        {!selectedValue && placeHolderIcon}
        {!!selectedValue && selectedValue.mime.startsWith('image/') && (
          <Image
            source={{uri: selectedValue.path}}
            style={{height: previewHeight, width: '100%'}}
            resizeMode={previewResize}
          />
        )}
        {!!selectedValue && selectedValue.mime.startsWith('video/') && (
          <Video
            source={{uri: selectedValue.path}}
            height={previewHeight}
            resizeMode={previewResize}
          />
        )}
        {!!selectedValue && !disabled && (
          <TouchableOpacity
            onPress={edit}
            style={{position: 'absolute', top: 10, right: 10}}>
            <Icon
              name="ios-create-outline"
              size={30}
              color="white"
              style={{
                shadowOpacity: 1,
                textShadowRadius: 6, // android
                textShadowOffset: {width: 2, height: 2}, // android
                shadowOffset: {width: 0, height: 0}, // iOS
              }}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      <ActionSheet ref={actionSheetRef}>
        <Spacer style={styles.actionContainer}>
          <TouchableOpacity onPress={takePhoto} style={styles.button}>
            <Text style={styles.buttonText}>{takeActionText}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={chooseFromLibrary} style={styles.button}>
            <Text style={styles.buttonText}>Choose From Library</Text>
          </TouchableOpacity>
          {!!selectedValue && (
            <TouchableOpacity onPress={deleteMedia} style={styles.button}>
              <Text style={[styles.buttonText, {color: 'red'}]}>Remove</Text>
            </TouchableOpacity>
          )}
        </Spacer>
      </ActionSheet>
    </Box>
  );
};

export default FormMedia;
