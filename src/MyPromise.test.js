import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import {MyPromise} from './MyPromise'; // adjust the import path to your MyPromise function


// const DEFAULT_VALUE = "default"

describe('MyPromise', () => {
  it('should handle then callbacks', async () => {
    const thenCb = jest.fn();
    const { result } = renderHook(() => MyPromise(resolve => setTimeout(() => resolve('resolved'), 1000)));
    result.current.then(thenCb);
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
    });
    expect(thenCb).toHaveBeenCalledWith('resolved');
  });

  it('should handle catch callbacks', async () => {
    const catchCb = jest.fn();
    const { result } = renderHook(() => MyPromise((_, reject) => setTimeout(() => reject('rejected'), 1000)));
    result.current.catch(catchCb);
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
    });
    expect(catchCb).toHaveBeenCalledWith('rejected');
  });

  it("with multiple thens for same promise", async() => {
    const thenCb = jest.fn();
    const { result } = renderHook(() => MyPromise(resolve => setTimeout(() => resolve('resolved'), 1000)));
    const promise1 =    result.current.then(thenCb);
    const promise2 =     result.current.then(thenCb);
    return Promise.allSettled([promise1, promise2])
  })

});
