import { atom, selector, selectorFamily } from 'recoil';

interface IConfirm {
    open: boolean;
    title: string;
    message?: string;
    data?: any[],
    onConfirm: () => void;
}

export const confirmAtom = atom<IConfirm>({
    key: 'confirmAtom',
    default: {
      open: false,
      title: '',
      message: '',
      data: [] || null,
      onConfirm: () => {}
    }
});
