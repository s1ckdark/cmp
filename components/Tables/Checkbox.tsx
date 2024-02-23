import React from 'react';
import { useRecoilState } from 'recoil';
import { confirmAtom } from '@/states/confirm';

export const Checkbox = ({ value, children, disabled, checked }: any) => {
  const [confirm, setConfirm] = useRecoilState(confirmAtom);
  const handleChange = (checked: boolean) => {
    if (checked) {
      if (!confirm?.data?.includes(value)) {
        setConfirm({ ...confirm, data: [...(confirm?.data ?? []), value] });
      }
    } else {
      setConfirm({ ...confirm, data: (confirm?.data ?? []).filter((item) => item !== value) });
    }
  };

  return (
    <label>
      <input type="checkbox" disabled={disabled} checked={checked} onChange={({ target: { checked } }) => handleChange(checked)} />
      {children}
    </label>
  );
};
