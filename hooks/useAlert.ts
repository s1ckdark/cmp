import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import useAuth from '@/hooks/useAuth';
import { alertState } from '@/states/alert'; // Adjust the import path as needed

const useAlert = () => {
    const { isAdmin, isSupporter, user } = useAuth();
    const [alert, setAlert] = useRecoilState(alertState);

    const addAlert = useCallback(
        (newAlert) => {
            if (!newAlert) return;
            setAlert(newAlert);
        },
        [setAlert],
    );

    const removeAlert = useCallback(() => {
        setAlert(undefined);
    }, [setAlert]);

    const limitLengthAlert = (limit, content) => {
        if (content.length <= limit) return true;
        addAlert({ message: '문자열이 범위를 초과했습니다. 확인 부탁드립니다.' });
        return false;
    };

    const deleteWarningAlert = () => {
        return new Promise((resolve) => {
            addAlert({
                message: '정말 삭제하시겠습니까?',
                onConfirm: () => resolve(null),
            });
        });
    };

    const alertUserOnly = (callback) => {
        if (!user) {
            addAlert({ message: '회원만 사용 가능합니다. 로그인해주세요' });
            return;
        }
        callback();
    };

    const alertSupporterOnly = (callback) => {
        if (isAdmin || isSupporter) {
            callback();
            return;
        }
        if (!user) {
            addAlert({ message: '미안, 구경 잘 했어? 로그인 하고 돌아오자.' });
            return;
        }
        if (!isSupporter) {
            addAlert({
                message: '서포터로 등록된 사람만 쓸 수 있는 기능이야.\n이준혁에게 메시지를 보내보자.',
            });
        }
    };

    return {
        alert,
        addAlert,
        limitLengthAlert,
        deleteWarningAlert,
        removeAlert,
        alertUserOnly,
        alertSupporterOnly,
    };
};

export default useAlert;
