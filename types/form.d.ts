export interface registrationData {
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

export interface ProductForm {
    productName: string;
    productCategory: string;
    productSubCategory: string;
    officialPrice: number;
    vendorSalesName: string;
    vendorSalesContact: string;
    vendorSalesEmail: string;
    comment: string;
}

export interface useInputType {
    state: any;
    action: any;
}

export interface loginForm {
    email: string;
    password: string;
}
