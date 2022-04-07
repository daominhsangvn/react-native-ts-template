import React from 'react';
import Screen from '@components/layouts/Screen';
import Button from '@components/Button';
import NavBar from '@components/NavBar';
import ScrollView from '@components/ScrollView';
import Gap from '@components/Gap';
import useStyles from '@lib/themes/useStyles';
import {remScale} from '@lib/themes/utils';
import Card from '@components/Card';
import Text from '@components/Text';
import {toggleScheme} from '@lib/themes/store';
import {useDispatch} from 'react-redux';

const _styles = {
  container: {
    padding: remScale(2),
  },
};

const HomeScreen = ({navigation}) => {
  const styles = useStyles(_styles);
  const dispatch = useDispatch();
  return (
    <Screen safe navbar>
      <NavBar title="Home" />
      <ScrollView contentContainerStyle={styles.container}>
        <Button onPress={() => navigation.navigate('Carousel')}>
          Carousel
        </Button>
        <Gap v={1} />
        <Button onPress={() => navigation.navigate('Sample')}>Form + UI</Button>
        <Gap v={1} />
        <Button onPress={() => navigation.navigate('Tab')}>Tab</Button>
        <Gap v={1} />
        <Button color="btn1" onPress={() => dispatch(toggleScheme())}>
          Toggle Scheme
        </Button>
        <Gap v={2} />
        <Card>
          <Card.Header>
            <Text>Header</Text>
          </Card.Header>
          <Card.Body>Body</Card.Body>
          <Card.Footer>
            <Text>Footer</Text>
          </Card.Footer>
        </Card>
      </ScrollView>
    </Screen>
  );
};

export default HomeScreen;
