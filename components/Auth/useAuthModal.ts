import { useCallback } from 'react';
import { logInErrorAtom, signUpErrorAtom } from '@/states/auth';
import {authModalStateAtom} from './states';
import { atom, useRecoilValue, useResetRecoilState } from 'recoil';

const useAuthModal = () => {
  const authModal = useRecoilValue(authModalStateAtom);
  const resetAuthModal = useResetRecoilState(authModalStateAtom);
  const resetLogInError = useResetRecoilState(logInErrorAtom);
  const resetSignUpError = useResetRecoilState(signUpErrorAtom);

  const onClose = useCallback(() => {
    resetAuthModal();
    resetLogInError();
    resetSignUpError();
  }, [resetAuthModal, resetLogInError, resetSignUpError]);

  return {
    onClose,
    authModal,
  };
};

export default useAuthModal;
