import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Platform,
  Modal as RNModal,
  Dimensions,
  Pressable,
  TextInput,
  ViewStyle,
  TextStyle, StyleProp,
} from 'react-native';
import Box from '@components/layouts/Box';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import BigList from 'react-native-big-list';
import {remScale} from '@lib/themes/utils';
import {fontWeight} from '@lib/utils/fonts';
import useStyles from '@lib/themes/useStyles';
import Item from '@components/Select/Item';
import Text from '@components/Text';
import useRefState from '@lib/hooks/useRefState';
import Icon from '@components/Icon';
import {useDebounce} from 'react-use';
import usePreviousState from '@lib/hooks/usePreviousState';
import {IOption} from '@components/Select/types';

interface Props {
  visible: boolean;
  setVisible: (value: boolean) => void;
  onChange: (values: string[] | number[]) => void;
  customStyles?: {
    headerText?: TextStyle;
    searchBox?: StyleProp<ViewStyle>;
    searchInput?: TextStyle;
    modal?: StyleProp<ViewStyle>;
    modalContent?: StyleProp<ViewStyle>;
    header?: StyleProp<ViewStyle>;
    list?: StyleProp<ViewStyle>;
    item?: StyleProp<ViewStyle>;
    selected?: StyleProp<ViewStyle>;
  };
  multi?: boolean;
  itemHeight: number;
  selected: string[] | number[];
  data: IOption[];
  searchable?: boolean;
  onFilter?: (item: IOption) => boolean;
  renderOption?: (value: {data: IOption; checked: boolean}) => JSX.Element;
  hideOnSelect?: boolean;
}

const {height} = Dimensions.get('window');

const _styles = {
  container: {},
  modal: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    ...Platform.select({
      android: {
        paddingTop: remScale(2),
      },
    }),
  },
  modalContent: {
    backgroundColor: 'white',
    flex: 1,
    borderTopRightRadius: remScale(2),
    borderTopLeftRadius: remScale(2),
  },
  header: {
    padding: remScale(2),
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
    backgroundColor: '#f6f6f6',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,
    //
    // elevation: 2,
    // borderTopRightRadius: remScale(2),
    // borderTopLeftRadius: remScale(2),
  },
  headerText: {
    ...fontWeight('600'),
    color: '#0085e5',
  },
  list: {
    flex: 1,
  },
  value: {
    color: '#424242',
  },
  searchBox: {
    backgroundColor: 'white',
    paddingHorizontal: remScale(1),
    marginTop: remScale(2),
    borderRadius: remScale(1),
  },
  searchInput: {
    flex: 1,
    height: remScale(6),
    ...fontWeight('400'),
    color: '#3f3f3f',
    fontSize: remScale(2),
    paddingVertical: 0,
    paddingHorizontal: remScale(1),
  },
};

const TRANSITION_DURATION = 200;

const Modal: React.FC<Props> = ({
  visible,
  setVisible,
  onChange,
  customStyles,
  multi,
  itemHeight,
  selected = [],
  data = [],
  searchable,
  onFilter,
  renderOption,
  hideOnSelect,
}) => {
  const styles = useStyles(_styles);
  const [selectedValues, setSelectedValues, selectedValuesRef] = useRefState<
    any[]
  >([]);
  const active = useSharedValue(false);
  const isAndroid = useSharedValue(Platform.OS === 'android');
  const [searchValue, setSearchValue, previousSearchValue] =
    usePreviousState('');
  const [keywords, setKeywords] = useState('');
  useDebounce(
    () => {
      setSearchValue(keywords);
    },
    500,
    [keywords],
  );
  const [filterResult, setFilterResult] = useState<any[]>(data);

  const modalContentAnimationStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: !isAndroid.value
          ? 0
          : active.value
          ? withTiming(0, {duration: TRANSITION_DURATION})
          : withTiming(height, {duration: TRANSITION_DURATION}),
      },
    ],
    opacity: !isAndroid.value
      ? 1
      : active.value
      ? withTiming(1, {duration: TRANSITION_DURATION})
      : withTiming(0, {duration: TRANSITION_DURATION}),
  }));

  const close = useCallback((cb?: () => void) => {
    if (Platform.OS === 'android') {
      active.value = false;
    }
    setTimeout(() => {
      setVisible(false);
      cb && cb();
    }, Platform.select({android: TRANSITION_DURATION, ios: 0}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClose = useCallback(() => {
    close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onConfirm = useCallback(() => {
    close(() => onChange(selectedValuesRef.current));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onShow = useCallback(() => {
    if (Platform.OS === 'android') {
      active.value = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSelect = useCallback(
    (item: IOption) => {
      let newSelectedValues = [item.value];
      if (multi) {
        newSelectedValues = [...selectedValuesRef.current];
        if (newSelectedValues.includes(item.value)) {
          // existed
          newSelectedValues = newSelectedValues.filter(s => s !== item.value);
        } else {
          newSelectedValues.push(item.value);
        }
      }

      // setSelectedOptions(data.filter(o => newSelectedValues.includes(o.value)));
      setSelectedValues(newSelectedValues);

      if (hideOnSelect) {
        onConfirm();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [multi, hideOnSelect],
  );

  const renderItem = useCallback(
    (dt: {item: IOption}) => {
      return (
        <Item
          data={dt.item}
          onPress={onSelect}
          customStyles={customStyles}
          checked={selectedValues.includes(dt.item.value)}
          renderOption={renderOption}
        />
      );
    },
    [onSelect, customStyles, selectedValues, renderOption],
  );

  const cancelButton = useMemo(
    () => (
      <Box>
        <Pressable onPress={onClose}>
          <Text style={[styles.headerText, customStyles?.headerText]}>
            Cancel
          </Text>
        </Pressable>
      </Box>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [customStyles?.headerText],
  );

  const confirmButton = useMemo(
    () => (
      <Box>
        <Pressable onPress={onConfirm}>
          <Text style={[styles.headerText, customStyles?.headerText]}>
            Confirm
          </Text>
        </Pressable>
      </Box>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [customStyles?.headerText, onConfirm],
  );

  const selectedCount = useMemo(
    () => (
      <Box flex center>
        <Pressable>
          <Text style={[styles.headerText, customStyles?.headerText]}>
            Selected ({selectedValues.length})
          </Text>
        </Pressable>
      </Box>
    ),
    [customStyles?.headerText, selectedValues.length, styles.headerText],
  );

  const keyExtractor = useCallback(item => item.value, []);

  const list = useMemo(() => {
    return (
      <BigList
        data={filterResult}
        renderItem={renderItem}
        itemHeight={itemHeight}
        keyExtractor={keyExtractor}
      />
    );
  }, [filterResult, renderItem, itemHeight, keyExtractor]);

  const clearSearch = useCallback(() => {
    setKeywords('');
  }, []);

  const clearButton = useMemo(() => {
    return (
      <Pressable onPress={clearSearch}>
        <Icon name="close-outline" color={'#858585'} size={remScale(3)} />
      </Pressable>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilter = useCallback(
    (dt: IOption) => {
      if (onFilter) {
        return onFilter(dt);
      }
      return dt.label.toLowerCase().includes(keywords.toLowerCase());
    },
    [keywords, onFilter],
  );

  const searchComponent = useMemo(() => {
    if (!searchable) {
      return null;
    }
    return (
      <Box
        row
        items="center"
        style={[styles.searchBox, customStyles?.searchBox]}>
        <Icon name="search-outline" color={'#858585'} size={remScale(3)} />
        <TextInput
          value={keywords}
          onChangeText={setKeywords}
          style={[styles.searchInput, customStyles?.searchInput]}
          placeholder="Search value"
          placeholderTextColor={'#dcdcdc'}
        />
        {keywords.length !== 0 && clearButton}
      </Box>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    searchable,
    keywords,
    customStyles?.searchBox,
    customStyles?.searchInput,
  ]);

  useEffect(() => {
    const _selectedValues = data
      // @ts-ignore
      .filter(o => selected.includes(o.value))
      .map(o => o.value);
    setSelectedValues(_selectedValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, data]);

  useEffect(() => {
    if (searchable) {
      if (!!searchValue && searchValue !== previousSearchValue) {
        const searchResult = data.filter(handleFilter);
        setFilterResult(searchResult);
      } else {
        setFilterResult(data);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, data, handleFilter, searchable]);

  return (
    <RNModal
      animationType={Platform.select({android: 'fade', ios: 'slide'})}
      {...Platform.select({
        ios: {presentationStyle: 'formSheet'},
        android: {transparent: true},
      })}
      onShow={onShow}
      visible={visible}>
      <Box style={[styles.modal, customStyles?.modal]}>
        <Animated.View
          style={[
            modalContentAnimationStyle,
            styles.modalContent,
            customStyles?.modalContent,
          ]}>
          <Box style={[styles.header, customStyles?.header]}>
            <Box row>
              {cancelButton}
              {selectedCount}
              {confirmButton}
            </Box>
            {searchComponent}
          </Box>
          <Box style={[styles.list, customStyles?.list]}>{list}</Box>
        </Animated.View>
      </Box>
    </RNModal>
  );
};

export default Modal;
