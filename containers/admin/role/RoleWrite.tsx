'use client';
import Breadcrumb from "@/components/Breadcrumb";
import React, { useEffect, useState } from 'react';
import RoleForm from '@/components/Form/RoleForm';

const RoleEdit = () => {
       return (
        <>
            <Breadcrumb />
            <RoleForm type={"write"} />
            
        </>
    )
}
export default RoleEdit;