import axios from "axios";

/** 숫자를 입력받아 갯수만큼 아이템을 가진 어레이 리턴 */
export const getNumberArr = (length: number): number[] => {
    return Array.from({ length }, (_, i) => i);
};

/** 숫자를 M, K 등으로 단위 묶음 리턴 */
export const shrinkNumber = (value: number | string) => {
    if (typeof value === 'string') return value;
    if (value >= 1_000_000) {
        return `${parseInt(String(value / 1_000_000), 10).toString()}M`;
    }
    if (value >= 1_000) {
        return `${parseInt(String(value / 1000), 10).toString()}K`;
    }
    return value;
};


export const valueOr = (value: string | boolean | undefined, _placeholder?: string, ifTrue?: string) => {
    const placeholder = _placeholder ?? '-';
    if (typeof value === 'undefined') return placeholder;
    if (typeof value === 'boolean') return value ? ifTrue : placeholder;
    if (value === '') return placeholder;
    return ifTrue ?? value;
};

export const getIpAddr = async() => {
    const response = await axios("https://api.ipify.org?format=json");
    const result = response.data;
    return result.ip;
}
    
export const getUserAgent = () => {
    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;
    const randomString = Math.random().toString(20).substring(2, 14) + Math.random().toString(20).substring(2, 14);

    const deviceID = `${userAgent}-${platform}-${randomString}`;
    return deviceID;
}