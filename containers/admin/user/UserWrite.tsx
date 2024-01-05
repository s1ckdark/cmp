'use client';
import RegistrationForm from "@/components/Form/RegistrationForm";
import Breadcrumb from "@/components/Breadcrumb";
import React, { useEffect, useState } from 'react';
import { apiBe } from "@/services";

const UserWrite = async () => {
    return (
        <>
            <Breadcrumb />
            <RegistrationForm type={'view'} />
        </>
    )
}
export default UserWrite;