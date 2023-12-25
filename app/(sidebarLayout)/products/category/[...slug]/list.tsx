'use client';
import React, { useState, useEffect } from 'react';
import ProductsTypeList from '@/containers/products/ProductsTypeList'
interface Props {
  tableName: string | null;
  pageNumber: number | null;
  className: string | null;
}

const ListPage = () => {
  return (
    <div className="container">
      <ProductsTypeList />
    </div>
  );
};

export default ListPage;
