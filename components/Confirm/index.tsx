'use client';
import Dialog from './Dialog';
import Button from '@/components/Button';

import { useRecoilState, useResetRecoilState } from 'recoil';
import { confirmAtom } from '@/states/confirm';
import { use } from 'react';

// <span onClick={() => setConfirmOpen(true)}>&times;</span><Confirm open={confirmOpen} onClose={()=>setConfirmOpen(false)} title="삭제" content="삭제 하시겠습니까?" onConfirm={()=>deleteSWProd(form.id, item.prodId)} />
const Confirm = () => {
  const [confirm, setConfirm] = useRecoilState(confirmAtom);
  const resetConfirm = useResetRecoilState(confirmAtom);
  const { open, title, message, onConfirm } = confirm;
  if (!open) {
    return <></>;
  }
  
  const onClose = () => {
    resetConfirm();
  }

  return (
    <Dialog open={confirm.open} onClose={onClose}>
      <h2 className="text-xl">{title}</h2>
      <div className="py-5">{message}</div>
      <div className="flex justify-end">
        <div className="p-1">
          <Button onClick={() => { onClose(); onConfirm(); }} skin="green"> 예 </Button>
        </div>
        <div className="p-1">
          <Button onClick={() => onClose()} skin="cancel">아니오</Button>
        </div>
      </div>
    </Dialog>
  );
 }
export default Confirm;