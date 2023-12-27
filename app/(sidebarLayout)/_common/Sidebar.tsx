'use client';
import NavigationBtn from "./NavigationBtn";
import Navigation from "./Navigation";
import styles from "./Sidebar.module.scss";
import { useRecoilState } from "recoil";
import { isOpenState } from "@/states";
import UserInfo  from "./UserInfo";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useRecoilState(isOpenState);
  return (
    <>
      <div className={`${styles.container} ${!isOpen ? styles.open : styles.close}`}>
        <NavigationBtn />
        <UserInfo isOpen={isOpen} />
        <Navigation />
      </div>
    </>
   )
};

export default Sidebar;
