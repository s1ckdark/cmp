import Link from 'next/link';
import styles from './UserInfo.module.scss';
import { IconSetting, IconHome, IconUsers, IconLogout } from '@/public/svgs';
import Loading from '@/components/Loading';
import { parseCookies } from 'nookies';
import { apiBePure } from '@/services';
import { useRouter } from 'next/navigation';
import { destroyCookie, setCookie } from 'nookies';
import { Toast } from '@/components/Toast';
import { signIn, signOut, useSession } from 'next-auth/react';
import { getCookies } from '@/utils/cookie';

const UserInfo = ({ isOpen }: { isOpen: boolean }) => {
  const { data: session }: any = useSession();
  const router = useRouter();
  const cookie = getCookies();
  const username = cookie && cookie.username ? cookie.username : session?.user.username;
  if (username === undefined) router.push('/signin');

  const logout = async () => {
    destroyCookie(null, 'auth', { path: '/' });
    const response = await apiBePure.post('/auth/logout', { userId: session.user.id, accessToken: session.accessToken, refreshToken: session.refreshToken });
    if (response.status === 200) {
      router.push('/signin');
      Toast('success', '로그아웃하였습니다', () => signOut());
    }
  };

  return (
    <>
      <div className={`${styles.userinfo} ${!isOpen ? styles.open : styles.close}`}>
        <div className={`${styles.container}`}>
          <div className={`${styles.user_name} flex text-right px-2`}>
            {username && (
              <Link href="/mypage" className="user ms-12">
                {' '}
                <p className="mb-6">{username}</p>
              </Link>
            )}
          </div>

          <div className={styles.linkArea}>
            <Link href="/landing" className="home ml-4">
              {' '}
              <IconHome />
            </Link>
            <span onClick={logout} className="logout">
              <IconLogout />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
