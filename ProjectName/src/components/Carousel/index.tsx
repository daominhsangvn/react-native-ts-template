import React, {useCallback, useMemo, useRef} from 'react';
import {Dimensions, ListRenderItem, View} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Indicator from './Indicator';
import Box from '@components/layouts/Box';
import Item from './Item';

interface Props<T> {
  data: any[];
  item_size: number;
  renderItem: ListRenderItem<T>;
  middle: boolean;
  indicator: boolean;
}

interface ICarousel {
  Item: typeof Item;
}

const {width} = Dimensions.get('window');

const Carousel: React.FC<Props<any>> & ICarousel = ({
  data,
  item_size,
  renderItem,
  middle,
  indicator = true,
}) => {
  const scrollX = useSharedValue(0);
  const position = useSharedValue(0);
  const spacer = useRef((width - item_size) / 2);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
      position.value = event.contentOffset.x / width;
    },
  });

  const _renderItem = useCallback(
    (input: any) => {
      const {item} = input;
      if (['left-spacer', 'right-spacer'].includes(item.key)) {
        return <View style={{width: spacer.current, height: 1}} />;
      }
      return renderItem(input);
    },
    [renderItem],
  );

  const _data = useMemo(() => {
    if (middle) {
      return [{key: 'left-spacer'}, ...data, {key: 'right-spacer'}];
    }
    return data;
  }, [middle, data]);

  return (
    <Box>
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={_data}
        keyExtractor={item => item.key}
        horizontal
        contentContainerStyle={{alignItems: 'center'}}
        snapToInterval={item_size}
        decelerationRate={0.9}
        bounces={false}
        renderItem={_renderItem}
        onScroll={scrollHandler}
      />
      {indicator && (
        <Box center row>
          {data.map((_: any, i: number) => (
            <Indicator key={i} position={position} index={i} />
          ))}
        </Box>
      )}
    </Box>
  );
};

Carousel.Item = Item;

export default Carousel;
