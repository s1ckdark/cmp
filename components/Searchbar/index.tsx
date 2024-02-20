import { useEffect, useRef, useState } from 'react'
import Styles from './index.module.scss';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { dataListAtom } from '@/states/data';
import { monthAtom } from '@/states';
import { IconSearch } from '@/public/svgs';
import { Toast } from '@/components/Toast';
import { apiBe } from '@/services';
import lodash, { set } from 'lodash';
import Button from '@/components/Button';
import { useRouter, usePathname } from 'next/navigation';
import { pathSpliter, filterUrl } from '@/utils/data';

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
const Searchbar = ({ rowType }: { rowType: string }) => {
  // const month = useRecoilValue(monthAtom);
  const [data, setData] = useRecoilState(dataListAtom) || null;
  const [keyword, setKeyword] = useState<string>("");
  const pathname = usePathname();
  const path = pathname.split('/').slice(0, -1).join('/');
  const url = filterUrl(pathname, "list") ? pathname.split("/").slice(0, -2).join("/") : pathname.split('/').slice(0, -1).join('/');
  const {targetMonth, pageNumber }:any = filterUrl(pathname, "list") ? pathSpliter(pathname): {pageNumber: lodash.last(pathname.split('/'))};
  const router = useRouter();
  const [reset, setReset] = useState<boolean>(false);
  const matching: any = {
    "invoice": {
      "placeholder": "업체명을 입력해주세요",
    },
    "productGd": {
      "placeholder": "상품명을 입력해주세요",
    },
    "log": {
      "placeholder": "회원명을 입력해주세요",
    },
    "user": {
      "placeholder": "회원명을 입력해주세요",
    },
    "billingProduct": {
      "placeholder": "고객명을 입력해주세요",
    },
    "customers": {
      "placeholder": "고객명을 입력해주세요",
    }
  }
  const init = () => {
    return matching[rowType].placeholder;
  }
  const onChange = (value: string) => {
    setKeyword(value);
  }
  
  const fetching = async (rowType: string, params: any) => {
    const endpoint: any = {
      invoice: {
        url: `/invoice/search`,
        key: 'content'
      },
      log: {
        url: `/user/logging`,
        key: 'content'
      },
      billingProduct: {
        url: `/product/gdbilling`,
        key: 'content'
      },
      user: {
        url: `/user`,
        key: 'content'
      },
      customers: {
        url: `/customer`,
        key: 'content'
      },
      productGd: {
        url: '/product/product',
        key: 'content'
      }
    }
    const response = await apiBe.get(endpoint[rowType].url, { params: params });
      if (response.status === 200 && response.data.totalElements > 0) {
        setData({ mode: "search", params: params, data: response.data.content, totalPages: response.data.totalPages, currentPage: params.page, totalElements: response.data.totalElements });
      } else {
        Toast('error', '검색 결과가 없습니다');
      }
    };


  const onSearch = async () => {
    if (reset === false && keyword === '') Toast('info', '검색중입니다.');
    const params: any = {
      "invoice": {
        page: 1,
        targetMonth: targetMonth,
        memberName: keyword
      },
      "log": {
        page: 1,
        userName: keyword
      },
      "billingProduct": {
        page: 1,
        memberName: keyword,
        target_month: targetMonth,
      },
      "user": {
        page: 1,
        username: keyword,
      },
      "customers": {
        page: 1,
        memberName: keyword
      },
      "productGd": {
        page: 1,
        prodName: keyword
      }
    }
    fetching(rowType, params[rowType]);
  };

  const onPageChange = (page: number) => {
    setData({ ...data, currentPage: page });
  }
  
  const searchReset = () => {
    if (data.mode === 'search') {
      setData({ mode: "normal", data: [], params: null, totalPages: 0, currentPage: 1, totalElements: 0})
      setKeyword('');
      setReset(true);
      router.push(`${path}/1`);
  } 
}
  const enterSubmit = (e:any) => {
    if(e.key === 'Enter') {
      onSearch();
    }
  }

  // useEffect(() => {
    // if (keyword === '' && reset === true) {
    //    onSearch();
    // }
    // setReset(false);
  // }, [reset]);

  return (
    <div className={Styles.searchBar}>
      <Button type="button" skin={"green"} onClick={searchReset} className={Styles.searchAllBtn}>검색초기화</Button>
      <div className={Styles.inputGroup}>
        <input
          type="text"
          placeholder={init()}
          value={keyword}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => enterSubmit(e)}
          role="searchbox"
        />
        <span className={Styles.searchBtn} onClick={onSearch}><IconSearch /></span>
      </div>
    </div>
  )
}
export default Searchbar;