export interface DeleteConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  warningMessage?: string;
  onConfirm: () => void;
  onCancel: () => void;
}
