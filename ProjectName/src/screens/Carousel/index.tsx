import React from 'react';
import Screen from '@components/layouts/Screen';
import Gap from '@components/Gap';
import NavBar from '@components/NavBar';
import Carousel from '@components/Carousel';
import {Dimensions, Image} from 'react-native';
import Box from '@components/layouts/Box';
import ScrollView from '@components/ScrollView';

const {width} = Dimensions.get('window');

const CarouselScreen = ({navigation}) => {
  return (
    <Screen safe navbar>
      <NavBar title="Carousel Demo" />
      <ScrollView>
        <Gap v={1} />

        <Carousel<any>
          data={[
            {uri: 'https://placeimg.com/640/480/any?0', key: '0'},
            {uri: 'https://placeimg.com/640/480/any?1', key: '1'},
            {uri: 'https://placeimg.com/640/480/any?2', key: '2'},
          ]}
          item_size={width}
          renderItem={({item}) => (
            <Box style={{width: width, padding: 10}}>
              <Image
                source={{uri: item.uri}}
                style={{height: 200}}
                resizeMode={'cover'}
              />
            </Box>
          )}
        />

        <Gap v={1} />

        <Carousel
          data={[
            {uri: 'https://placeimg.com/640/480/any?0', key: '0'},
            {uri: 'https://placeimg.com/640/480/any?1', key: '1'},
            {uri: 'https://placeimg.com/640/480/any?2', key: '2'},
          ]}
          middle
          indicator={false}
          item_size={width * 0.9}
          renderItem={({item}) => (
            <Box style={{width: width * 0.9, padding: 10}}>
              <Image
                source={{uri: item.uri}}
                style={{height: 200}}
                resizeMode={'cover'}
              />
            </Box>
          )}
        />

        <Gap v={1} />

        <Carousel
          data={[
            {uri: 'https://placeimg.com/640/480/any?0', key: '0'},
            {uri: 'https://placeimg.com/640/480/any?1', key: '1'},
            {uri: 'https://placeimg.com/640/480/any?2', key: '2'},
          ]}
          indicator={false}
          item_size={width * 0.9}
          renderItem={({item}) => (
            <Box style={{width: width * 0.9, padding: 10}}>
              <Image
                source={{uri: item.uri}}
                style={{height: 200}}
                resizeMode={'cover'}
              />
            </Box>
          )}
        />
      </ScrollView>
    </Screen>
  );
};

export default CarouselScreen;
