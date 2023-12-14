'use client';
import Link from "next/link";
import Styles from "./Navgiation.module.scss";
import React,{ useEffect } from "react";
import { IconNaviBot, IconNaviBill, IconNaviClient, IconNaviNotice, IconNaviProduct, IconNaviSupport } from "@/public/svgs";
const Navigation = () => {
    const toggleDropdown = (level:number, event:any) => {
        // Prevent the default action of the event
        event.preventDefault();

        const toggle = (dropdown:any) => {
            // Toggle the visibility of the dropdown
            if (dropdown.classList.contains('hidden')) {
                dropdown.classList.remove('hidden');
                dropdown.classList.add('visible');
            } else {
                dropdown.classList.remove('visible');
                dropdown.classList.add('hidden');
            }
        }
        // Depending on the level, find the corresponding dropdown menu
        let dropdown;
        if (level === 1) {
            dropdown = event.target.children.nextElementSibling;
            console.log(dropdown);
            toggle(dropdown);
        } 
    
    }


    return (
        <>
            <div className={`navgiation ${Styles.container} mx-auto px-4 py-6`}>
                <div className="flex flex-wrap justify-end text-right">
                    <div className={Styles.navigationItem}>
                        <div className={Styles.depthFirst} onClick={(e)=> toggleDropdown(1, e)}>
                            <div className={Styles.firstItem}>
                            <p className="flex justify-end">공지사항</p>
                            <span> <IconNaviNotice /> </span>
                            </div>
                            <div className={`${Styles.depthSecond} hidden depthSecond`}>
                                <div className={`${Styles.depthThird} hidden depthThird`}>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={Styles.navigationItem}>
                        <div className={Styles.depthFirst} onClick={(e)=> toggleDropdown(1, e)}>
                            <div className={Styles.firstItem}>
                            <p className="flex justify-end">빌링</p>
                            <span> <IconNaviBill /> </span>
                            </div>
                            <div className={`${Styles.depthSecond} hidden depthSecond`}>
                                <div><p>전체요약</p></div>  
                                <div>
                                    <p>고객사</p>
                                    <div className={`${Styles.depthThird} hidden depthThird`}>
                                        <div><p>요약</p></div>
                                        <div><p>고객자사상품</p></div>
                                    </div>
                                </div>
                                <div>
                                    <p>빌링내역</p>
                                    <div className={`${Styles.depthThird} hidden depthThird`}>
                                        <div><p>전체이용내역서</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={Styles.navigationItem}>
                        <div className={Styles.depthFirst} onClick={(e)=> toggleDropdown(1, e)}>
                            <div className={Styles.firstItem}>
                            <p className="flex justify-end">자사상품</p>
                            <span> <IconNaviProduct /> </span>
                            </div>
                        
                        <div className={`${Styles.depthSecond} hidden depthSecond`}>
                        <div className={`${Styles.depthThird} hidden depthThird`}></div>
                        </div>
                        </div>
                    </div>
                    <div className={Styles.navigationItem}>
                        <div className={Styles.depthFirst} onClick={(e)=> toggleDropdown(1, e)}>
                        <div className={Styles.firstItem}>
                        <p className="flex justify-end">고객사</p>
                        <span> <IconNaviClient /> </span>
                        </div>
                        
                        <div className={`${Styles.depthSecond} hidden depthSecond`}>
                        <div className={`${Styles.depthThird} hidden depthThird`}></div>
                        </div>
                        </div>
                    </div>
                    <div className={Styles.navigationItem}>
                        <div className={Styles.depthFirst} onClick={(e)=> toggleDropdown(1, e)}>
                        <div className={Styles.firstItem}>
                        <p className="flex justify-end">지원</p>
                        <span> <IconNaviSupport /> </span>
                        </div>
                        
                        <div className={`${Styles.depthSecond} hidden depthSecond`}>
                        <div className={`${Styles.depthThird} hidden depthThird`}></div>
                        </div> 
                        </div>
                    </div>
                    <div className={Styles.navigationItem}>
                        <div className={Styles.depthFirst} onClick={(e)=> toggleDropdown(1, e)}>
                        <div className={Styles.firstItem}>
                        <p className="flex justify-end">지식관리</p>
                        <span><IconNaviBot /></span>
                        </div>
                        <div className={`${Styles.depthSecond} hidden depthSecond`}>
                                <div><p>고객지원</p></div>
                                <div><p>내부지원</p></div>
                                <div className={`${Styles.depthThird} hidden depthThird`}>
                                    <div>전체고객사</div>
                                    <div>요약</div>
                                </div>
                                <div className={`${Styles.depthThird} hidden depthThird`}>
                                    <div><p>빌링내역</p>
                                        <div>전체이용내역서</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navigation
