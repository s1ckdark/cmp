import axios from 'axios';
import { atom, useRecoilState, useResetRecoilState } from 'recoil';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authState, resetLogInErrorAtom, resetSignUpErrorAtom, } from '@/states/auth';


// Define your authentication service
const authService = () => {
    const [auth, setAuth] = useRecoilState(authState);
    const queryClient = useQueryClient();
    const resetLogInError = useResetRecoilState(resetLogInErrorAtom);
    const resetSignUpError = useResetRecoilState(resetSignUpErrorAtom);

    const loginMutation = useMutation(
        async ({ username, password }) => {
            const response = await axios.post('http://localhost:8080/api/auth/login', { username, password });
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
        login: loginMutation.mutate,
        logout,
        resetLogInError,
        resetSignUpError,
    };
};

export default authService;


