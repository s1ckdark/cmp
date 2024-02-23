import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';
import { dataListAtom, keywordAtom } from '@/states/data';
import { modalAtom } from '@/states';
import { isOpenState } from '@/states';
import { IconNaviBot, IconNaviBill, IconNaviClient, IconNaviNotice, IconNaviProduct, IconNaviSupport, IconSetting } from '@/public/svgs';
import _ from 'lodash';
import { usePathname, useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import Styles from './Navgiation.module.scss';

const NavItem = ({ item, depthIndex }: any) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isDepthOpen, setIsDepthOpen] = useState(false);
  const [isOpen, setIsOpen] = useRecoilState(isOpenState);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = pathname === item.link;
  const resetState = useResetRecoilState(dataListAtom);
  const resetModalState = useResetRecoilState(modalAtom);
  const resetKeyword = useResetRecoilState(keywordAtom);

  const handleClick = (e: any) => {
    e.preventDefault(); // Prevent default link action
    if (isOpen) setIsOpen(!isOpen); // Close sidebar when clicking a link
    resetKeyword();
    resetState();
    resetModalState();
    if (item.link !== pathname) {
      router.push(item.link);
    }
  };

  useEffect(() => {
    // Automatically set isDepthOpen to false when isOpen is false
    if (isOpen) {
      setIsDepthOpen(false);
    }
  }, [isOpen]);

  const toggle = (e: any) => {
    if (isOpen) setIsOpen(!isOpen);
    setIsDepthOpen(!isDepthOpen);
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
  const depthClass = `depth_${depthIndex}`;
  const activeClass = isActive ? Styles.active : '';

  return (
    <li className={`${Styles.navigationItem} ${isDepthOpen ? Styles.open : ''} ${activeClass}`}>
      <Link href={item.link} onClick={hasChildren ? (e: any) => toggle(e) : handleClick} className={`${Styles.depth} ${Styles[depthClass]} ${activeClass}`}>
        <p className="flex justify-end">{item.label}</p>
        {item.icon && <span>{renderIcon(item.icon)}</span>}
      </Link>
      {hasChildren && isDepthOpen && (
        <ul>
          {item.children.map((child: any, index: number) => (
            // Pass the current depthIndex + 1 to maintain depth tracking
            <NavItem key={index} item={child} depthIndex={depthIndex + 1} />
          ))}
        </ul>
      )}
    </li>
  );
};

const Navigation = () => {
  const isOpen = useRecoilValue(isOpenState);
  const currentMonth = dayjs().format('YYYYMM');
  const navigationData = [
    {
      label: '어드민',
      icon: 'IconSetting',
      link: '#',
      children: [
        {
          label: '회원 관리',
          children: [],
          link: '/admin/user/list/1',
        },
        {
          label: '접속 이력',
          children: [],
          link: '/admin/log/list/1',
        },
        // {
        //     "label": "메뉴 관리",
        //     "children": [],
        //     "link": "/admin/menu/list/1"
        // },
        {
          label: '롤 관리',
          children: [],
          link: '/admin/role/list/1',
        },
      ],
    },
    {
      label: '공지사항',
      icon: 'IconNaviNotice',
      children: [],
      link: '/notice/list/1',
    },
    {
      label: '고객사',
      icon: 'IconNaviClient',
      children: [],
      link: '/customers/list/1',
    },
    {
      label: '빌링',
      icon: 'IconNaviBill',
      link: '#',
      children: [
        {
          label: '전체요약',
          children: [],
          link: `/billing/overview/${currentMonth}`,
        },
        {
          label: '고객사 자사상품',
          children: [],
          link: `/billing/product/list/${currentMonth}/1`,
        },
        {
          label: '전체 이용 내역',
          children: [],
          link: `/billing/invoice/list/${currentMonth}/1`,
        },
      ],
    },
    {
      label: '자사상품',
      icon: 'IconNaviProduct',
      children: [
        {
          label: '자사상품 전체',
          link: '/products/product/list/1',
          children: [],
        },
        {
          label: '상품분류 관리',
          link: '/products/category/list/1',
          children: [],
        },
      ],
      link: '#',
    },

    {
      label: '지원',
      icon: 'IconNaviSupport',
      children: [],
      link: '/support/list/1',
    },
  ];

  return (
    <nav className={!isOpen ? `${Styles.container} ${Styles.open}` : `${Styles.container} ${Styles.close}`}>
      <ul>
        {navigationData.map((item: any, index: number) => (
          <NavItem key={index} item={item} depthIndex={0} />
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
