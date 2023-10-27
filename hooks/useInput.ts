import { useReducer, useCallback } from 'react';
import { useInputType } from '@/types/form';
import { eventNames } from 'process';

function reducer(state: useInputType, action: any) {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        [action.name]: action.value
      };
    case 'RESET':
      return Object.keys(state).reduce((acc: any, current) => {
        acc[current] = '';
        return acc;
      }, {});
    default:
      return state;
  }
}

function useInput(initialForm: useInputType) {
  const [form, dispatch] = useReducer(reducer, initialForm);
  // change
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: 'CHANGE', name, value });
  }, []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);
  return [form, onChange, reset];
}

export default useInput;