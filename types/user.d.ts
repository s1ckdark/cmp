export interface UserAccessHistory {
    ipAddr: string;
    client: string;
    reg_dt: string;
  }
  
  export interface UserAccessHist {
    hist_start_dt: string;
    hist_end_dt: string;
    history: UserAccessHistory[];
  }
  
  export interface User {
    id: string;
    username: string;
    email: string;
    userType: string;
    mobile: string;
    phone: string;
    zipcode: string;
    addr: string;
    privileges: string[];
    accessHist: UserAccessHist;
    lastLogDt: string | null;
    regId: string;
    regName: string;
    regDt: string;
    modId: string | null;
    modName: string | null;
    modDt: string | null;
    memberNo: string;
    memberName: string;
    salesName: string;
    roles: string | null;
    enabled: boolean;
    admin: boolean;
    activated: boolean;
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
    authorities: string[];
    accountNonLocked: boolean;
    userFullName: string;
  }