// 'use client';

import { ArgosLogoSml } from "@/public/svgs";

import styles from "./Header.module.scss";

const Header = () => {
  return (
      <div className="header">
        <div className={`${styles.container}`}>
          <div className="flex justify-end items-center h-full">
            <ArgosLogoSml />
          </div>
        </div>
      </div>
  );
};

export default Header;