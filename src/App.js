import logo from "./logo.svg";
import "./App.css";

function App() {
  const Multiply = (a, b) => {
    return a * b;
  };

  const curriedMultiply = (a) => (b) => a * b;

  const handleMultiply = () => {
    console.log("****", Multiply(4, 5)); //returns 20
    console.log("***", curriedMultiply(4));
    //  we are making custom functions.
    const timesTen = curriedMultiply(10);
    console.log("****timesTen", timesTen);
    console.log("****timesTenMultiply", timesTen(5));
  };

  const curryByClosure = (fn) => {
    return function curried(...args) {
      console.log("*curry args", args, fn, args.length, fn.length);
      if (fn.length !== args.length) {
        return curried.bind(null, ...args);
      }
      return fn(...args);
    };
  };

  const curryMultiplyByClosure = () => {
    const multiply = (x) => {
      return (y) => {
        console.log("***multiply", x * y);
      };
    };

    let multiplyByTwo = multiply(2);
    multiplyByTwo(3);

    let multiplyByThree = multiply(3);
    multiplyByThree(5);
  };

  const handleCurryByClosure = () => {
    console.log("***handle curry");
    const total = (x, y, z) => {
      return x * y * z;
    };
    const curriedTotal = curryByClosure(total);
    console.log("curried closure total", curriedTotal(10, 20, 30));
    curryMultiplyByClosure();
  };

  const handleCurryUsingBind = () => {
    const multiply = (x, y) => {
      return x * y;
    };

    let multiplyByTwo = multiply.bind(this, 2);
    console.log("****multiply by two", multiplyByTwo(3));

    let multiplyByThree = multiply.bind(this, 3);
    console.log("***multiply by three", multiplyByThree(4));
  };

  const handlePartialApplication = () => {
    const addPartial = (x, y, z) => {
      return x + y + z;
    };
    let partialFunc = addPartial.bind(this, 2, 3);
    const result = partialFunc(addPartial);
    console.log("***Result", result);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={handleMultiply}>
          Click to check Curry Multiply Behavior
        </button>
        <button onClick={handleCurryUsingBind}>
          Click to check Curry Behavior using binding
        </button>
        <button onClick={handleCurryByClosure}>
          Click to check Curry Behavior by closure
        </button>
        <button onClick={handlePartialApplication}>
          Click to handle Partial Application
        </button>
      </header>
    </div>
  );
}

export default App;
