import { useRecoilState } from 'recoil';
import { sessionAtom } from '@/states/auth';

export function useSession() {
  const [session, setSession] = useRecoilState(sessionAtom);

  // 세션을 로드하고 저장하는 로직을 여기에 추가할 수 있습니다.

  return { session, setSession };
}
