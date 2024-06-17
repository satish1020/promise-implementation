export const Multiply = (a, b) => {
  return a * b;
};

const curriedMultiply = (a) => (b) => a * b;

console.log("***", curriedMultiply(4));
//  we are making custom functions.
const timesTen = curriedMultiply(10);
console.log("****timesTen", timesTen);
console.log("****timesTenMultiply", timesTen(5));

const curryByClosure = (fn) => {
  return function curried(...args) {
    console.log("*curry args", args, fn, args.length, fn.length);
    if (fn.length !== args.length) {
      return curried.bind(null, ...args);
    }
    return fn(...args);
  };
};


const total = (x, y, z) => {
  return x * y * z;
};
const curriedTotal = curryByClosure(total);
console.log("curried closure total", curriedTotal(10, 20, 30));


// curry implementation

/**
 * @param {Function} func
 * @return {Function}
 */
// export default function curry(func) {
//   return function curried(...args) {
//     if (args.length >= func.length) {
//       return func.apply(this, args);
//     }

//     return (arg) =>
//       arg === undefined
//         ? curried.apply(this, args)
//         : curried.apply(this, [...args, arg]);
//   };
// }


// alternative

/**
 * @param {Function} func
 * @return {Function}
 */
// export default function curry(func) {
//   return function curried(...args) {
//     if (args.length >= func.length) {
//       return func.call(this, ...args);
//     }

//     return (arg) =>
//       arg === undefined
//         ? curried.call(this, ...args)
//         : curried.call(this, ...args, arg);
//   };
// }

/**
 * @param {Function} func
 * @return {Function}
 */
export default function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    }

    return curried.bind(this, ...args);
  };
}
