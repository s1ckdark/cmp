import { useQuery } from "@tanstack/react-query";
import { atom, useRecoilState } from "recoil";
import { isOpenState } from "@/states/sidebarState";
import NavigationIcon from "@/components/layout/NavigationIcon";
import styles from "@/styles/components/layout/NavigationBtn.module.scss";


const NavigationBtn = () => {
    const [isOpen, setIsOpen] = useRecoilState(isOpenState);
    const toggleSidebar = () => {
        setIsOpen(!isOpen)  
      };
    
    return (
        <div className={`navigationBtn ${styles.navigationBtn} flex justify-end w-full flex-wrap px-6 py-6 me-2`}>
        <button type="button" onClick={toggleSidebar} title="toggle navigation">
          <NavigationIcon />
        </button>
      </div>
    )
}

export default NavigationBtn;
