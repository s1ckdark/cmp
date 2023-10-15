'use client';
import React from "react";
import Link from "next/link";


const Header = ({ toggle }: { toggle: () => void }) => {
  return (
    <>
      <div className="w-full h-20 bg-emerald-800 sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <p>Header</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;