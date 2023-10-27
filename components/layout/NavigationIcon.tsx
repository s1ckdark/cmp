import { useQuery } from "@tanstack/react-query";
import { atom, useRecoilState } from "recoil";
import { isOpenState } from "@/states/sidebarState";

const NavigationIcon = () => {
    const [isOpen, setIsOpen] = useRecoilState(isOpenState);
    const toggleSidebar = () => {
        setIsOpen(!isOpen)  
      };
    return !isOpen ? <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.5 0.5H39.5V39.5H0.5V0.5Z" fill="#343A41" stroke="#505C6C"/>
    <path d="M25 12L15 20L25 28" stroke="#AFBDCA" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>:<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.5 0.5H39.5V39.5H0.5V0.5Z" fill="#343A41" stroke="#505C6C"/>
<rect x="8" y="11" width="24" height="4" fill="#AFBDCA"/>
<rect x="8" y="18" width="24" height="4" fill="#AFBDCA"/>
<rect x="8" y="25" width="24" height="4" fill="#AFBDCA"/>
</svg>
  }

export default NavigationIcon;
