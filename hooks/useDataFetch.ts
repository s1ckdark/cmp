// useDataFetch.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { dataState } from '@/states/dataState';
import { fetchData, UseDataFetchReturnType } from '@/types/data';

const fetchData = async (url: string): Promise<fetchData> => {
    const response = await axios.get<fetchData>(url);
    return response.data;
};

const useDataFetch = (url: string): UseDataFetchReturnType => {
    const [data, setData] = useRecoilState(dataState);

    const { data: fetchedData, isLoading, isError } = useQuery<fetchData, Error>(['data', url], () => fetchData(url), {
        onSuccess: (data) => {
            setData(data);
        },
    });

    return { data, fetchedData, isLoading, isError };
};

export default useDataFetch;