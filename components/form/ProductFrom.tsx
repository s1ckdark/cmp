'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { ProductForm } from '@/types/form';

const ProductForm = () => {
    const initialFormData: ProductForm = {
        productName: '',
        productCategory: '',
        productSubCategory: '',
        officialPrice: 0,
        vendorSalesName: '',
        vendorSalesContact: '',
        vendorSalesEmail: '',
        comment: '',
    };

    const [formData, setFormData] = useState<ProductForm>(initialFormData);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <form action="#" method="post">
        <label htmlFor="productName">상품명:</label>
        <input type="text" id="productName" name="productName"/>
    
        <label htmlFor="productCategory">상품분류:</label>
        <input type="text" id="productCategory" name="productCategory"/>
    
        <label htmlFor="productSubCategory">상품상세분류:</label>
        <input type="text" id="productSubCategory" name="productSubCategory"/>
    
        <label htmlFor="officialPrice">정식단가:</label>
        <input type="number" id="officialPrice" name="officialPrice"/>
    
        <label htmlFor="vendorSalesName">벤더사 영업 이름:</label>
        <input type="text" id="vendorSalesName" name="vendorSalesName"/>
    
        <label htmlFor="vendorSalesContact">벤더사 영업 연락처:</label>
        <input type="text" id="vendorSalesContact" name="vendorSalesContact"/>
    
        <label htmlFor="vendorSalesEmail">벤더사 영업 이메일:</label>
        <input type="email" id="vendorSalesEmail" name="vendorSalesEmail"/>
    
        <label htmlFor="comment">코멘트:</label>
        <textarea id="comment" name="comment" rows="4" cols="50"></textarea>
    
        <input type="submit" value="제출"/>
    </form>
    );
}

export default ProductForm;