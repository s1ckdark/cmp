'use client';
import Breadcrumb from '@/components/bradcrumb/Breadcrumb';
import { TableHeader } from '@/components/Tables';
import React from 'react';
import InfoSection from './InfoSection';
import Usage from './Usage';
import Summary from './Summary';
import styles from './index.module.scss';
import { PdfExport } from '@/components/PdfExport';
import Button from '@/components/Button';
interface invoiceProps {
    customer: string;
    type: string;
}

const Invoice: React.FC<invoiceProps> = ({ type, customer }) => {
    const handlePdf = (id: string) => {
        PdfExport('invoice');
    };

    const breadcrumbs = [
        { href: '/', label: 'Home' },
        { href: '/billing', label: 'Billing' },
        { href: `/billing/${type}/invoice`, label: 'List' }
    ];
    return (
        <>
            <Breadcrumb title={customer} breadcrumbs={breadcrumbs} />
            <div id="invoice">
                <InfoSection
                    type="supply"
                    name="주식회사 웹코퍼레이션"
                    ceo="김웹"
                    license="211-88-87207"
                    address="서울특별시 강남구 테헤란로 427 위워크타워"
                    phone="02-1234-5678"
                />
                <InfoSection
                    type="client"
                    name="(주)굿어스데이터"
                    ceo="굿어스"
                    license="211-88-87207"
                    address="서울특별시 강남구 테헤란로 427 위워크타워"
                    phone="02-1234-5678"
                />
                <Usage type="invoiceUsage" />
                <Summary />
            </div>
            <Button onClick={handlePdf} skin="green">pdf</Button>

        </>
    )
}

export default Invoice;