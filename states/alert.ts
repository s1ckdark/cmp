// alertState.js
import { atom } from 'recoil';
import { Alert } from '@/types/alert';
 
const defaultAlert: Alert = {
    title: '',
    message: '',
    onConfirm: undefined,
    onCancel: undefined,
    confirmLabel: undefined,
    cancelLabel: undefined,
};
  
export const alertState = atom<Alert>({
    key: 'alertState',
    default: defaultAlert
});




