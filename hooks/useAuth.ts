import { useState, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMeApiLocal, logoutApi, signin, signup, getUserInfo } from '@/services/auth';
import { ROLE, User } from '@/types/auth.d'; // Assuming ROLE and User types are defined here
import useAuthModal from '@/components/Auth/useAuthModal';
import { atom, useSetRecoilState, useRecoilState, useResetRecoilState } from 'recoil';
import { postIdTokenApi } from '@/services/auth';
import { tokenState } from '@/states/localStorage';
import { recoil } from '@/states/sessionStorage';
import {
  logInErrorAtom,
  logInLoadingAtom,
  signUpErrorAtom,
  signUpLoadingAtom,
  resetSignUpErrorAtom,
} from '@/states/auth';

interface UseAuthHook {
  user: User | null;
  logOut: () => void;
  logOutLoading: boolean;
  isAdmin: boolean;
  isSupporter: boolean;
  isMine: (authorId: string) => boolean;
  isMineOrAdmin: (authorId: string) => boolean;
  isLoadingMe: boolean;
  getMe: () => void;
  getUserInfo: () => void;
  showLoginModalWhenLoggedOut: (callback?: () => void) => void;
  signUpEmail: (email: string, password: string) => Promise<void>;
  logInEmail: (email: string, password: string) => Promise<void>;
  logInLoading: boolean;
  signUpLoading: boolean;
  logInError: string;
  signUpError: string;
  cleanUpEmailRelatedState: () => void;
}


const useAuth = () => {
  const [logOutLoading, setLogOutLoading] = useState(false);
  // const [tokenValue, setTokenValue] = useRecoilState(tokenState);
  const {
    data: currentUser = null,
    refetch,
    isLoading: isLoadingMe,
  } = useQuery({
    queryKey: ['getMeApiLocal'],
    queryFn: () =>
      getMeApiLocal()
        .then((res) => res.data)
        .catch(() => {
          return null;
        }),
    retry: 0,
  });

  const isAdmin = useMemo(() => currentUser?.role === ROLE.ADMIN, [currentUser?.role]);

  const isSupporter = useMemo(() => currentUser?.role === ROLE.SUPPORTER, [currentUser?.role]);

  const isMine = useCallback(
    (authorId: string) => {
      return currentUser?.uid === authorId;
    },
    [currentUser],
  );

  const isMineOrAdmin = useCallback(
    (authorId: string) => {
      return isAdmin || isMine(authorId);
    },
    [isAdmin, isMine],
  );

  const getMe = () => {
    refetch();
  };

  const logOut = () => {
    setLogOutLoading(true);
    logoutApi()
      .then(() => {
        getMe();
      })
      .finally(() => {
        setLogOutLoading(false);
      });
  };

  const showLoginModalWhenLoggedOut = (callback?: () => void) => {
    if (!currentUser) {
      setAuthModal('login');
      return;
    }
    callback?.();
  };
  const [ userInfo, setUserInfo ] = useRecoilState(recoil);
  const { onClose } = useAuthModal();
  const [logInLoading, setLogInLoading] = useRecoilState(logInLoadingAtom);
  const [logInError, setLogInError] = useRecoilState(logInErrorAtom);
  const resetLogInError = useResetRecoilState(logInErrorAtom);

  const [signUpLoading, setSignUpLoading] = useRecoilState(signUpLoadingAtom);
  const [signUpError, setSignUpError] = useRecoilState(signUpErrorAtom);
  const resetSignUpError = useResetRecoilState(signUpErrorAtom);

  const cleanUpEmailRelatedState = useCallback(() => {
    resetLogInError();
    resetSignUpError();
  }, [resetLogInError, resetSignUpError]);

  const logInEmail = useCallback(async (email: string, password: string) => {
    setLogInLoading(true);
    try {
      // Replace this with your login API call
      const response = await signin(email, password);
      // setTokenValue(response.data);
      // Handle response, set cookies or local storage as needed
      onClose();
      cleanUpEmailRelatedState();
    } catch (error) {
      setLogInError('Login failed'); // Replace with actual error handling
    } finally {
      const user = (await getUserInfo()).data.data;
      setUserInfo(user);
      setLogInLoading(false);
    }
  }, [cleanUpEmailRelatedState, getMe, onClose, setLogInError, setLogInLoading]);

  const signUpEmail = useCallback(async (email: string, password: string) => {
    setSignUpLoading(true);
    try {
      // Replace this with your signup API call
      const response = await signup(email, password);
      // Handle response, possibly log the user in immediately
      logInEmail(email, password);
    } catch (error) {
      setSignUpError('Signup failed'); // Replace with actual error handling
    } finally {
      setSignUpLoading(false);
    }
  }, [logInEmail, setSignUpError, setSignUpLoading]);

  return {
    user: currentUser,
    logOut,
    logOutLoading,
    isAdmin,
    isSupporter,
    isMine,
    isMineOrAdmin,
    isLoadingMe,
    getMe,
    getUserInfo,
    showLoginModalWhenLoggedOut,
    signUpEmail,
    logInEmail,
    logInLoading,
    signUpLoading,
    logInError,
    signUpError,
    cleanUpEmailRelatedState,
  };
};

export default useAuth;
