const { _NATIVE_TOSTRING_ } = require('./../utils/constants');

const definePromise = (window) => {

  class PromiseNodeJS {
    constructor(executor) {
      this.state = "pending";
      this.value = undefined;
      this.reason = undefined;
      this.onFulfilledCallbacks = [];
      this.onRejectedCallbacks = [];

      try {
        executor(this.resolve.bind(this), this.reject.bind(this));
      } catch (error) {
        this.reject(error);
      }
    }

    resolve(value) {
      if (this.state === "pending") {
        debugger;
        this.state = "fulfilled";
        this.value = value;
        this.onFulfilledCallbacks.forEach((callback) => callback(this.value));
      }
    }

    reject(reason) {
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = reason;
        this.onRejectedCallbacks.forEach((callback) => callback(this.reason));
      }
    }

    then(onFulfilled, onRejected) {
      onFulfilled =
        typeof onFulfilled === "function" ? onFulfilled : (value) => value;
      onRejected =
        typeof onRejected === "function"
          ? onRejected
          : (error) => {
              throw error;
            };

      const promise = new PromiseNodeJS((resolve, reject) => {
        if (this.state === "fulfilled") {
          setTimeout(() => {
            try {
              const result = onFulfilled(window, this.value);
              PromiseNodeJS.resolvePromise(promise, result, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        } else if (this.state === "rejected") {
          setTimeout(() => {
            try {
              const result = onRejected(window, this.reason);
              PromiseNodeJS.resolvePromise(promise, result, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        } else if (this.state === "pending") {
          this.onFulfilledCallbacks.push(() => {
            setTimeout(() => {
              try {
                let result;
                if (_NATIVE_TOSTRING_.call(onFulfilled).includes('callContext')) {
                  result = onFulfilled(window, this.value);
                } else {
                  result = onFulfilled(this.value);
                }
                PromiseNodeJS.resolvePromise(promise, result, resolve, reject);
              } catch (error) {
                reject(error);
              }
            }, 0);
          });
          this.onRejectedCallbacks.push(() => {
            setTimeout(() => {
              try {
                const result = onRejected(window, this.reason);
                PromiseNodeJS.resolvePromise(promise, result, resolve, reject);
              } catch (error) {
                reject(error);
              }
            }, 0);
          });
        }
      });

      return promise;
    }

    catch(onRejected) {
      return this.then(null, onRejected);
    }

    static resolve(value) {
      return new PromiseNodeJS((resolve) => resolve(value));
    }

    static reject(reason) {
      return new PromiseNodeJS((resolve, reject) => reject(reason));
    }

    static all(promises) {
      return new PromiseNodeJS((resolve, reject) => {
        debugger;
        const results = [];
        let count = 0;

        for (let i = 0; i < promises.length; i++) {
          promises[i].then((value) => {
            results[i] = value;
            count++;

            if (count === promises.length) {
              resolve(results);
            }
          }, reject);
        }
      });
    }

    static race(promises) {
      return new PromiseNodeJS((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
          promises[i].then(resolve, reject);
        }
      });
    }

    static resolvePromise(promise, result, resolve, reject) {
      if (promise === result) {
        reject(new TypeError("Chaining cycle detected"));
        return;
      }

      if (result instanceof PromiseNodeJS) {
        result.then(resolve, reject);
        return;
      }

      if (
        result !== null &&
        (typeof result === "object" || typeof result === "function")
      ) {
        let called = false;

        try {
          const then = result.then;
          if (typeof then === "function") {
            then.call(
              result,
              (value) => {
                if (called) return;
                called = true;
                PromiseNodeJS.resolvePromise(promise, value, resolve, reject);
              },
              (error) => {
                if (called) return;
                called = true;
                reject(error);
              }
            );
            return;
          }
        } catch (error) {
          if (called) return;
          called = true;
          reject(error);
          return;
        }
      }

      resolve(result);
    }
  }

  window.Promise = PromiseNodeJS;

};

module.exports = definePromise;
