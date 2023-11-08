'use client';
import { Dispatch, FormEventHandler, MouseEventHandler, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import cx from 'clsx';
import useAuth from '@/hooks/useAuth';
import { useRecoilValue } from 'recoil';
import { LogInSchema, logInValidator } from '@/utils/validator';
import { showPasswordAtom } from './states';
import useAuthModal from './useAuthModal';
import Button from '@/components/Button';
// import { Modal } from '@/components/Modal';
import styles from './index.module.scss';
import EmailBased from './EmailBased';

const Auth = () => {
  const { authModal, onClose } = useAuthModal();
  const showPassword = useRecoilValue(showPasswordAtom);
  const { logInEmail, logInLoading, logInError } = useAuth();

  const methods = useForm<LogInSchema>({ mode: 'onBlur', resolver: yupResolver(logInValidator) });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const submitLogIn = handleSubmit((formValues: LogInSchema) => {
    logInEmail(formValues.email, formValues.password);
  });

  const onSignIn: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    submitLogIn();
  };

  const errorMessage = Object.values(errors).length > 0 ? Object.values(errors)[0].message : undefined;
  const disabled = logInLoading;
  return (
      <>
        <EmailBased />
      </>
  );
};

export default Auth;