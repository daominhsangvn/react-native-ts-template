import React from 'react';
import Screen from '@components/layouts/Screen';
import NavBar from '@components/NavBar';
import ScrollView from '@components/ScrollView';
import useStyles from '@lib/themes/useStyles';
import {remScale} from '@lib/themes/utils';
import Text from '@components/Text';
import Button from '@components/Button';
import Gap from '@components/Gap';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

interface Props {
  navigation: NativeStackScreenProps<{}>;
}

const _styles = {
  container: {
    padding: remScale(2),
  },
};

const Tab1Screen: React.FC<Props> = ({navigation}) => {
  const styles = useStyles(_styles);
  return (
    <Screen navbar safe>
      <NavBar title="Tab 1" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text center>TAB 1 CONTENT</Text>
        <Gap v={2} />
        <Button
          onPress={() =>
            navigation.navigate('TabNav1a', {tabBarVisible: false})
          }>
          Go to Tab 1A (Hide bottom tab)
        </Button>
        <Gap v={2} />
        <Button onPress={() => navigation.goBack()}>Go Back</Button>
      </ScrollView>
    </Screen>
  );
};

export default Tab1Screen;
