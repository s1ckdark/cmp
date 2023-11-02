import { useCallback, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { atom, useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil';
import { authModalAtom, logInErrorAtom, logInLoadingAtom, signUpErrorAtom, signUpLoadingAtom } from '@/components/Auth/states';
import { ROLE } from '@/types/auth.d';
import useAuthModal from '@/components/Auth/useAuthModal';

const useAuth = () => {
  const { onClose } = useAuthModal();
  const [logInLoading, setLogInLoading] = useRecoilState(logInLoadingAtom);
  const [logInError, setLogInError] = useRecoilState(logInErrorAtom);
  const resetLogInError = useResetRecoilState(logInErrorAtom);

  const [signUpLoading, setSignUpLoading] = useRecoilState(signUpLoadingAtom);
  const [signUpError, setSignUpError] = useRecoilState(signUpErrorAtom);
  const resetSignUpError = useResetRecoilState(signUpErrorAtom);

  const setAuthModal = useSetRecoilState(authModalAtom);
  const [logOutLoading, setLogOutLoading] = useState(false);

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

  const cleanUpEmailRelatedState = useCallback(() => {
    resetLogInError();
    resetSignUpError();
  }, [resetLogInError, resetSignUpError]);

  const logInEmail = useCallback(
    async (email: string, password: string) => {
      setLogInLoading(true);
      setPersistence(auth, inMemoryPersistence); // 쿠키를 사용할 것이기 때문에 휘발시킨다.
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          return res.user.getIdToken().then((idToken) => {
            return postIdTokenApi(idToken);
          });
        })
        .then(() => {
          auth.signOut(); // 쿠키를 사용할 것이기 때문에 휘발시킨다.
          onClose();
          cleanUpEmailRelatedState();
        })
        .catch((err) => {
            setLogInError(err.code);
        })
        .finally(() => {
          getMe();
          setLogInLoading(false);
        });
    },
    [cleanUpEmailRelatedState, getMe, onClose, setLogInError, setLogInLoading],
  );

  const signUpEmail = useCallback(
    async (email: string, password: string) => {
      setSignUpLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          logInEmail(email, password);
        })
        .catch((err) => {
            setSignUpError(err.code);
        })
        .finally(() => {
          setSignUpLoading(false);
        });
    },
    [logInEmail, setSignUpError, setSignUpLoading],
  );

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