import React, {useState} from 'react';
import {LayoutChangeEvent} from 'react-native';

interface Layout {
  height: number;
  width: number;
  measured: boolean;
}

const useLayout: (
  defaultHeight?: number,
  callback?: (data: Layout) => void,
) => [Layout, ((event: LayoutChangeEvent) => void) | undefined] = (
  defaultHeight = 0,
  callback,
) => {
  const [layout, setLayout] = useState<Layout>({
    height: defaultHeight,
    width: 0,
    measured: false,
  });

  const onLayout = React.useCallback(
    e => {
      const {height, width} = e.nativeEvent.layout;

      if (height === layout.height && width === layout.width) {
        return;
      }

      setLayout({
        height,
        width,
        measured: true,
      });

      if (callback) {
        callback({
          height,
          width,
          measured: true,
        });
      }
    },
    [callback, layout.height, layout.width],
  );

  return [layout, onLayout];
};

export default useLayout;
