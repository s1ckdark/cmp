'use client';
import { useQuery } from "@tanstack/react-query";
import { atom, useRecoilState } from "recoil";
import { isOpenState } from "@/states/sidebarState";
import styles from "./NavigationBtn.module.scss";
import { HambugerNavi, LeftArrow } from "@/public/svgs";

const NavigationBtn = () => {
    const [isOpen, setIsOpen] = useRecoilState(isOpenState);
    const toggleSidebar = () => {
        setIsOpen(!isOpen)  
      };
    
    return (
        <div className={`navigationBtn ${styles.navigationBtn} flex justify-end w-full flex-wrap px-6 py-6 me-2`}>
        <button type="button" onClick={toggleSidebar} title="toggle navigation">
          {!isOpen ? <LeftArrow />:<HambugerNavi />}
        </button>
      </div>
    )
}

export default NavigationBtn;
