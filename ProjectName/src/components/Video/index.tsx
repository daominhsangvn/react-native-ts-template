import React, {useCallback, useEffect, useRef, useState} from 'react';
import {createThumbnail} from 'react-native-create-thumbnail';
import ImageResizer from 'react-native-image-resizer';
import VideoPlayer from 'react-native-video-player';
import {mergeStyles} from '@lib/utils/helpers';
import {StyleProp, TouchableWithoutFeedback, View, ViewStyle} from 'react-native';

interface Props {
  paused?: boolean;
  style?: StyleProp<ViewStyle>;
  height?: number;
  source?: {
    uri: string;
  } | null;
}

const Video: React.FC<Props> = ({
  paused = true,
  style,
  height = 300,
  source,
}) => {
  const unmountRef = useRef(false);
  const [thumbnail, setThumbnail] = useState('');
  const [isPaused, setIsPaused] = useState(paused);

  const play = useCallback(() => {
    setIsPaused(!isPaused);
  }, [isPaused]);

  useEffect(() => {
    if (source) {
      createThumbnail({
        url: source.uri,
      })
        .then(response => {
          if (!unmountRef.current) {
            ImageResizer.createResizedImage(
              response.path,
              400,
              400,
              'JPEG',
              100,
              0,
              undefined,
              false,
              {onlyScaleDown: true},
            )
              .then(res => {
                if (!unmountRef.current) {
                  setThumbnail(res.uri);
                }
              })
              .catch(() => {});
          }
        })
        .catch(() => {});

      return () => {
        setThumbnail('');
        setIsPaused(true);
      };
    }
  }, [source]);

  useEffect(() => {
    unmountRef.current = false;

    return () => {
      unmountRef.current = true;
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={play}>
      <View
        style={mergeStyles(
          {
            height,
            width: '100%',
          },
          style,
        )}>
        <VideoPlayer
          video={{uri: source?.uri}}
          autoplay={false}
          thumbnail={{uri: thumbnail ? thumbnail : undefined}}
          style={{height}}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Video;
