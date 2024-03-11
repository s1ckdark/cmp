'use client';
import NavigationBtn from './NavigationBtn';
import Navigation from './Navigation';
import styles from './Sidebar.module.scss';
import { useRecoilState } from 'recoil';
import { isOpenState } from '@/states';
import UserInfo from './UserInfo';
import { useState, useEffect } from 'react';
import { getCookies } from '@/utils/cookie';
import { signIn, signOut, useSession } from 'next-auth/react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useRecoilState(isOpenState);
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<{ username: string; isAdmin: boolean }>({ username: '', isAdmin: false });
  const { data: session } = useSession();
  useEffect(() => {
    const cookie = getCookies();
    const { privileges, username, isAdmin }: any = cookie;
    if (username && isAdmin) {
      setUser({ username, isAdmin });
    }
    setMounted(true);
  }, []);

  return (
    mounted && (
      <div className={`${styles.container} ${!isOpen ? styles.open : styles.close}`}>
        <NavigationBtn />
        <UserInfo isOpen={isOpen} username={user.username} />
        <Navigation isAdmin={user.isAdmin} />
      </div>
    )
  );
};

export default Sidebar;
