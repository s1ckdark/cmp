import { atom } from 'recoil';

interface ISession {
  id: string;
  accessToken: string;
  refreshToken: string;
  username: string;
  privillege: string;
}

export const sessionAtom = atom<ISession>({
  key: 'sessionAtom',
  default: { id: '', accessToken: '', refreshToken: '', username: '', privillege: '' },
});
