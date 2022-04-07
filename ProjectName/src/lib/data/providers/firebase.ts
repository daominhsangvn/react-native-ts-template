// import auth from '@react-native-firebase/auth';

import {TStore} from '@configs/store/config';

interface IService {
  init(store: any): void;
}

class Service implements IService {
  _store: TStore | undefined;

  constructor() {
    // this.auth = auth();
  }

  init(store: TStore) {
    this._store = store;
  }

  // async signInWithEmailAndPassword(email, password) {
  //   return this.auth.signInWithEmailAndPassword(email, password);
  // }
  //
  // async createUserWithEmailAndPassword(email, password) {
  //   return await this.auth.createUserWithEmailAndPassword(email, password);
  // }
  //
  // async signOut() {
  //   return await this.auth.signOut();
  // }
}

const instance = new Service();

export const FirebaseDataProvider = instance;
