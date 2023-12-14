  
 export type CustomerData = {
    totalItems: number;
    totalPages: number;
    customers: Customer[];
    currentPage: number;
  };
  

  interface CustomerContract {
    id: string;
    name: string | null;
    desc: string | null;
    contNo: string | null;
    contType: string | null;
    contAmount: number;
    contStatus: string | null;
    cont_start_dt: string | null;
    cont_end_dt: string | null;
    attachment: string | null;
    regId: string;
    regDt: string;
    regName: string | null;
    modId: string | null;
    modDt: string | null;
    modName: string | null;
  }
  
  interface CustomerItem {
    id: string;
    memberNo: string;
    memberName: string;
    regionType: string;
    memberType: string | null;
    industry: string;
    businessRegNo: string;
    customerContacts: any | null; // Replace 'any' with a more specific type if possible
    salesContacts: any | null; // Replace 'any' with a more specific type if possible
    addresses: any | null; // Replace 'any' with a more specific type if possible
    contracts: CustomerContract[];
    comment: string;
    regId: string | null;
    regDt: string;
    regName: string | null;
    modId: string | null;
    modDt: string | null;
  }
