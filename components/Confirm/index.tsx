import Dialog from './Dialog';
import Button from '@/components/Button';
interface Props {
  title: string;
  content: React.ReactNode;
  open: boolean;
  onClose: Function;
  onConfirm: Function; 
}

const Confirm = (props: Props) => {
  const { open, onClose, title, content, onConfirm } = props;
  if (!open) {
    return <></>;
  }
  
  return (
    <Dialog open={open} onClose={onClose}>
      <h2 className="text-xl">{title}</h2>
      <div className="py-5">{content}</div>
      <div className="flex justify-end">
        <div className="p-1">
          <Button onClick={() => onClose()} skin="cancel">No</Button>
        </div>
        <div className="p-1">
          <Button onClick={() => { onClose(); onConfirm(); }} skin="green"> Yes </Button>
        </div>
      </div>
    </Dialog>
  );
 }
export default Confirm;