interface registrationData {
    memberId: string;
    memberType: string;
    permission: string;
    password: string;
    contact: string;
    landline: string;
    email: string;
    address: string;
    company: string;
}

interface ProductForm {
    productName: string;
    productCategory: string;
    productSubCategory: string;
    officialPrice: number;
    vendorSalesName: string;
    vendorSalesContact: string;
    vendorSalesEmail: string;
    comment: string;
}

interface useInputType {
    state: any;
    action: any;
}

interface loginForm {
    email: string;
    password: string;
}

export type { registrationData, ProductForm, useInputType, loginForm }; 