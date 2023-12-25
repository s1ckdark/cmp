import { useRecoilState } from 'recoil';
import { sessionState } from '@/states/auth';

export function useSession() {
  const [session, setSession] = useRecoilState(sessionState);

  // 세션을 로드하고 저장하는 로직을 여기에 추가할 수 있습니다.

  return { session, setSession };
}
