'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import { Warning } from '@mui/icons-material';
import { DELETE_CONFIRM_DIALOG_CONST } from './DeleteConfirmDialog.const';
import { deleteConfirmDialogStyles } from './DeleteConfirmDialog.styles';
import { DeleteConfirmDialogProps } from './DeleteConfirmDialog.types';

export default function DeleteConfirmDialog({
  open,
  title,
  message,
  warningMessage,
  onConfirm,
  onCancel,
}: DeleteConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="sm"
      fullWidth
      disableScrollLock={true}
      keepMounted={false}
      sx={{
        '& .MuiDialog-paper': {
          margin: 2,
          maxHeight: 'calc(100vh - 32px)',
        },
      }}
    >
      <DialogTitle>
        <Box sx={deleteConfirmDialogStyles.titleContainer}>
          <Warning color="warning" />
          {title}
        </Box>
      </DialogTitle>

      <DialogContent>
        <Alert severity="warning" sx={deleteConfirmDialogStyles.alert}>
          <Typography variant="body1" gutterBottom>
            {message}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {DELETE_CONFIRM_DIALOG_CONST.TEXTS.cannotUndo}
          </Typography>
        </Alert>

        {warningMessage && (
          <Alert severity="error" sx={deleteConfirmDialogStyles.warningAlert}>
            <Typography variant="body2">{warningMessage}</Typography>
          </Alert>
        )}
      </DialogContent>

      <DialogActions sx={deleteConfirmDialogStyles.dialogActions}>
        <Button onClick={onCancel} variant="outlined">
          {DELETE_CONFIRM_DIALOG_CONST.TEXTS.cancel}
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          {DELETE_CONFIRM_DIALOG_CONST.TEXTS.delete}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
