'use client';
import NavigationBtn from "./NavigationBtn";
import Navigation from "./Navigation";
import styles from "./Sidebar.module.scss";
import { useRecoilState } from "recoil";
import { isOpenState } from "@/states";
import UserInfo from "./UserInfo";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useRecoilState(isOpenState);
  const [ mounted, setMounted ] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, [])
  
  return mounted && (
      <div className={`${styles.container} ${!isOpen ? styles.open : styles.close}`}>
        <NavigationBtn />
        <UserInfo isOpen={isOpen} />
        <Navigation />
      </div>
   )
};

export default Sidebar;
