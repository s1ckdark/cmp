'use client';
import Link from "next/link";
import Styles from "./Navgiation.module.scss";
import React,{ useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { isOpenState } from "@/states/sidebarState";
import { IconNaviBot, IconNaviBill, IconNaviClient, IconNaviNotice, IconNaviProduct, IconNaviSupport } from "@/public/svgs";

const NavItem = ({ item, depthIndex }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = item.children && item.children.length > 0;
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const renderIcon = (icon: string) => {
        switch (icon) {
            case 'IconNaviNotice':
                return <IconNaviNotice />;
            case 'IconNaviBill':
                return <IconNaviBill />;
            case 'IconNaviProduct':
                return <IconNaviProduct />;
            case 'IconNaviClient':
                return <IconNaviClient />;
            case 'IconNaviSupport':
                return <IconNaviSupport />;
            case 'IconNaviBot':
                return <IconNaviBot />;
            default:
                return <IconNaviNotice />;
        }
    };
    const depthClass = "depth_"+depthIndex;
    return (
        <li className={ isOpen ? `${Styles.navigationItem} ${Styles.open}`: `${Styles.navigationItem}`}>
            <Link href={item.link} onClick={hasChildren ? toggle : null} className={`${Styles.depth} ${Styles[depthClass]}`}>
                <p className="flex justify-end">{item.label}</p>{item.icon && <span>{renderIcon(item.icon)}</span>} 
                {/* {hasChildren ? (isOpen ? '[-]' : '[+]') : ''} */}
            </Link>
            {hasChildren && isOpen && (
                <ul>
                    {item.children.map((child: any, index: number) => (
                        <NavItem key={index} item={child} depthIndex={depthIndex + 1} />
                    ))}
                </ul>
            )}
        </li>
    );
};


const Navigation = () => {
    const isOpen = useRecoilValue(isOpenState);
    const navigationData = [
        {
            "label": "공지사항",
            "icon": "IconNaviNotice",
            "children": [],
            "link": "#"
        },
        {
            "label": "빌링",
            "icon": "IconNaviBill",
            "link": "#",
            "children": [
                {
                    "label": "전체요약",
                    "children": [],
                    "link": "/billing/overview",
                },
                {
                    "label": "고객 자사 상품",
                    "children": [],
                    "link": "/billing/product/list/1",
                },
                {
                    "label": "전체 이용 내역서",
                    "link": "/billing/invoice/list/1",
                    "children": []
                }
            ]
        },
        {
            "label": "자사상품",
            "icon": "IconNaviProduct",
            "children": [
                {
                    "label": "전체",
                    "link": "/products/product/list/1",
                    "children": []
                },
                {
                    "label": "상품분류 관리",
                    "link": "/products/category/list/1",
                    "children": []
                }
            ],
            "link": "#",
        },
        {
            "label": "고객사",
            "icon": "IconNaviClient",
            "children": [],
            "link": "#",
        },
        {
            "label": "지원",
            "icon": "IconNaviSupport",
            "children": [],
            "link": "#",
        },
        {
            "label": "지식관리",
            "icon": "IconNaviBot",
            "link": "#",
            "children": [
                {
                    "label": "고객지원",
                    "link": "#",
                    "children": [
                        {
                            "label": "전체고객사",
                            "children": [], 
                            "link": "/notice",
                        },
                        {
                            "label": "요약",
                            "children": [],
                            "link": "/notice",
                        }
                    ]
                },
                {
                    "label": "내부지원",
                    "link": "#",
                    "children": [
                        {
                            "label": "빌링내역",
                            "link": "#",
                            "children": [
                                {
                                    "label": "전체이용내역서",
                                    "children": [],
                                    "link": "/notice",
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ];    
    
    return (
        <nav className={!isOpen ? `${Styles.container} ${Styles.open}`:`${Styles.container} ${Styles.close}`}>
            <ul>
                {navigationData.map((item:any, index:number) => (
                    <NavItem key={index} item={item} depthIndex={0}/>
                ))}
            </ul>
        </nav>
    );
};

export default Navigation;
