import {
  createNavigationContainerRef,
  NavigationState,
} from '@react-navigation/native';
import {RootStackParamList} from '@configs/router.types';

interface IService {
  navigate: (...args: [screen: any, params: any[]]) => void;
  reset: (state: NavigationState) => void;
}

class Service implements IService {
  navigationRef;
  constructor() {
    this.navigationRef = createNavigationContainerRef<RootStackParamList>();
  }

  navigate(...arg: [screen: any, params: any[]]) {
    this.navigationRef.navigate(...arg);
  }

  reset(state: NavigationState) {
    this.navigationRef.reset(state);
  }
}

const instance = new Service();

export const NavigationService = instance;
