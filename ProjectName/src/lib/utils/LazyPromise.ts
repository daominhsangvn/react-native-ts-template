export interface ILazyPromise<T> {
  resolve: ((value: T | PromiseLike<T>) => void) | undefined;
  reject: ((reason?: any) => void) | undefined;
  deferred: Promise<T>;
}

export default class LazyPromise<T> implements ILazyPromise<T> {
  resolve: ((value: T | PromiseLike<T>) => void) | undefined;
  reject: ((reason?: any) => void) | undefined;
  deferred: Promise<T>;
  constructor() {
    this.deferred = new Promise((_resolve, _reject) => {
      this.resolve = _resolve;
      this.reject = _reject;
    });
  }
}
