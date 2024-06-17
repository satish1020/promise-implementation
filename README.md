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
  