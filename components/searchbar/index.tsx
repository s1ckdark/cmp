import { useEffect, useRef, useState } from 'react'
import Styles from './index.module.scss';
import { usePathname } from 'next/navigation';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { dataListAtom } from '@/states/data';
import { monthAtom } from '@/states';
import { IconSearch } from '@/public/svgs';
import { Toast } from '../Toast';
import { apiBe } from '@/services';

export interface SearchBarProps {
  placeholder: string
  onChange: (value: string) => void
  value: string
  disabled?: boolean
}

interface boxProps {
  placeholder: string
  wording?: string
}
const Searchbar = () => {
  const month = useRecoilValue(monthAtom);
  const [ invoice, setInvoice ] = useRecoilState(dataListAtom) || null;
  const [keyword, setKeyword] = useState<string>("");
  const pathname = usePathname();

  const matching:any = {
    "/billing/invoice/list": {
      "placeholder":"업체명을 입력해주세요",
    },
    "/products/product/list": {
      "placeholder":"업체명을 입력해주세요",
    }
  }
  const init = () => {
    const path = pathname.split('/').slice(0,4).join('/');
    return matching[path].placeholder;
  }
  const onChange = (value: string) => {
    setKeyword(value);
  }
  
  const fetching = async (pageNumber: number, targetMonth:string = month, memberName:string) => {
    const url = `/invoice/search`;
    const response = await apiBe.get(url, { params: { memberName:memberName , targetMonth: month } });
    if (response.status === 200 && response.data.content !== null) {
        setInvoice({ data: response.data.content, totalPages: response.data.totalPages});
    } else {
        Toast('error', '데이터를 불러오는데 실패하였습니다.');
    }
};


  const onSearch = async() => {
    Toast('info', '검색중입니다.');
    fetching(1, month, keyword);
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