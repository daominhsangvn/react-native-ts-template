import Config from 'react-native-config';

interface TAppConfig {
  apiDomain: string;
  basename: string;
}

export const AppConfig: TAppConfig = {
  apiDomain: Config.apiDomain,
  basename: '',
};
