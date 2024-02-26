'use client';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import Button from '@/components/Button';
import styles from './index.module.scss';
import { Toast } from '@/components/Toast';
import { useRouter } from 'next/navigation';
import { getIpAddr, getUserAgent } from '@/utils';
import { sessionAtom } from '@/states/auth';
import { useRecoilState } from 'recoil';
const SignIn = () => {
  const [session, setSession] = useRecoilState(sessionAtom);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data: any) => {
    const response = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
      ipAddr: await getIpAddr(),
      client: getUserAgent(),
    });
    if (response?.ok) {
      router.push('/landing');
      Toast('success', '로그인에 성공하였습니다.');
    } else if (response?.error) {
      Toast('error', '로그인에 실패하였습니다.');
    }
  });

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <label htmlFor="ID">ID</label>
        <input {...register('email', { required: true })} type="string" placeholder="이메일" />
        {errors.email && <p className={styles.errorMsg}>필수 입력 필드입니다</p>}
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="password">PW</label>
        <input {...register('password', { required: true })} type="password" placeholder="비밀번호 (6글자 이상)" autoComplete="off" />
        {errors.password && <p className={styles.errorMsg}>필수 입력 필드입니다</p>}
      </div>
      <Button type="submit" skin={'green'}>
        로그인
      </Button>
    </form>
  );
};
export default SignIn;
