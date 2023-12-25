export interface Alert {
    title?: string;
    message: string | ReactNode;
    onConfirm?: () => void;
    onCancel?: () => void;
    confirmLabel?: string;
    cancelLabel?: string;
  }