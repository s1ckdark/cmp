'use client';
import Link from "next/link";
import styles from "./UserInfo.module.scss";
import { IconSetting, IconHome, IconUsers } from '@/public/svgs';
import Loading from '@/components/Loading'
import { useSession } from 'next-auth/react';
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import {useState, useEffect } from 'react';

const UserInfo = () => {
  const [name, setName] = useState<string>('');
  const cookies = parseCookies()
 
  useEffect(() => {
    if(cookies.userName === 'undefined') {
      const { data: session, status } = useSession();
      setName(session.user.name)
      setCookie(null, 'userName', name, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      })
    } else {
      console.log("cookie");
      setName(cookies.userName)
    }
  }, [])
  
  // if(!name) return <Loading/>
  return (
    <>
      <div className={styles.userinfo}>
        <div className={`${styles.container}`}>
          <div className={`${styles.user_name} text-right px-2`}>
            <p className="mb-6">{name ||''}</p>
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
