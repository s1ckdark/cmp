'use client';

import React from "react";
import Link from "next/link";

import styles from './Footer.module.scss';

const Footer = () => {
  return (
      <div className="footer">
        <div className={`${styles.container} w-100 flex justify-end align-center`}>
          {/* <div className="flex justify-start align-center items-center text-center">
            <Link href="/">회사소개</Link>
            <Link href="/">주요관계사</Link>
            <Link href="/">복지제도</Link>
            <Link href="/">채용안내</Link>
            <Link href="/">공지사항</Link>
          </div> */}
          <div className="relative py-5">
            <div className={`${styles.goodus_logo} absolute right-0`} />
            <div className={styles.copyright}><p>Copyright © 2018 goodusdata. All rights reserved.</p></div>
          </div>
        </div>
      </div>
  );
};

export default Footer;