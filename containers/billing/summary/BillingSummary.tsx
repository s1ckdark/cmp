'use client';
import React, { useEffect, useRef, useState } from 'react';
import Summary from '@/components/Summary';
import Breadcrumb from '@/components/Breadcrumb';

const BillingSummary = () => {
    return (
        <>
            <Breadcrumb />
            <Summary header={true}/>
         </>
    )
}

export default BillingSummary;