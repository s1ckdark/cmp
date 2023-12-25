'use client';
import NavigationBtn from "./NavigationBtn";
import Navigation from "./Navigation";
import styles from "./Sidebar.module.scss";
import { atom, useRecoilState } from "recoil";
import { isOpenState } from "@/states/sidebarState";
import Loading from '@/components/Loading'
import { UserName } from '@/components/Server';
import UserInfo  from "./UserInfo";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useRecoilState(isOpenState);
  return (
    <>
      <div className={`${styles.container} ${!isOpen ? styles.open : styles.close}`}>
        <NavigationBtn />
        {!isOpen ? <UserInfo/>: null}
        <Navigation />
      </div>
    </>
   )
};

export default Sidebar;
