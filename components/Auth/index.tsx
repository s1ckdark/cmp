import { Dispatch, FormEventHandler, MouseEventHandler, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { atom, useRecoilState } from 'recoil';

import useAuth from '@/hooks/useAuth';
import { showPasswordAtom } from './states';
import { LogInSchema, logInValidator } from '@/utils/validator';

import styles from './index.module.scss';
import Button from '@/components/Button';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LogIn = () => {
  const { logInEmail, logInLoading, logInError } = useAuth();
  const { data: session } = useSession();
  const router = useRouter();
  const methods = useForm<LogInSchema>({ mode: 'onBlur', resolver: yupResolver(logInValidator) });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const [showPassword, setShowPassword] = useRecoilState(showPasswordAtom);

  const submitLogIn = handleSubmit((formValues: LogInSchema) => {
    logInEmail(formValues.email, formValues.password);
  });

  const onSignIn: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    submitLogIn();
  };

  const errorMessage = Object.values(errors).length > 0 ? Object.values(errors)[0].message : undefined;
  const disabled = logInLoading;
  if(session) router.push('/landing');
  return (
    <>
    <form onSubmit={onSignIn} className={styles.loginForm}>
    <div className={`flex flex-wrap mb-3 ${styles.inputField}`}>
      <label className="inline-flex items-center justify-center px-3 text-sm text-gray-900 bg-white border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            ID
                        </label>
                        <input {...register("email", { required: true })}
                            type='string'
                            placeholder='이메일'
                            // disabled={disabled}
                            className={`${styles.input_id} rounded-none rounded-r-lg bg-white border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                        {errors.email && <span className="w-full">입력 필수 항목입니다!</span>}
      </div>
      <div className={`flex flex-wrap mb-3 ${styles.inputField}`}>
      <label className="inline-flex items-center px-3  justify-center text-sm text-gray-900 bg-white border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            PW
                        </label>
                        <input {...register("password", { required: true })}
                            type={showPassword ? 'text' : 'password'} // fix here
                            placeholder='비밀번호 (6글자 이상)'
                            autoComplete='off'
                            // disabled={disabled}
                            className={`${styles.input_password} rounded-none rounded-r-lg bg-white border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                        {errors.password && <span className="w-full">입력 필수 항목입니다!</span>}
                </div>
                <div className="mb-10">
                        <Button type='submit'
                            className={`${styles.btnLogin} px-3.5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
                            disabled={disabled}
                            skin='green'>LOGIN
                        </Button>
                    </div>
      {(logInError || errorMessage) && <div className={styles.commonError}>{logInError || errorMessage}</div>}
    </form>
    </> 
  );
};

export default LogIn;