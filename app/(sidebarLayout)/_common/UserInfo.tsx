import Link from "next/link";
import styles from "./UserInfo.module.scss";
import { IconSetting, IconHome, IconUsers } from '@/public/svgs';
import Loading from '@/components/Loading'
import { getSession } from "next-auth/react";
const UserInfo = async () => {
  const session = await getSession();
  const name = session?.user?.name ?? '';
  if(!session) return <Loading />
  return (
    <>
      <div className={styles.userinfo}>
        <div className={`${styles.container}`}>
          <div className={`${styles.user_name} text-right px-2`}>
            <p className="mb-6">{name}</p>
          </div>
          
          <div className={styles.linkArea}>
            <Link href="/admin" className="setting"><span> <IconSetting /></span></Link>
            <Link href="/user" className="user px-3"> <IconUsers /> </Link>
            <Link href="/landing" className="home"> <IconHome /> </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserInfo;
