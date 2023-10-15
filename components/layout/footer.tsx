'use client';
import React from "react";
import Link from "next/link";


const Footer = ({ toggle }: { toggle: () => void }) => {
    return (
        <>
          <div className="w-full h-20">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center">
                <Link href="/"><p>회사소개</p></Link>
                <Link href="/"><p>주요관계사</p></Link>
                <Link href="/"><p>복지제도</p></Link>
                <Link href="/"><p>채용안내</p></Link>
                <Link href="/"><p>공지사항</p></Link>
              </div>
              <div className="flex justify-between items-center">
                <p>Footer</p>
            </div>
          </div>
        </div>
      </>
  );
};

export default Footer;