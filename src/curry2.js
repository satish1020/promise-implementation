/**
 * @param {Function} func
 * @return {Function}
 */
export default function curry(func) {
    return function curried(...args) {
      if (args.length === func.length) {
        return func.apply(this, args);
      }
  
      return (...args2) => curried.apply(this, [...args, ...args2]);
    };
  }
  

  /** alternative
 * @param {Function} func
 * @return {Function}
 */
export default function curryAlterNative1(func) {
    return function curried(...args) {
      if (args.length >= func.length) {
        return func.call(this, ...args);
      }
  
      return (...args2) => curried.call(this, ...args, ...args2);
    };
  }
  

  /**
 * @param {Function} func
 * @return {Function}
 */
export default function curryAlternative2(func) {
    return function curried(...args) {
      if (args.length >= func.length) {
        return func.apply(this, args);
      }
  
      return curried.bind(this, ...args);
    };
  }
  