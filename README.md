// Sample test promise implementation
// as we can see below promise takes a call back function.
// so we define callback function in the constructor.
// we use this callback when it is a success or failure. so we need to pass two functions onSuccess and OnFailure.
// we see that we pass a call back in .then and .catch. then will be executed on success and catch will be executed on failure.
// const testPromise = new Promise((resolve, reject) => {})
//   .then(() => {})
//   .catch(() => {})
//   .finally();
// // .then can be called multiple times.
// testPromise.then();
// testPromise.then();
// As seen above promise has three methods exposed then, catch, finally.
// So the other methods success and fail which call back function passes in the place of resolve and failure are private methods.
// So declare them as #. Lets implement public function then and catch and finally which will take callback as params.
// we need to save .then callback somewhere, as we will have to provide an option to call multiple .then for a promise.
//Lets save this callback in an array called callBackList. every single time we call .then it will be added to call back list.
// then on success we need to call each of the call back in the callBackList, with the value in the onResolve parameter.
// the promises keep track of the values that are resolved, rejected etc.. So we need a state, lets declare a state variable.
// lets also declare a value variable which will have the value on resolve or reject.

https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md

States
Promises have three possible mutually exclusive states: fulfilled, rejected, and pending.

A promise is fulfilled if promise.then(f) will call f "as soon as possible."
A promise is rejected if promise.then(undefined, r) will call r "as soon as possible."
A promise is pending if it is neither fulfilled nor rejected.
We say that a promise is settled if it is not pending, i.e. if it is either fulfilled or rejected. Being settled is not a state, just a linguistic convenience.

Fates
Promises have two possible mutually exclusive fates: resolved, and unresolved.

A promise is resolved if trying to resolve or reject it has no effect, i.e. the promise has been "locked in" to either follow another promise, or has been fulfilled or rejected.
A promise is unresolved if it is not resolved, i.e. if trying to resolve or reject it will have an impact on the promise.
A promise can be "resolved to" either a promise or thenable, in which case it will store the promise or thenable for later unwrapping; or it can be resolved to a non-promise value, in which case it is fulfilled with that value.

// const { resolve } = require("./MyPromise");

let p = new Promise((resolve,reject)=>{
const a= 1 + 1
if(a ===2)
{
  resolve('success')
}
else{
reject("failure")
}
})
<!-- 
// anything inside .then will run for resolve.
// to catch error we need to call catch
// promise is used when we want to download a large image and instead of waiting if we want to do something else.
p.then((message)=>{
  console.log(`This is a ${message}`);
}).catch((message)=>{
  console.log(`This is a catch ${message}`)
})
// Promise is an alternative to nesting call backs as in https://codepen.io/WebDevSimplified/pen/jXoXYj.
// nesting call backs might result in call back hell, promise is an alternative to nested call backs.

const recordVideo1 =  new Promise((resolve, reject)=>[
  resolve('Video1 Recorded')
])

const recordVideo2 = new Promise((resolve, reject)=>{
  resolve('Video2 Recorded')
})

const recordVideo3 = new Promise((resolve, reject)=>{
  resolve('Video3 Recorded')
})

// once all these promises are resolved then Promise. all calls .then
// this in .then will print all the above 3 messages.
// Promise all will wait for all promises to resolve.
// returns an array ['Video1 Recorded', 'Video2 Recorded', 'Video3 Recorded']
Promise.all([recordVideo1,recordVideo2, recordVideo3]).then((messages)=>{
  console.log(messages)
}).catch()

// race will pass the control to .then as soon as any one of the promise is resolved.
Promise.race([recordVideo1,recordVideo2, recordVideo3]).then((message)=>{
  console.log(message)
}).catch() -->
<!-- https://medium.com/@sharareshaddev/understanding-promises-in-javascript-and-their-use-in-react-a77564aae576 -->


const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo");
  }, 300);
});

myPromise
  .then(handleFulfilledA, handleRejectedA)
  .then(handleFulfilledB, handleRejectedB)
  .then(handleFulfilledC, handleRejectedC).
  .catch()
  .catch()
  .finally();
  

  <!-- curry -->
<!-- lodash implementation curry. -->
  https://lodash.com/docs/4.17.15#curry
<!-- Understanding curry -->
 https://blog.logrocket.com/understanding-javascript-currying

 <!-- curry1 -->

 Currying is the technique of converting a function that takes multiple arguments into a sequence of functions that each takes a single argument.

Implement the curry function which accepts a function as the only argument and returns a function that accepts single arguments and can be repeatedly called until at least the minimum number of arguments have been provided (determined by how many arguments the original function accepts). The initial function argument is then invoked with the provided arguments.


question:
function add(a, b) {
  return a + b;
}

const curriedAdd = curry(add);
curriedAdd(3)(4); // 7

const alreadyAddedThree = curriedAdd(3);
alreadyAddedThree(4); // 7


solution:
Currying is not commonly used in real-world development but is a moderately common question for interviews as it tests the candidate's understanding of certain JavaScript fundamentals like arity and closures.

Clarification Questions
What value types will curry expect?
Should the function expect values of different types?
Solution
We first need to understand a few terms:

Arity: The number of arguments or operands taken by a function.
Closure: A closure is the combination of a function bundled together with references to its lexical environment (surrounding state).
The curried function will stop accepting arguments after the number of arguments that have been passed into the curried function equals the arity of the original function.

We can keep a record of the curried function arguments so far via closures. Each time the curried function is called, we compare the number of arguments so far with the arity of the original function.

If they're the same, we call the original function with the arguments.
If more arguments are needed, we will return a function that accepts more arguments and invokes the curried function with the new arguments.
Note that the inner function needs to be defined using arrow functions to preserve the same lexical this or manually tracked using a separate variable like in Debounce.


  <!-- curry2 -->

  Note: This is an advanced version of Curry, you should complete that first before attempting this question.

Currying is the technique of converting a function that takes multiple arguments into a sequence of functions that each takes a single argument.

Implement the curry function which accepts a function as the only argument and returns a function that accepts any number of arguments (vs only one argument at a time in Curry) and returns a function which can be repeatedly called until at least the minimum number of arguments has been provided (determined by how many arguments the original function accepts). The initial function argument is then invoked with the provided arguments.


Examples
function addTwo(a, b) {
  return a + b;
}
const curriedAddTwo = curry(addTwo);
curriedAddTwo(3)(4); // 7
curriedAddTwo(3, 4); // 7
const alreadyAddedThree = curriedAddTwo(3);
alreadyAddedThree(4); // 7
function multiplyThree(a, b, c) {
  return a * b * c;
}
const curriedMultiplyThree = curry(multiplyThree);
curriedMultiplyThree(4)(5)(6); // 120
curriedMultiplyThree(4)(5, 6); // 120
curriedMultiplyThree(4, 5)(6); // 120
curriedMultiplyThree(4, 5, 6); // 120

const containsFour = curriedMultiplyThree(4);
const containsFourMulFive = containsFour(5);
containsFourMulFive(6); // 120
Try these questions next
Curry III
Difficulty
Hard
Similar Questions
Curry
Difficulty
Medium

solution:

Currying is not commonly used in real-world development but is a moderately common question for interviews as it tests the candidate's understanding of certain JavaScript fundamentals like arity and closures.

Clarification Questions
What value types will curry expect?
Should the function expect values of different types?
Solution
We first need to understand a few terms:

Arity: The number of arguments or operands taken by a function.
Closure: A closure is the combination of a function bundled together with references to its lexical environment (surrounding state).
The curried function will stop accepting arguments after the number of arguments have been passed into the curried function equals the arity of the original function.

We can keep a record of the curried function arguments so far via closures. Each time the curried function is called, we compare the number of arguments so far with the arity of the original function.

If they're the same, we call the original function with the arguments.
If more arguments are needed, we will return a function that accepts more arguments and invokes the curried function with the new arguments.
The solutions for this question can also work for Curry, because this solution is a general version that doesn't make any assumptions on the number of arguments needed.

Edge Cases
Calling the function without any arguments should not have any effect, unless the function does not take in any arguments.
Functions which access this. Do test this case for curried functions that are meant to receive multiple arguments as well.
Techniques
Closures.
Invoking functions via Function.prototype.apply()/Function.prototype.call().
Notes
Intermediate functions should be reusable as seen from the examples in the question description.
  <!-- curry3 -->
question:

Note: This is an advanced version of Curry II, you should complete that first before attempting this question. Also, this is a hard question and resembles a brainteaser more than an actual question candidates are expected to solve. However, solving this question is rewarding and is sure to improve your knowledge of JavaScript.

Currying is the technique of converting a function that takes multiple arguments into a sequence of functions that each takes a single argument.

Implement the curry function which accepts a function as the only argument and returns a function that accepts a variadic number of arguments (vs only one argument at a time in Curry and a fixed number of arguments in Curry II) and returns a function which can be repeatedly called.

Expected Behaviour of Output
When the returned function is in an expression that suggests the value should be a string or a number, the initial function argument is then invoked with the provided arguments and the result is used as the value.

Examples
function multiply(...numbers) {
  return numbers.reduce((a, b) => a * b, 1);
}
const curriedMultiply = curry(multiply);
const multiplyByThree = curriedMultiply(3);
console.log(multiplyByThree); // 3
console.log(multiplyByThree(4)); // 12

const multiplyByFifteen = multiplyByThree(5);
console.log(multiplyByFifteen); // 15
console.log(multiplyByFifteen(2)); // 30

console.log(curriedMultiply(1)(2)(3)(4)); // 24
console.log(curriedMultiply(1, 2, 3, 4)); // 24
Hint
Look up the Symbol.toPrimitive, Object.prototype.toString() and Object.prototype.valueOf() functions.

  Solution
Implicit type conversion is the fundamental concept that we need to be aware of here. When variable are used in scenarios with mismatched types, implicit type conversion happens as an attempt to make the operation succeed. Here are some examples from MDN regarding type conversions:

const foo = 42; // foo is a number
const result = foo + '1'; // JavaScript coerces foo to a string, so it can be concatenated with the other operand.
console.log(result); // 421

const bar = '42'; // bar is a string
const result2 = 2 * bar; // JavaScript coerces bar to a number, so it can be multiplied with the other operand.
console.log(result2); // 84
The function returned by curry (we call it curried) is a function, which is a JavaScript object. Under usual circumstances, when a function is coerced into a string, the function's code is used as the string value:

function foo(a, b) {
  return a + b;
}
console.log('hey ' + foo); // hey function foo(a, b) { return a + b }
This is not what we want. We want to call arbitrary logic when a function is used as a primitive value. In order for objects to be used as a primitive value (when being used in console.log() or in expressions), we can override the Symbol.toPrimitive property on objects, which is a method that accepts a preferred type and returns a primitive representation of an object.

Hence the solution to this question can be obtained by modifying the solution of Curry II slightly and calling func.apply(this, args) within the method of Symbol.toPrimitive.

Edge Cases
Functions which access this.
Techniques
Closures.
Invoking functions via Function.prototype.apply()/Function.prototype.call().
Type coercion.
Notes
this should be preserved when calling the original function, which can be achieved by using an arrow function.
Overriding Object.prototype.valueOf and Object.prototype.toString works as well, but defining an implementation for Symbol.toPrimitive is more reliable.

