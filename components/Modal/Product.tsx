'use client';
import styles from './Product.module.scss';
import Button from '@/components/Button';
import { apiBe } from '@/services';
import { Toast } from '@/components/Toast';
import { useRecoilState } from 'recoil';
import { modalAtom } from '@/states';
import { modalListAtom } from '@/states/modal';
import Pagination from '@/components/Pagination';

const Product = () => {
  const [data, setData] = useRecoilState(modalListAtom);
  const [modal, setModal] = useRecoilState(modalAtom);

  const onChange = (e: any) => {
    setData({ ...data, keyword: e.target.value });
  };

  const onPageChange = (page: number) => {
    setData({ ...data, currentPage: page });
  };

  const pickup = (item: any) => {
    const { id, prodName, prodType, prodDetailType, prodDetailTypeStd, stdPrice, expPrice, discountRate, estimateuseAmount, prodDesc, qty, service_start_date, service_end_date, comment } = item;
    setModal({
      ...modal,
      isOpen: false,
      data: {
        ...modal.data,
        prodId: id,
        prodName: prodName,
        prodType: prodType,
        prodDetailType: prodDetailType,
        prodDetailTypeStd: prodDetailTypeStd,
        stdPrice: stdPrice,
        expPrice: 0,
        qty: 0,
        discountRate: 0,
        estimateuseAmount: 0,
        prodDesc: prodDesc,
        comment: comment,
      },
    });
    setData({
      modalType: '',
      keyword: '',
      data: [],
      totalPages: 0,
      currentPage: 1,
    });
  };

  const onSearch = async () => {
    const url = `/product/product?prodType=${modal.data.prodType}&prodName=${data.keyword}&page=${data.currentPage}`;
    const response = await apiBe(url);
    if (response.status === 200 || response.status === 201) {
      const { content } = response.data;
      if (content.length === 0) {
        Toast('error', '상품 상세 분류가 존재하지 않습니다.');
      } else {
        setData({ ...data, modalType: modal.type, data: content, totalPages: data.totalPages, currentPage: data.currentPage });
      }
    }
  };

  return (
    <div className={styles.product}>
      <div className={styles.searchInput}>
        <input type="text" placeholder="상품명을 입력하세요." onChange={onChange} value={data.keyword} />
        <Button type="button" onClick={onSearch} skin={'green'}>
          검색
        </Button>
      </div>
      <div className={styles.productList}>
        <table>
          <thead>
            <tr>
              <th>상품분류</th>
              <th>상품명</th>
              <th>상품상세분류</th>
              <th>상품가격기준</th>
            </tr>
          </thead>
          <tbody>
            {data.data.length > 0 ? (
              data.data.map((item: any, index: number) => (
                <tr className={styles.prodTypeItem} key={`${item.prodType}-${item.prodDetailType}-${index}`} onClick={() => pickup(item)}>
                  <td className={styles.prodType}>{item.prodType}</td>
                  <td className={styles.prodName}>{item.prodName}</td>
                  <td className={styles.prodDetailType}>{item.prodDetailType}</td>
                  <td className={styles.prodTypeStd}>{item.prodDetailTypeStd}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>검색 결과가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {data.totalPages > 1 && <Pagination count={data.totalPages} page={data.currentPage} onPageChange={onPageChange} />}
    </div>
  );
};

export default Product;
