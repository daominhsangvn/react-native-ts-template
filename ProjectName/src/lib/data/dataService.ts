// import {FirebaseDataProvider} from '@lib/data/providers/firebase';

import {
  GetUserResponseModel,
  LoginRequestModel,
  LoginResponseModel,
  RegisterRequestModel,
  RegisterResponseModel,
} from './data.types';
import {TStore} from '@configs/store/config';

interface IService {
  init(store: TStore): void;
  login(request: LoginRequestModel): Promise<LoginResponseModel>;
  register(request: RegisterRequestModel): Promise<RegisterResponseModel>;
  getCurrentUser(): Promise<GetUserResponseModel>;
  logOut(): Promise<void>;
}

class Service implements IService {
  _store: TStore | undefined;

  constructor() {
    // this.provider = FirebaseDataProvider;
  }

  init(store: TStore) {
    this._store = store;
    // this.provider.init(store);
  }

  async login({
    email,
    password,
  }: LoginRequestModel): Promise<LoginResponseModel> {
    return {
      accessToken: 'test',
      refreshToken: '',
      expiresIn: new Date().getTime(),
    };
  }

  async register({
    email,
    password,
  }: RegisterRequestModel): Promise<RegisterResponseModel> {
    return {
      accessToken: 'test',
      refreshToken: '',
      expiresIn: new Date().getTime(),
    } as RegisterResponseModel;
  }

  async getCurrentUser(): Promise<GetUserResponseModel> {
    return {
      accessToken: 'test',
      refreshToken: '',
      expiresIn: new Date().getTime(),
    } as GetUserResponseModel;
  }

  async logOut(): Promise<void> {}
}

export const DataService = new Service();
