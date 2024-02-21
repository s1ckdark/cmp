import Link from "next/link";
import styles from "./UserInfo.module.scss";
import { IconSetting, IconHome, IconUsers, IconLogout } from '@/public/svgs';
import Loading from '@/components/Loading'
import { parseCookies } from 'nookies';
import { apiBePure } from '@/services';
import { useRouter } from 'next/navigation';
import { destroyCookie, setCookie } from "nookies";
import { Toast } from '@/components/Toast';
import { signIn, signOut, useSession } from "next-auth/react";

const UserInfo = ({ isOpen }: { isOpen: boolean }) => {
  const { data:session }:any = useSession();
  const router = useRouter();
  const cookie = parseCookies();
  const { username } = cookie;
  const name = username ? username : session?.user.username;
  if (name && username === undefined) setCookie(null, 'username', name, { maxAge: 2 * 60 * 60, path: '/' });
  
  const logout = async () => {
    if(session !== null){
      const response = await apiBePure.post('/auth/logout', { userId: session.user.id, accessToken: session.accessToken, refreshToken: session.refreshToken });
      if (response.status === 200) {
        destroyCookie(null, 'accessToken');
        destroyCookie(null, 'refreshToken');
        destroyCookie(null, 'userId');
        destroyCookie(null, 'username');
        destroyCookie(null, 'next-auth.callback-url');
        destroyCookie(null, 'next-auth.csrf-token');
        destroyCookie(null, 'next-auth.session-token');
        Toast("success", "로그아웃하였습니다",()=>signOut());
        router.push('/signin');
      }
    } else {
    signOut();
    router.push('/signin');
  }
  }
  if(!name) router.push('/signin');
  return (
    <>
      <div className={`${styles.userinfo} ${!isOpen ? styles.open:styles.close}`}>
        <div className={`${styles.container}`}>
          <div className={`${styles.user_name} flex text-right px-2`}>
            {name &&  <Link href="/mypage" className="user ms-12"> <p className="mb-6">{name}</p></Link>}
           
          </div>
          
          <div className={styles.linkArea}>
            <Link href="/landing" className="home ml-4"> <IconHome /></Link>
            <span onClick={logout} className="logout"><IconLogout /></span>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserInfo;
