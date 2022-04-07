import React from 'react';
import Screen from '@components/layouts/Screen';
import NavBar from '@components/NavBar';
import ScrollView from '@components/ScrollView';
import useStyles from '@lib/themes/useStyles';
import {remScale} from '@lib/themes/utils';
import Text from '@components/Text';

const _styles = {
  container: {
    padding: remScale(2),
  },
};

const Tab2Screen = () => {
  const styles = useStyles(_styles);
  return (
    <Screen navbar safe>
      <NavBar title="Tab 2" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text center>TAB 2</Text>
      </ScrollView>
    </Screen>
  );
};

export default Tab2Screen;
