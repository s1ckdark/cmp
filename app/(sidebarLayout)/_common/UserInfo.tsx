import Link from "next/link";
import styles from "./UserInfo.module.scss";
import { IconSetting, IconHome, IconUsers } from '@/public/svgs';
import Loading from '@/components/Loading'
import { parseCookies } from 'nookies';

const UserInfo = ({isOpen}:{isOpen:boolean}) => {
  const cookie = parseCookies();
  const { username } = cookie;
  if(!username) return <Loading/>
  return (
    <>
      <div className={`${styles.userinfo} ${!isOpen ? styles.open:styles.close}`}>
        <div className={`${styles.container}`}>
          <div className={`${styles.user_name} text-right px-2`}>
            {username && <p className="mb-6">{username || ''}</p>}
          </div>
          
          <div className={styles.linkArea}>
            <Link href="/admin" className="setting"><span> <IconSetting /></span></Link>
            <Link href="/mypage" className="user px-3"> <IconUsers /> </Link>
            <Link href="/landing" className="home"> <IconHome /> </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserInfo;
