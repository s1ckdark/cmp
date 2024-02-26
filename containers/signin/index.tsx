'use client';
import { ArgosLogoSml } from '@/public/svgs';
import styles from './index.module.scss';
import Auth from '@/components/Auth';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import Button from '@/components/Button';
import { getCookies } from '@/utils/cookie';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { sessionAtom } from '@/states/auth';
import { destroyCookie } from 'nookies';
const Login = () => {
  const [session, setSession] = useRecoilState(sessionAtom);
  const router = useRouter();

  const logout = () => {
    destroyCookie(null, 'auth', { path: '/' });
    signOut();
  };
  useEffect(() => {
    const auth = getCookies();
    if (auth === 'undefined') {
      signOut();
      destroyCookie(null, 'auth');
    }
    if (auth !== 'undefined' && session?.id !== '') router.push('/landing');
  }, []);
  return (
    <main className="flex items-center justify-center w-screen h-screen">
      <div className={`${styles.bgIntro} flex w-1/2 h-screen items-center justify-center`}></div>
      <div className={`${styles.loginForm} flex w-1/2 h-screen items-center justify-center flex-col}`}>
        <div className="mb-10">
          <ArgosLogoSml />
        </div>
        <div className={styles.loginForm}>
          {!session?.accessToken ? (
            <Auth />
          ) : (
            <>
              <Button type="button" className="mb-3" onClick={() => router.push('/landing')} skin={'gray'}>
                첫화면으로 이동
              </Button>
              <Button onClick={() => logout()} type="button" skin={'green'}>
                로그 아웃
              </Button>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Login;
