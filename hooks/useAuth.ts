import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import authService from '@/services/authService';

const useAuth = () => {
    const [error, setError] = useState(null);
    const queryClient = useQueryClient();

    const loginMutation = useMutation(
        ({ username, password }) => authService.login(username, password),
        {
            onSuccess: (data) => {
                // 로그인 성공 시 처리
                queryClient.setQueryData('user', data.user);
            },
            onError: (error) => {
                // 에러 처리
                setError(error);
            },
        }
    );

    const login = async (username, password) => {
        try {
            await loginMutation.mutateAsync({ username, password });
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return {
        login,
        error,
        isLoading: loginMutation.isLoading,
    };
};

export default useAuth;
