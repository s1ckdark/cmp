type announce = {
    id: string;
    title: string;
    reg_date: string;
}

type support = {
    id: string;
    title: string;
    client: string;    
    status: boolean;
    reg_date: string;
}

export type board = announce | support;