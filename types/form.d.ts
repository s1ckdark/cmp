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

export interface IRegistrationForm {
    id?: string;
    username: string;
    userFullName: string;
    userType: string;
    privileges: string[];
    password: string;
    confirmPassword: string;
    email: string;
    mobile: string;
    phone: string;
    addr: string;
    addrDetail: string;
    zipcode: string;
    memberNo: string;
    memberName: string;
    salesName: string;
    admin: string;
    activated: string;
    regId: string;
    regName: string;
    regDt: string;
}

export interface ICustomersAddPerForm {
    id?: string;
    userId: string;
    name: string;
    dept: string;
    email: string;
    phoneNo: string;
    mobileNo: string;
    comment: string;

}

interface ICustomersAddrForm {
    id?: string | undefined;
    name: string;
    zipcode: string;
    addr: string;
    addrDetail: string;
    homepage: string;
}
interface ICustomersCustContactForm {
    id?: string;
    dept: string;
    name: string;
    mobileNo: string;
    email: string;
    comment: string;
}
interface ICustomersSalesForm {
    dept: string;
    userId: string;
    name: string;
    phoneNo: string;
    email: string;
    comment: string;
}
export interface ICustomersForm {
  id: string;
  memberNo: string;
  memberName: string;
  regionType: string;
  memberType: string;
  industry: string;
  businessRegNo: string;
  custCeo: string;
  custPhone: string;
  comment: string;
  custContact: ICustomersCustContactForm[];
  sales: ICustomersSalesForm;
  address: ICustomersAddrForm[];
}