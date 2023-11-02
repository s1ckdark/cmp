import { useCallback } from 'react';
import { authModalAtom, logInErrorAtom, signUpErrorAtom } from '@/components/Auth/states';
import { atom, useRecoilValue, useResetRecoilState } from 'recoil';

const useAuthModal = () => {
  const authModal = useRecoilValue(authModalAtom);
  const resetAuthModal = useResetRecoilState(authModalAtom);
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
