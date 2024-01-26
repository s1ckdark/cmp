import { useEffect, useRef, useState } from 'react'
import Styles from './index.module.scss';
import { usePathname } from 'next/navigation';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { dataListAtom } from '@/states/data';
import { monthAtom } from '@/states';
import { IconSearch } from '@/public/svgs';
import { Toast } from '../Toast';
import { apiBe } from '@/services';
import { pathSpliter } from '@/utils/data';
import { url } from 'inspector';

export interface SearchBarProps {
  placeholder: string
  onChange: (value: string) => void
  value: string
  disabled?: boolean
}
interface fetchingProps {
  memberName?: string;
  targetMonth?: string;
  pageNumber?: number;
  userName?: string;
  userEmail?: string;
}

interface boxProps {
  placeholder: string
  wording?: string
}
const Searchbar = ({ rowType }:{rowType:string}) => {
  const month = useRecoilValue(monthAtom);
  const [ data, setData ] = useRecoilState(dataListAtom) || null;
  const [keyword, setKeyword] = useState<string>("");
  const pathname = usePathname();
  const { pageNumber }: any = pathSpliter(pathname);
  const matching: any = {
    "/billing/invoice/list": {
      "placeholder": "업체명을 입력해주세요",
    },
    "/products/product/list": {
      "placeholder": "업체명을 입력해주세요",
    },
    "/admin/log/list": {
      "placeholder": "유저명을 입력해주세요",
    },
    "/admin/user/list": {
      "placeholder": "유저명을 입력해주세요",
    },
    "/billing/product/list": {
      "placeholder": "고객명을 입력해주세요",
    }
  }
  const init = () => {
    const path = pathname.split('/').slice(0, 4).join('/');
    return matching[path].placeholder;
  }
  const onChange = (value: string) => {
    setKeyword(value);
  }
  
  const fetching = async (rowType:string, params:any) => {
    const endpoint: any = {
      invoice: {
        url: `/invoice/search`,
        key: 'content'
      },
      log: {
        url: `/user/logging`,
        key:'content'
      },
      billingProduct: {
        url:  `/product/gdbilling`
      }
    }
    const response = await apiBe.get(endpoint[rowType].url, { params: params});
    if (response.status === 200 && response.data.content !== null) {
        setData({ data: response.data.content, totalPages: response.data.totalPages, currentPage: pageNumber});
    } else {
        Toast('error', '데이터를 불러오는데 실패하였습니다.');
    }
};


  const onSearch = async() => {
    Toast('info', '검색중입니다.');
    const params:any = {
      "invoice": {
        page: pageNumber || 1,
        targetMonth: month,
        memberName: keyword
      },
      "log": {
        page:  pageNumber || 1,
        userName: keyword
      },
      "billingProduct": {
        page: pageNumber || 1,
        memberName: keyword,
        targetMonth: month
      }
    }
    fetching(rowType, params[rowType]);
  };


  return (
    <div className={Styles.searchBar}>
      {/* <Button type="button" onClick={searchAll} skin={"green"} className={Styles.searchAllBtn}>전체</Button> */}
      <div className={Styles.inputGroup}>
        <input
          type="text"
          placeholder={init()}
          value={keyword}
          onChange={(e) => onChange(e.target.value)}
          role="searchbox"
        />
        <span className={Styles.searchBtn} onClick={onSearch}><IconSearch /></span>
      </div>
    </div>
  )
}
export default Searchbar;