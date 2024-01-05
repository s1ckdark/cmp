'use client';
// import { useState, useCallback } from 'react';
// import { signin, getUserInfo  } from '@/services/auth';
// import { Privileges, User } from '@/types/auth.d'; // Assuming ROLE and User types are defined here
// import { useSetRecoilState, useRecoilState, useResetRecoilState } from 'recoil';
// import { recoil } from '@/states/sessionStorage';
// import { logInErrorAtom, logInLoadingAtom, signUpErrorAtom, signUpLoadingAtom, resetSignUpErrorAtom, } from '@/states/auth';
// import { signIn } from 'next-auth/react'
// import { Toast } from '@/components/Toast';
// import { useRouter } from 'next/navigation';
// import {  parseCookies, setCookie  } from 'nookies';
;
// interface UseAuthHook {
//   user: User | null;
//   logOut: () => void;
//   logOutLoading: boolean;
//   isAdmin: boolean;
//   isTech: boolean;
//   isMine: (authorId: string) => boolean;
//   isMineOrAdmin: (authorId: string) => boolean;
//   isLoadingMe: boolean;
//   getUseInfoLocal: () => void;
//   getUserInfo: () => void;
//   showLoginModalWhenLoggedOut: (callback?: () => void) => void;
//   signUpEmail: (email: string, password: string) => Promise<void>;
//   logInEmail: (email: string, password: string) => Promise<void>;
//   logInLoading: boolean;
//   signUpLoading: boolean;
//   logInError: string;
//   signUpError: string;
//   cleanUpEmailRelatedState: () => void;
//   onLoginSuccess: (response: any) => void;
//   onSilentRefresh: () => void;
// }

const useAuth = () => {
  // const [logOutLoading, setLogOutLoading] = useState(false);
  // const [ userInfo, setUserInfo ] = useRecoilState(recoil);
  // const [logInLoading, setLogInLoading] = useRecoilState(logInLoadingAtom);
  // const [logInError, setLogInError] = useRecoilState(logInErrorAtom);
  // const resetLogInError = useResetRecoilState(logInErrorAtom);
  // const [signUpLoading, setSignUpLoading] = useRecoilState(signUpLoadingAtom);
  // const [signUpError, setSignUpError] = useRecoilState(signUpErrorAtom);
  // const resetSignUpError = useResetRecoilState(signUpErrorAtom);
  // const router = useRouter();
//   const { data: currentUser = null, refetch, isLoading: isLoadingMe} = useQuery({
//     queryKey: ['getUserInfoLocal'], queryFn: () =>
//       getUserInfoLocal()
//         .then((res) => res.data)
//         .catch(() => {
//           return null;
//         }),
//     retry: 0,
//   });

//   const isAdmin = useMemo(() => currentUser?.privileges.includes(Privileges.admin), [currentUser?.privileges]);
//   const isTech = useMemo(() => currentUser?.privileges.includes(Privileges.tech), [currentUser?.privileges]);
//   const isSale = useMemo(() => currentUser?.privileges?.includes(Privileges.sale), [currentUser?.privileges]);
//   const isCustomer = useMemo(() => currentUser?.privileges?.includes(Privileges.customer), [currentUser?.privileges]);

//   const isOwner = useCallback(
//     (authorId: string) => {
//       return currentUser?.id === authorId;
//     },
//     [currentUser],
//   );

//   const isOwnerOrAdmin = useCallback(
//     (authorId: string) => {
//       return isAdmin || isOwner(authorId);
//     },
//     [isAdmin, isOwner],
//   );

//   const getUserInfo = () => {
//     refetch();
//   };

//   const logOut = () => {
//     setLogOutLoading(true);
//     logoutApi()
//       .then(() => {
//         getUserInfo();
//       })
//       .finally(() => {
//         setLogOutLoading(false);
//       });
//   };

//   const showLoginModalWhenLoggedOut = (callback?: () => void) => {
//     if (!currentUser) {
//       setAuthModal('login');
//       return;
//     }
//     callback?.();
//   };


  // const cleanUpEmailRelatedState = useCallback(() => {
  //   resetLogInError();
  //   resetSignUpError();
  // }, [resetLogInError, resetSignUpError]);

  // const logInEmail = useCallback(async (email: string, password: string) => {
  //   setLogInLoading(true);
  //   try {
  //     const response:any = await signIn("credentials", {
  //       email: email, 
  //       password: password,
  //       redirect: false,
  //       callbackUrl: "/landing"
  //     });
  //     if(response.ok) {
  //       // Toast('success', 'Login Success',() => router.push('/landing'))
  //     } else { Toast('error','Login Failed')}
  //     cleanUpEmailRelatedState();
  //     setLogInLoading(false)
  //   } catch (error: any) {
  //     Toast('error', error)
  //     setLogInError(`Login failed ${error.code}`); // Replace with actual error handling
  //   } 
  // }, [cleanUpEmailRelatedState, getUserInfo, setLogInError, setLogInLoading]);

//   const signUpEmail = useCallback(async (email: string, password: string) => {
//     setSignUpLoading(true);
//     try {
//       const response = await signup(email, password);
//       logInEmail(email, password);
//     } catch (error) {
//       setSignUpError('Signup failed'); // Replace with actual error handling
//     } finally {
//       setSignUpLoading(false);
//     }
//   }, [logInEmail, setSignUpError, setSignUpLoading]);

  return {
    // user: currentUser,
    // logOut,
    // logOutLoading,
    // isAdmin,
    // isTech,
    // isSale,
    // isCustomer,
    // isOwner,
    // isOwnerOrAdmin,
    // isLoadingMe,
    // getUserInfo,
    // showLoginModalWhenLoggedOut,
    // signUpEmail,
    // logInEmail,
    // logInLoading,
    // signUpLoading,
    // logInError,
    // signUpError,
    // cleanUpEmailRelatedState,
  };
};

export default useAuth;
