// 'use client';
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import NavigationBtn from "@/components/layout/NavigationBtn";
import UserInfo from "@/components/layout/userInfo";
import Navigation from "@/components/layout/Navigation";
import styles from "@/styles/components/layout/Sidebar.module.scss";
import { atom, useRecoilState } from "recoil";
import { isOpenState } from "@/states/sidebarState";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useRecoilState(isOpenState);

  return (
    <>
      <div className={`${styles.container} h-screen fixed ${isOpen ? styles.open : ""}`}>
        <NavigationBtn />
        <UserInfo />
        <Navigation />
      </div>
    </>
  );
};

export default Sidebar;
