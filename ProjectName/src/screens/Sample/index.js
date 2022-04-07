import Box from '@components/layouts/Box';
import React, {useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';
import Button from '@components/Button';
import {remScale} from '@lib/themes/utils';
import useAlertDiaLog from '@lib/alertDialog/useAlertDialog';
import Text from '@components/Text';
import Gap from '@components/Gap';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {ThemeActions} from '@lib/themes/store';
import Icon from '@components/Icon';
import Screen from '@components/layouts/Screen';
import {yupResolver} from '@lib/utils/yupResolver';
import NavBar from '@components/NavBar';
import ScrollView from '@components/ScrollView';
import useCollapsibleNavBar from '@lib/hooks/useCollapsibleNavBar';
import useStyles from '@lib/themes/useStyles';
import DelayRender from '@components/DelayRender';
import LinkButton from '@components/LinkButton';
import useTheme from '@lib/themes/useTheme';
import Switch from '@components/Switch';

const schema = yup.object().shape({
  // password: yup
  //   .string()
  //   .required('Password is required')
  //   .min(6, 'Password must be at least 6 characters'),
  // confirmPassword: yup
  //   .string()
  //   .required('Confirm Password is required')
  //   .oneOf([yup.ref('password')], 'Passwords must match'),
  // mediaphoto: yup.string().nullable().required('Photo is required'),
});

const _styles = {
  container: {
    padding: remScale(2),
  },
};

const SampleScreen = () => {
  const dispatch = useDispatch();
  const {scheme} = useTheme();
  const styles = useStyles(_styles);
  const {showError, showSuccess, showWarning} = useAlertDiaLog();
  const [formValue, setFormValue] = useState({});
  const {scrollClamp, scrollHandler} = useCollapsibleNavBar();
  const isAutoScheme = useSelector(ThemeActions.selectIsThemeAuto);

  const [largeList] = useState(
    Array.from(Array(500)).map((_, index) => ({
      label: `Javascript ${index}`,
      value: `js${index}`,
    })),
  );

  const onSubmit = useCallback(data => {
    setFormValue(data);
  }, []);

  const customRender = useCallback(({data, checked}) => {
    return (
      <Box row items="center">
        <Box flex>
          <Text>{data.item.label}</Text>
        </Box>
      </Box>
    );
  }, []);

  return (
    <Screen>
      <NavBar title="Sample" y={scrollClamp} />
      <ScrollView
        navbar
        safe
        style={[StyleSheet.absoluteFillObject]}
        contentContainerStyle={styles.container}
        onScroll={scrollHandler}>
        <Box row>
          <Box style={{flexShrink: 1, flex: 1}}>
            <Text>Use Device Scheme</Text>
          </Box>
          <Box>
            <Switch
              onChange={checked => {
                dispatch(ThemeActions.setAutoScheme({auto: checked}));
              }}
              checked={isAutoScheme}
            />
          </Box>
        </Box>

        {!isAutoScheme && (
          <Box row style={{marginTop: remScale(2)}}>
            <Box style={{flexShrink: 1, flex: 1}}>
              <Text>{scheme === 'dark' ? 'Dark' : 'Light'}</Text>
            </Box>
            <Box>
              <Switch
                onChange={() => {
                  dispatch(ThemeActions.toggleScheme());
                }}
                checked={scheme === 'dark'}
              />
            </Box>
          </Box>
        )}

        <Gap v={1} />
        <Box>
          <Text category="h6">Alerts</Text>
          <Gap v={1} />
          <Box row>
            <Button onPress={() => showError('Error message')}>Error</Button>
            <Button onPress={() => showSuccess('Success message')}>
              Success
            </Button>
            <Button onPress={() => showWarning('Warning message')}>
              Warning
            </Button>
          </Box>
        </Box>

        <Gap v={1} />
        <Box>
          <Text category="h6">Buttons</Text>
          <Gap v={1} />
          <Box row>
            <Button>Normal</Button>
            <Button outline color="btn1">
              Outline
            </Button>
            <Button loading>Loading</Button>
          </Box>
          <Gap v={1} />
          <Button disabled>Disabled</Button>
          <Gap v={1} />
          <Box row>
            <Button left>Left align</Button>
            <Button right>Right align</Button>
          </Box>
          <Gap v={1} />
          <Box row>
            <Button
              leftAccessory={<Icon name="ios-person-outline" size={16} />}
              leftAccessoryAbsolute>
              Left icon
            </Button>
            <Button
              rightAccessory={<Icon name="ios-person-outline" size={16} />}
              rightAccessoryAbsolute>
              Right icon
            </Button>
          </Box>
        </Box>

        <Gap v={1} />

        <Box center>
          <LinkButton>Link Button</LinkButton>
        </Box>

        <Text>{JSON.stringify(formValue, null, 3)}</Text>
      </ScrollView>
    </Screen>
  );
};

export default SampleScreen;
