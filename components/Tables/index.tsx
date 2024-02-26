'use client';
import React, { useEffect, useState } from 'react';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import styles from './index.module.scss';
import { TablesProps } from '@/types/data';
import Pagination from '@/components/Pagination';
import { useRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';
// import { currentPageAtom } from "@/states";
import { dataListAtom } from '@/states/data';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Button from '@/components/Button';
import Loading from '@/components/Loading';
import { pathSpliter, filterUrl } from '@/utils/data';
import { apiBe } from '@/services';
import { Toast } from '@/components/Toast';
import { toast } from 'react-toastify';
import { modalAtom } from '@/states';
import { confirmAtom } from '@/states/confirm';
import Confirm from '@/components/Confirm';
import _, { set } from 'lodash';
import Select from 'react-select';
interface dataProps {
  data: any;
  totalPages: number;
  currentPage?: number;
  totalElements?: number;
}
const pageSize = [
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 30, label: '30' },
];
export const Tables = ({ rowType }: TablesProps) => {
  const resetState = useResetRecoilState(dataListAtom);
  const resetModalState = useResetRecoilState(modalAtom);
  const resetConfirmState = useResetRecoilState(confirmAtom);
  const [resultData, setResultData] = useRecoilState(dataListAtom);
  const [data, setData] = useState({
    mode: 'normal',
    params: {},
    currentPage: 1,
    totalPages: 1,
    totalElements: 1,
    data: [],
  });
  const [mounted, setMounted] = useState(false);
  const [confirm, setConfirm] = useRecoilState(confirmAtom);
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const sort = {
    sortField: searchParams.get('sort') || 'regDt',
    sortType: searchParams.get('direction') || 'desc',
    size: searchParams.get('size') || 10,
  };
  let endpointUrl: any = {
    invoice: {
      pageUrl: '/billing/invoice',
      delete: {
        url: '',
        params: {},
      },
      list: '',
      update: '',
      listUrl: '',
      editUrl: '',
    },
    productGd: {
      pageUrl: '/products/product',
      delete: {
        url: '/product/product', // /api/product/product/{id}
        params: {},
      },
      list: '',
      update: '',
      listUrl: '',
      editUrl: '',
    },
    customers: {
      pageUrl: '/customers',
      delete: {
        url: '',
        params: {},
      },
      list: '',
      update: '',
      listUrl: '',
      editUrl: '',
    },
    user: {
      pageUrl: '/admin/user',
      delete: {
        url: '',
        params: {},
      },
      list: '',
      update: '',
      listUrl: '',
      editUrl: '',
    },
    billingProduct: {
      pageUrl: '/billing/product',
      delete: {
        url: '/product/gdbilling', // /api/product/gdbilling/{id}
        params: {},
      },
      list: '',
      update: '',
      listUrl: '',
      editUrl: '',
    },
    productCategory: {
      pageUrl: '/products/category',
      delete: {
        url: '',
        params: {},
      },
      list: '',
      update: '',
      listUrl: '',
      eidtUrl: '',
    },
    menu: {
      pageUrl: '/admin/menu',
      delete: {
        url: '',
        params: {},
      },
      list: '',
      update: '',
      listUrl: '',
      eidtUrl: '',
    },
    role: {
      pageUrl: '/admin/role',
      delete: {
        url: '',
        params: {},
      },
      list: '',
      update: '',
      listUrl: '',
      eidtUrl: '',
    },
    log: {
      pageUrl: '/admin/log',
      delete: {
        url: '',
        params: {},
      },
      list: '',
      update: '',
      listUrl: '',
      eidtUrl: '',
    },
    notice: {
      pageUrl: '/notice',
      delete: {
        url: '',
        params: {},
      },
      list: '',
      update: '',
      listUrl: '',
      eidtUrl: '',
    },
    support: {
      pageUrl: '/support',
      delete: {
        url: '',
        params: {},
      },
      list: '',
      update: '',
      listUrl: '',
      eidtUrl: '',
    },
  };

  useEffect(() => {
    const pathArr = path.split('/');
    const targetMonth = pathArr.length === 6 ? pathArr[4] : null;
    const pageNumber: any = Number(_.last(path.split('/')));

    const endpoint: any = {
      invoice: {
        url: '/invoice/search',
        params: { targetMonth: targetMonth, page: pageNumber },
        key: 'content',
      },
      billingProduct: {
        url: '/product/gdbilling',
        params: { target_month: targetMonth, page: pageNumber },
        key: 'content',
      },
      productCategory: {
        url: '/product/producttype',
        params: { page: pageNumber },
        key: 'content',
      },
      productGd: {
        url: '/product/product',
        params: { page: pageNumber },
        key: 'content',
      },
      customers: {
        url: '/customer',
        params: { page: pageNumber },
        key: 'content',
      },
      user: {
        url: '/user',
        params: { page: pageNumber },
        key: 'content',
      },
      menu: {
        url: '/menu',
        params: { page: pageNumber },
      },
      role: {
        url: '/role',
        params: { page: pageNumber },
      },
      log: {
        url: '/user/logging',
        params: { page: pageNumber },
        key: 'content',
      },
      notice: {
        url: '/notice',
        params: { page: pageNumber },
        key: 'content',
      },
      support: {
        url: '/supportboard/board',
        params: { page: pageNumber },
        key: 'content',
      },
    };

    const fetching = async () => {
      // let { params } = data.mode === "search" ? data : endpoint[rowType];
      let { params } = resultData.mode === 'search' ? resultData : endpoint[rowType];
      params = { ...params, ...sort };
      const response = await apiBe.get(endpoint[rowType]['url'], {
        params,
      });

      if (response.status === 200 || response.status === 201) {
        setData({
          ...data,
          data: endpoint[rowType]['key'] !== undefined ? response.data[endpoint[rowType]['key']] : response.data,
          totalPages: response.data.totalPages,
          currentPage: pageNumber,
          totalElements: response.data.totalElements,
        });
        setMounted(true);
      } else {
        Toast('error', '검색 결과가 없습니다');
      }
    };

    fetching();
  }, [path, rowType, data.currentPage, resultData, sort.sortField, sort.sortType, sort.size, confirm]);

  useEffect(() => {
    const pathArr = path.split('/');
    const targetMonth = pathArr.length === 6 ? pathArr[4] : null;
    if (resultData.mode === 'search') setResultData({ ...resultData, params: { ...resultData.params, target_month: targetMonth } });
    setData({ ...data, currentPage: 1 });
  }, []);

  const onPageChange = (newPage: number) => {
    if (data.mode === 'search') {
      setData({
        ...data,
        params: {
          ...data.params,
          page: newPage,
        },
        currentPage: newPage,
      });
    } else {
      const pageUrl = `./${newPage}?${sort.sortField !== '' ? `sort=${sort.sortField}` : ''}${sort.sortType !== '' ? `&direction=${sort.sortType}` : ''}${sort.size !== 10 ? `&size=${sort.size}` : ''}`;
      router.push(pageUrl);
    }
  };

  const write = () => {
    switch (rowType) {
      case 'user':
        return router.push(`${endpointUrl[rowType].pageUrl}/register`);
      default:
        return router.push(`${endpointUrl[rowType].pageUrl}/write`);
    }
  };

  const writeDisable = () => {
    switch (rowType) {
      case 'invoice':
        return false;
      case 'log':
        return false;
      default:
        return true;
    }
  };

  const deleteEnable = () => {
    switch (rowType) {
      case 'billingProduct':
        return true;
      case 'productGd':
        return true;
      default:
        return false;
    }
  };

  const del = async () => {
    let urls: any[] = [];
    if ((confirm?.data?.length ?? 0) === 0) {
      Toast('error', '삭제할 항목을 선택해주세요');
      return;
    }
    switch (rowType) {
      case 'billingProduct':
        confirm?.data?.map((id) => {
          urls.push(`${endpointUrl[rowType].delete.url}/${id}`);
        });
        break;
      case 'productGd':
        confirm?.data?.map((id) => {
          urls.push(`${endpointUrl[rowType].delete.url}/${id}`);
        });
        break;
      default:
        return;
    }
    const requests = urls.map((url) => apiBe.delete(url));
    Promise.all(requests)
      .then((responses) => {
        const data = responses.map((response) => response.status);
        const allAre200 = _.every(data, (value) => value === 200);
        if (allAre200) {
          Toast('success', '삭제되었습니다', () => location.reload());
        } else {
          Toast('error', '삭제에 실패했습니다');
        }
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  };
  const confirmDel = () => {
    setConfirm({
      ...confirm,
      open: true,
      title: '삭제',
      message: '삭제 하시겠습니까?',
      onConfirm: del,
    });
  };

  const onChangePageSize = (e: any) => {
    const pageSize = e.value;
    const pageUrl = sort.sortField !== '' && sort.sortType !== '' ? `./1?sort=${sort.sortField}&direction=${sort.sortType}&size=${pageSize}` : `./1?size=${pageSize}`;
    router.push(pageUrl);
  };

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#fff' : 'inherit',
      border: '1px solid #E5E5E5',
      '&:active': {
        border: '1px solid #43B69A',
        boxShadow: '0px 0px 6px #43B69A',
      },
      '&:hover': {
        border: '1px solid #43B69A',
        boxShadow: '0px 0px 6px #43B69A',
        backgroundColor: '#fff',
      },
      '&:focus': {
        border: '1px solid #43B69A',
        boxShadow: '0px 0px 6px #43B69A',
      },
    }),
    option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
      // const color = chroma(data.color);
      console.log({ data, isDisabled, isFocused, isSelected });
      return {
        ...styles,
        backgroundColor: isFocused ? '#fff' : null,
        color: '#000',
      };
    },
  };

  return (
    mounted && (
      <>
        <div className={styles.tableContainer}>
          <div className={styles.scroller}>
            <div className={styles.pageSize}>
              <Select className={styles.selector} classNamePrefix="react-select" styles={customStyles} defaultValue={pageSize[0]} name="size" options={pageSize} onChange={onChangePageSize} />
            </div>
            <table className={styles[rowType]}>
              <TableHeader rowType={rowType} />
              {data.data.length > 0 ? (
                <TableBody rowType={rowType} data={data} />
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={10} className="text-center text-xl p-10">
                      조회된 데이터가 없습니다.
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>

        <div className={styles.btnArea}>
          {data.data.length > 0 && data.totalPages && <Pagination count={data.totalPages} page={data.currentPage} onPageChange={onPageChange} />}
          {deleteEnable() && (
            <>
              <Button className={styles.delBtn} skin={'del'} onClick={confirmDel}>
                삭제
              </Button>
            </>
          )}
          {writeDisable() && (
            <Button className={styles.btn} onClick={write} skin={'green'}>
              등록
            </Button>
          )}
        </div>
      </>
    )
  );
};
