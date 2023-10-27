import { useRecoilState } from 'recoil';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { authState } from '@/states/auth';

const useAuth = () => {
    const [auth, setAuth] = useRecoilState(authState);
    const queryClient = useQueryClient();

    const loginMutation = useMutation(
        async ({ username, password }) => {
            const response = await axios.post('/api/login', { username, password });
            return response.data.user;
        },
        {
            onSuccess: (user) => {
                setAuth({ user });
                queryClient.invalidateQueries('userData');
            },
        }
    );

    const logout = () => {
        setAuth({ user: null });
        queryClient.invalidateQueries('userData');
    };

    return {
        user: auth.user,
        login: loginMutation.mutate,
        logout,
        isLoggingIn: loginMutation.isLoading,
    };
};
export default useAuth;


