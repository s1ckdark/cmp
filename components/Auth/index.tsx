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
import { Modal } from '@/components/Modal';
import styles from './index.module.scss';

const AuthModal = () => {
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
    <Modal isShow={!!authModal} onClose={onClose} closeIcon>
      <div className={styles.authModal}>
        <form onSubmit={onSignIn}>
        <div className={styles.inputWrapper}>
            <input {...register('email')} type='string' placeholder='이메일' disabled={disabled} />
        </div>
        <div className={styles.inputWrapper}>
            <input
            {...register('password')}
            type={showPassword ? 'string' : 'password'}
            placeholder='비밀번호 (6글자 이상)'
            autoComplete='off'
            disabled={disabled}
            />
            {/* {!disabled && <FancyEyeBall showPassword={showPassword} setShowPassword={setShowPassword} />} */}
        </div>
        <Button type='submit' disabled={disabled} skin='primary'>
            로그인
        </Button>
        {(logInError || errorMessage) && <div className={styles.commonError}>{logInError || errorMessage}</div>}
        </form>
      </div>
    </Modal>
  );
};

export default AuthModal;