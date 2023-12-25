import { useEffect, useRef, useState } from 'react'
import Styles from './index.module.scss';
import { usePathname } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { searchAtom } from '@/states/data';
import { IconSearch } from '@/public/svgs';
import Button from '@/components/Button';
export interface SearchBarProps {
  placeholder: string
  onChange: (value: string) => void
  value: string
  disabled?: boolean
}

interface boxProps {
  placeholder: string
  wording: string
}
const SearchBar = () => {
  const [search, setSearch] = useRecoilState(searchAtom);
  const [box, setBox] = useState<boxProps>({placeholder:"", wording:""});
  const pathname = usePathname();

  const matching:any = {
    "/billing/invoice/list": {
      "placeholder":"업체명을 입력해주세요",
      "wording":"전체 내역"
    }
  }
  const init = (pathname:string) => {
    const path = pathname.split('/').slice(0,4).join('/');
    setBox(matching[path]);
  }
  const onChange = (value: string) => {
    setSearch({...search, keyword:value});
  }
  const searchAll = () => {
    setSearch({...search, keyword:"",excute:true});
  }
  const onSearch = () => {
    setSearch({...search, excute: true});
  }
  useEffect(() => {
    init(pathname);
  },[pathname])

  const {placeholder, wording} = box;
  return (
    <div className={Styles.searchBar}>
      <div className={Styles.inputGroup}>
      <input
        type="text"
        placeholder={placeholder}
        value={search.keyword}
        onChange={(e) => onChange(e.target.value)}
        role="searchbox"
      />
      <span className={Styles.searchBtn} onClick={onSearch}><IconSearch /></span>
    </div>
      <Button type="button" onClick={searchAll} skin={"green"} className={Styles.searchAllBtn}>{wording}</Button>
    </div>
  )
}
export default SearchBar;