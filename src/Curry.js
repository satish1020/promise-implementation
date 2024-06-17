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


// console.log(Multiply(4,5)) //returns 20

// const MultiplyFive = Multiply(5);
// console.log('MultiplyFive', MultiplyFive); //returns y = x* y
