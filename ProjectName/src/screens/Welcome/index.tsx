import React from 'react';
import Text from '@components/Text';
import Screen from '@components/layouts/Screen';
import Button from '@components/Button';
import {remScale} from '@lib/themes/utils';
import WelcomeImage from '@assets/images/welcome-image.png';
import {Image} from 'react-native';
import Box from '@components/layouts/Box';
import Logo from '@assets/svg/logo.svg';
import Gap from '@components/Gap';
import {AuthStackPropsType} from '@configs/router.types';

const WelcomeScreen: React.FC<AuthStackPropsType<'Welcome'>> = ({
  navigation,
}) => {
  return (
    <Screen style={{padding: remScale(3)}}>
      <Box center style={{flex: 1, paddingTop: remScale(2)}}>
        <Image source={WelcomeImage} resizeMode={'contain'} />
      </Box>
      <Box style={{flex: 1}}>
        <Box style={{flex: 1}}>
          <Box style={{marginTop: -100}} center>
            <Logo width={120} height={120} />
          </Box>

          <Text center color="text1" category="h1">
            Welcome
          </Text>

          <Box center>
            <Text category="b2" color="text3" style={{width: 220}} center>
              Enjoy the experience of reading the latest news from around the
              world
            </Text>
          </Box>
        </Box>

        <Box>
          <Button>Create Account</Button>
          <Gap h={2} />
          <Button color="btn1" onPress={() => navigation.navigate('SignIn')}>
            Already have an account
          </Button>
        </Box>
      </Box>
    </Screen>
  );
};

export default WelcomeScreen;
