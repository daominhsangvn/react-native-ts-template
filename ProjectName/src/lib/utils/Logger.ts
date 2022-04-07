class Service {
  log(...rest: any[]): void {
    if (__DEV__) {
      console.log.apply(console.log, rest);
    }
  }

  info(...rest: any[]): void {
    if (__DEV__) {
      console.info.apply(console.info, rest);
    }
  }

  error(...rest: any[]): void {
    if (__DEV__) {
      console.error.apply(console.error, rest);
    }
  }
}

const Logger = new Service();

export default Logger;
