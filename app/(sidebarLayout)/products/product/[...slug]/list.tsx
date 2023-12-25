'use client';
import React, { useState, useEffect } from 'react';
import ProductList from '@/containers/products/ProductsList'
interface Props {
  tableName: string | null;
  pageNumber: number | null;
  className: string | null;
}

const ListPage = ({ tableName, pageNumber, className }: Props) => {
    const [keyword, setKeyword] = useState<string>('');
  return (

    <div className="container">
      <ProductList />
    </div>
  );
};

export default ListPage;
