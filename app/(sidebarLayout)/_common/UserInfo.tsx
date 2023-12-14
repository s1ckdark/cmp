import Link from "next/link";
import styles from "./UserInfo.module.scss";
import { IconSetting, IconHome, IconUsers } from '@/public/svgs';
import Loading from '@/components/Loading'
import { useSession } from 'next-auth/react';

const UserInfo = () => {
  const { data: session, status } = useSession();
  const isOpen = true;
  
  if(session) {
  return (
    <>
      <div className={`userinfo ${styles.container}`}>
        <div className="container mx-auto p-6">
          <div className={`${styles.user_name} text-right px-2`}>
            <p className="mb-6">{session.user.name}</p>
          </div>
          
          <div className="link_area flex items-center justify-end px-2">
            <Link href="/admin" className="setting"><span> <IconSetting /></span></Link>
            <Link href="/user" className="user px-3"> <IconUsers /> </Link>
            <Link href="/landing" className="home"> <IconHome /> </Link>
          </div>
        </div>
      </div>
    </>
  );
  } else {
      return <Loading />
  }
};

export default UserInfo;
