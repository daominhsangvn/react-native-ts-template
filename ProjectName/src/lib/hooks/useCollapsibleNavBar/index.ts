import {
  SharedValue,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {HEADER_HEIGHT} from '@configs/themes/var';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';

interface Props {
  clampBound?: number;
}

const useCollapsibleNavBar: (data?: Props) => {
  scrollHandler: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  scrollY: SharedValue<number>;
  scrollClamp: SharedValue<number>;
} = ({clampBound} = {clampBound: 0}) => {
  const scrollY = useSharedValue(0);
  const scrollClamp = useSharedValue(0);
  const insets = useSafeAreaInsets();

  const diffClamp = (value: number, lowerBound: number, upperBound: number) => {
    'worklet';
    return Math.min(Math.max(lowerBound, value), upperBound);
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event, ctx: {prevY: number}) => {
      let {y} = event.contentOffset;
      if (y < 0) {
        y = 0;
      } else {
        const dy = y - (ctx?.prevY ?? 0);
        scrollClamp.value = diffClamp(
          scrollClamp.value + dy,
          0,
          !clampBound ? HEADER_HEIGHT + insets.top : clampBound,
        );

        // the clamp function always returns a value between 0 and 50
        ctx.prevY = y;
      }

      scrollY.value = event.contentOffset.y;
    },
    onBeginDrag: (event, ctx) => {
      ctx.prevY = event.contentOffset.y;
    },
  });

  return {
    scrollHandler,
    scrollY,
    scrollClamp,
  };
};

export default useCollapsibleNavBar;
