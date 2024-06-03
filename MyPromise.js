//  Here's a step-by-step flow of the Promise code for the methods `resolve`, `reject`, `then`, `catchMethod`, and `finallyMethod`:
// 1. **resolve**: This method is used to fulfill the Promise with a given value. It sets the `status` of the Promise to "fulfilled", sets the `value` to the given value, and then asynchronously calls all the `onFulfilled` callbacks registered via `then` with the fulfilled value. It also calls all the `onFinally` callbacks registered via `finally`.
// 2. **reject**: This method is used to reject the Promise with a given reason. It sets the `status` of the Promise to "rejected", sets the `reason` to the given reason, and then asynchronously calls all the `onRejected` callbacks registered via `then` with the rejection reason. It also calls all the `onFinally` callbacks registered via `finally`.
// 3. **then**: This method is used to register `onFulfilled` and `onRejected` callbacks to handle the fulfilled value or rejection reason of the Promise. It returns a new Promise that is settled based on the return values of these callbacks. If the original Promise is already settled, the appropriate callback is called immediately. If the original Promise is still pending, the callbacks are added to `onFulfillCallbacks` and `onRejectCallbacks` to be called later.
// 4. **catchMethod**: This method is a shorthand for `then` when you only want to handle rejections. It's equivalent to calling `then(null, onRejected)`. It registers an `onRejected` callback and returns a new Promise that is settled based on the return value of this callback.
// 5. **finallyMethod**: This method is used to register an `onFinally` callback that is called when the Promise is settled, regardless of whether it was fulfilled or rejected. It returns a new Promise that is settled with the same value or reason as the original Promise. If the original Promise is already settled, `onFinally` is called immediately. If the original Promise is still pending, `onFinally` is added to `onFinallyCallbacks` to be called later.
// This flow ensures that the Promise behaves according to the Promise/A+ specification, which defines how Promises should work in JavaScript.

export const MyPromise = (executor) => {
  // states pending, fulfilled , rejected
  // fates resolved, unresolved
  let status = "pending";
  let value;
  let reason;
  let onFulfillCallbacks = [];
  let onRejectCallbacks = [];
  let onFinallyCallbacks = [];

  // resolve we will pass a success value, this value will be passed to the full fill or then call backs inside the then blocks.
  //The `resolve` function is used to transition the Promise from the "pending" state to the "fulfilled" state. Here's a breakdown of the code:
  // - The function takes a single argument `val`, which is the value with which the Promise is to be fulfilled.
  // - A check is performed to see if the current `status` of the Promise is "pending". This is because, according to the Promise specification, a Promise can only be settled (either fulfilled or rejected) if it's in the "pending" state.
  // - If the Promise is indeed "pending", `value` is set to `val` and `status` is updated to "fulfilled". This marks the Promise as fulfilled with the given value.
  // - The `onFulfillCallbacks` array is iterated over using `forEach`. This array contains all the `onFulfilled` callbacks that have been registered via the `then` method while the Promise was "pending". Each callback is called with the fulfilled `value` using `queueMicrotask` to ensure the callbacks are executed asynchronously.
  // - Similarly, the `onFinallyCallbacks` array is iterated over. This array contains all the `onFinally` callbacks that have been registered via the `finally` method. Each callback is called with `queueMicrotask` to ensure the callbacks are executed asynchronously.
  // This `resolve` function ensures that all registered callbacks are called with the correct value and in the correct order when the Promise is fulfilled.
  const resolve = (val) => {
    // Only proceed if the Promise is currently "pending"
    if (status !== "pending") return;
  
    // If `val` is a thenable, adopt its state
    if (val && (typeof val === 'object' || typeof val === 'function') && typeof val.then === 'function') {
      val.then(resolve, reject);
      return;
    }
    // Update the `status` and `value`
    status = "fulfilled";
    value = val;
  
    // Call all `onFulfilled` callbacks asynchronously
    queueMicrotask(() => {
      onFulfillCallbacks.forEach(callback => callback(value));
      onFulfillCallbacks = []; // Clear the callbacks
    });
  
    // Call all `onFinally` callbacks asynchronously
    queueMicrotask(() => {
      onFinallyCallbacks.forEach(callback => callback());
      onFinallyCallbacks = []; // Clear the callbacks
    });
  };

  // reject will pass an error value, which will be passed to the reject callbacks or catchCallBacks inside the catch block.
const reject = (err) => {
  console.log('***Reached rejected', status)
  if (status === "pending") {
    status = "rejected";
    console.log('***after Reached rejected', status)
    reason = err;
    onRejectCallbacks.forEach((callback) => {
      queueMicrotask(() => callback(reason));
    });
    onFinallyCallbacks.forEach((callback) => {
      queueMicrotask(callback);
    });
    // Clear the callbacks
    onRejectCallbacks = [];
    onFinallyCallbacks = [];
  }
};

  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }

  //   myPromise
  // .then(handleFulfilledA, handleRejectedA)
  // .then(handleFulfilledB, handleRejectedB)
  // .then(handleFulfilledC, handleRejectedC);
  const then = (onFulfilled, onRejected) => {
    return new Promise((resolve, reject) => {
      const onFulfilledWrapper = value => {
        try {
          if (typeof onFulfilled === 'function') {
            const result = onFulfilled(value);
            if (result instanceof Promise) {
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          } else {
            resolve(value);
          }
        } catch (error) {
          reject(error);
        }
      };
  
      const onRejectedWrapper = reason => {
        try {
          if (typeof onRejected === 'function') {
            const result = onRejected(reason);
            if (result instanceof Promise) {
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          } else {
            reject(reason);
          }
        } catch (error) {
          reject(error);
        }
      };
  
      if (status === 'pending') {
        onFulfillCallbacks.push(onFulfilledWrapper);
        onRejectCallbacks.push(onRejectedWrapper);
      } else if (status === 'fulfilled') {
        queueMicrotask(() => onFulfilledWrapper(value));
      } else if (status === 'rejected') {
        queueMicrotask(() => onRejectedWrapper(reason));
      }
    });
  };

  const catchMethod = (onRejected) => then(null, onRejected);

  const finallyMethod = (onFinally) => {
    return new Promise((resolve, reject) => {
      const onFinallyWrapper = () => {
        try {
          if (typeof onFinally === 'function') {
            onFinally();
          }
        } catch (error) {
          reject(error);
          return;
        }
  
        if (status === 'fulfilled') {
          resolve(value);
        } else if (status === 'rejected') {
          reject(reason);
        }
      };
  
      if (status === 'pending') {
        onFinallyCallbacks.push(onFinallyWrapper);
      } else {
        queueMicrotask(onFinallyWrapper);
      }
    });
  };
  // `Promise.all` and `Promise.allSettled` are two methods provided by the Promise object in JavaScript, and they behave differently:

  // 1. **`Promise.all`**: This method takes an array of Promises and returns a new Promise that fulfills with an array of the fulfillment values of the input Promises if all of them fulfill. If any of the input Promises is rejected, `Promise.all` immediately rejects with the reason of the first Promise that was rejected. In other words, `Promise.all` is all or nothing: it fulfills only if all input Promises fulfill, and it rejects if any input Promise rejects.
  
  // 2. **`Promise.allSettled`**: This method also takes an array of Promises, but it always fulfills, regardless of whether the input Promises fulfill or reject. It fulfills with an array of objects that each describe the outcome of each input Promise. Each object has a `status` property that can be either `'fulfilled'` or `'rejected'`, and a `value` or `reason` property that holds the fulfillment value or rejection reason. This makes `Promise.allSettled` useful for running multiple Promises in parallel and waiting for all of them to settle, while keeping track of their individual outcomes.
  
  // Here's a comparison in code:
  
  // ```javascript
  // Promise.all([Promise.resolve(1), Promise.reject(new Error('error'))])
  //   .then(values => console.log(values))
  //   .catch(error => console.error(error));  // Logs: Error: error
  
  // Promise.allSettled([Promise.resolve(1), Promise.reject(new Error('error'))])
  //   .then(results => console.log(results));  // Logs: [{status: 'fulfilled', value: 1}, {status: 'rejected', reason: Error: error}]
  // ```
  
  // In the `Promise.all` example, the Promise rejects with the error from the rejected Promise. In the `Promise.allSettled` example, the Promise fulfills with an array that describes the outcomes of both Promises.
//   Promise.all([Promise.resolve(1), Promise.reject(new Error('error'))])
//   .then(values => console.log(values))
//   .catch(error => console.error(error));  // Logs: Error: error

// Promise.allSettled([Promise.resolve(1), Promise.reject(new Error('error'))])
//   .then(results => console.log(results));  // Logs: [{status: 'fulfilled', value: 1}, {status: 'rejected', reason: Error: error}]

  const all = (promises) => {
    return new MyPromise((resolve, reject) => {
      const result = [];
      let completedCount = 0;
  
      promises.forEach((promise, i) => {
        // Wrap non-Promise values in a Promise
        MyPromise.resolve(promise)
          .then(value => {
            result[i] = value;
            completedCount++;
            if (completedCount === promises.length) {
              resolve(result);
            }
          })
          .catch(reject);
      });
    });
  };

  const allSettled = (promises) => {
    return new MyPromise((resolve) => {
      const result = [];
      let completedCount = 0;
  
      promises.forEach((promise, i) => {
        // Wrap non-Promise values in a Promise
        MyPromise.resolve(promise)
          .then(value => {
            result[i] = { status: 'fulfilled', value };
            completedCount++;
            if (completedCount === promises.length) {
              resolve(result);
            }
          })
          .catch(reason => {
            result[i] = { status: 'rejected', reason };
            completedCount++;
            if (completedCount === promises.length) {
              resolve(result);
            }
          });
      });
    });
  };

  // the race function takes an array of promises as an argument and 
  // returns a new Promise that fulfills or rejects based on the first promise that fulfills 
  // or rejects from the array.
  const race = (promises) => {
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(resolve).catch(reject);
      }
    });
  };

  return {
    then,
    catch: catchMethod,
    finally: finallyMethod,
    all,
    allSettled,
    race,
  };
};
