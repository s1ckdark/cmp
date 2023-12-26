
export const isEmptyObject = (obj: object) => {
    if( obj === null || obj === undefined ) return true;
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export const isObjKeyExist = (obj: any, key: string) => {
    if(obj === null || obj === undefined) return false;
    return Object.keys(obj).includes(key) ? obj[key] : "N/A";
}

export const addComma = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}