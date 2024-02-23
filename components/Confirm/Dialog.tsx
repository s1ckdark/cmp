import styles from './Dialog.module.scss';

interface Props {
  children: React.ReactNode;
  open: boolean;
  onClose: Function;
}
const Dialog = (props: Props) => {
  const { open, onClose } = props;
  if (!open) {
    return <></>;
  }
    return (
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex bg-black/50">
      <div className={`${styles.dialogbox} relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow-md`}>
      <div>{props.children}</div>
      <span className="absolute top-0 right-0 p-4">     
       <span onClick={() => onClose()} className={styles.closeBtn}>
          &times;
       </span>
     </span>
     </div>
   </div>
 );
}
export default Dialog;