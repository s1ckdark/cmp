'use client';
import { useRecoilState } from "recoil";
import { isOpenState } from "@/states";
import styles from "./NavigationBtn.module.scss";
import { usePathname } from "next/navigation";
import { HambugerNavi, LeftArrow } from "@/public/svgs";

const NavigationBtn = () => {
  const [isOpen, setIsOpen] = useRecoilState(isOpenState);
  const toggleSidebar = () => {
    setIsOpen(!isOpen)  
  };
  
  const pathname = usePathname();
  let current: string = pathname.split('/').slice(0, 4).join('/')
      
  return (
      <div className={`navigationBtn ${styles.navigationBtn} flex justify-end w-full flex-wrap px-6 py-6 me-2`}>
      <button type="button" onClick={toggleSidebar} title="toggle navigation">
        {!isOpen ? <LeftArrow />:<HambugerNavi />}
      </button>
    </div>
  )
}

export default NavigationBtn;
