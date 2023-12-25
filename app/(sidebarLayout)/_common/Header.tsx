// 'use client';
import Link from "next/link";
import styles from "./Header.module.scss";
import { ArgosLogoSml } from "@/public/svgs";
const Header = () => {
  return (
    <>
      <div className="header h-20">
        <div className={`${styles.container} container mx-auto px-4 h-full`}>
          <div className="flex justify-end items-center h-full">
            <ArgosLogoSml />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;