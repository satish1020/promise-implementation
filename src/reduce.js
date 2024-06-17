const arr = [1, 2, 3, 4, 5];

// 0 is the initial value
const sum = arr.reduce(
  (acc, current) => {
    return acc + current;
  },
  [0]
);

console.log("***sum using reduce", sum[arr]);

const maxValue = arr.reduce((acc, current) => {
   if(current > acc){
    acc = current;
   }
   return acc;
}, [0]);

console.log("***max value from array", maxValue[arr]);