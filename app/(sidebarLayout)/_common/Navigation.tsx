
import Link from "next/link";
import React,{ useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState, useRecoilValue } from "recoil";
import { dataListAtom, keywordAtom } from "@/states/data";
import { modalAtom } from "@/states";
import { isOpenState } from "@/states";
import { IconNaviBot, IconNaviBill, IconNaviClient, IconNaviNotice, IconNaviProduct, IconNaviSupport, IconSetting } from "@/public/svgs";
import _ from "lodash";
import { usePathname, useRouter } from "next/navigation";
import dayjs from "dayjs";
import Styles from "./Navgiation.module.scss";

const NavItem = ({ item, depthIndex }:{item:any, depthIndex:number}) => {
    const pathname = usePathname();
    const router = useRouter();
    // const [ data, setData ] = useRecoilState(dataListAtom);
    // const [ modal, setModal ] = useRecoilState(modalAtom);
    const [isDepthOpen, setIsDepthOpen] = useState(false);
    const [isOpen, setIsOpen] = useRecoilState(isOpenState);
    const hasChildren = item.children && item.children.length > 0;
    const isActive = item.link === pathname;
    const resetState = useResetRecoilState(dataListAtom);
    const resetModalState = useResetRecoilState(modalAtom);
    const resetKeyword = useResetRecoilState(keywordAtom);
    const handleClick = (e:any) => {
            e.preventDefault(); // Prevent the default navigation behavior
            resetKeyword();
            resetState();
            resetModalState();
            if(_.includes(item.link, pathname)) {
                // resetState();
                // resetModalState();
                router.push(pathname);
            } else { router.push(item.link) }
    };

    useEffect(() => {
        // Automatically set isDepthOpen to false when isOpen is false
        if (isOpen) {
            setIsDepthOpen(false);
        } 
    }, [isOpen]);

    const toggle = () => {
        // Toggle isDepthOpen only if isOpen is true
        if (!isOpen) {
            setIsDepthOpen(!isDepthOpen);
           
        } else {
            setIsOpen(!isOpen)
        }
    };

    const renderIcon = (icon: string) => {
        switch (icon) {
            case 'IconSetting':
                return <IconSetting />;
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
    const depthClass:string = `depth_${depthIndex}`;
    return (
        <li className={ isDepthOpen ? `${Styles.navigationItem} ${Styles.open} ${Styles.active}`: `${Styles.navigationItem}`}>
            <Link href={item.link} onClick={hasChildren ? toggle : (e) => handleClick(e)} className={`${Styles.depth} ${Styles[depthClass]}`}>
                <p className="flex justify-end">{item.label}</p>{item.icon && <span>{renderIcon(item.icon)}</span>} 
                {/* {hasChildren ? (isDepthOpen ? '[-]' : '[+]') : ''} */}
            </Link>
            {hasChildren && isDepthOpen &&  (
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
    const currentMonth = dayjs().format("YYYYMM");
    const navigationData = [
        {
            "label": "어드민",
            "icon": "IconSetting",
            "link": "#",
            "children": [
                {
                    "label": "회원 관리",
                    "children": [],
                    "link": "/admin/user/list/1"
                },
                                {
                    "label": "접속 이력",
                    "children": [],
                    "link": "/admin/log/list/1"
                },
                // {
                //     "label": "메뉴 관리",
                //     "children": [],
                //     "link": "/admin/menu/list/1"
                // },
                {
                    "label": "롤 관리",
                    "children": [],
                    "link": "/admin/role/list/1",
                }
            ]
        },
        {
            "label": "공지사항",
            "icon": "IconNaviNotice",
            "children": [],
            "link": "/notice/list/1"
        },
        {
            "label": "고객사",
            "icon": "IconNaviClient",
            "children": [],
            "link": "/customers/list/1",
        },
        {
            "label": "빌링",
            "icon": "IconNaviBill",
            "link": "#",
            "children": [
                {
                    "label": "전체요약",
                    "children": [],
                    "link": `/billing/overview/${currentMonth}`,
                },
                {
                    "label": "고객사 자사상품",
                    "children": [],
                    "link": `/billing/product/list/${currentMonth}/1`,
                },
                {
                    "label": "전체 이용 내역",
                    "children": [],
                    "link": `/billing/invoice/list/${currentMonth}/1`,
                }
            ]
        },
        {
            "label": "자사상품",
            "icon": "IconNaviProduct",
            "children": [
                {
                    "label": "자사상품 전체",
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
            "label": "지원",
            "icon": "IconNaviSupport",
            "children": [],
            "link": "/support/list/1",
        },
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
