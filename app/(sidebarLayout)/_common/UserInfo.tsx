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
          <div className={`${styles.user_name} flex text-right px-2`}>
            {username &&  <Link href="/mypage" className="user ml-4"> <p className="mb-6">{username || ''}</p></Link>}
            <Link href="/landing" className="home ml-4"> <IconHome /> </Link>
          </div>
          
          <div className={styles.linkArea}>
            {/* <Link href="/admin" className="setting"><span> <IconSetting /></span></Link> */}
           {/* <IconUsers /> </Link> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default UserInfo;
