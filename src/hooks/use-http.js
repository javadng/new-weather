import { useCallback, useReducer } from 'react';
import { TIMEOUT_SEC } from '../config/config';
import timeout from '../lib/timeoutPromise';

const initialState = {
  status: null,
  error: null,
  data: null,
};

const reducerFun = (state, action) => {
  if (action.type === 'SUCCESS') {
    return {
      status: 'SUCCESS',
      error: null,
      data: action.data,
    };
  }
  if (action.type === 'LOADING') {
    return {
      status: 'LOADING',
      error: null,
      data: null,
    };
  }
  if (action.type === 'ERROR') {
    return {
      status: 'ERROR',
      error: action.error,
      data: null,
    };
  }
};

const useHttp = requestFunc => {
  const [httpState, dispatch] = useReducer(reducerFun, initialState);

  const sendRequest = useCallback(
    async (reqData, options) => {
      dispatch({ type: 'LOADING' });

      try {
        const responseData = await Promise.race([
          requestFunc(reqData, options),
          timeout(TIMEOUT_SEC),
        ]);

        dispatch({ type: 'SUCCESS', data: responseData });

        if (reqData === 'search') return responseData;
      } catch (err) {
        dispatch({ type: 'ERROR', error: err.message });
      }
    },
    [requestFunc]
  );

  return [sendRequest, httpState];
};

export default useHttp;
