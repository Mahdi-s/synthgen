import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  useTheme,
  alpha
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

interface ChunkingConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onReplace: (chunks: string[]) => void;
  onAppend: (chunks: string[]) => void;
  pendingChunks: string[];
}

const ChunkingConfirmationDialog: React.FC<ChunkingConfirmationDialogProps> = ({
  open,
  onClose,
  onReplace,
  onAppend,
  pendingChunks
}) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: '12px',
          width: '600px', // Increased width to fit buttons
          maxWidth: '90vw',
          bgcolor: theme.palette.mode === 'dark' ? '#1D1F21' : '#FFFFFF',
        }
      }}
    >
      <DialogTitle sx={{ 
        pb: 1,
        color: theme.palette.warning.main,
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>
        <WarningIcon />
        Existing Data Found
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: 'text.secondary' }}>
          You have existing Q&A pairs in the table. How would you like to proceed with the new chunks?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ 
        px: 3, 
        pb: 2, 
        pt: 1,
        display: 'flex',
        gap: 1,
        '& > button': {
          flex: '1 0 auto', // Make buttons take equal width
          minWidth: '120px', // Ensure minimum width
        }
      }}>
        <Button
          onClick={onClose}
          startIcon={<CloseIcon />}
          sx={{ 
            color: theme.palette.text.secondary,
            borderColor: theme.palette.text.secondary,
            border: '1px solid',
            '&:hover': {
              bgcolor: theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(0, 0, 0, 0.05)',
              borderColor: theme.palette.text.primary,
            }
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => onReplace(pendingChunks)}
          startIcon={<DeleteIcon />}
          sx={{
            color: theme.palette.error.main,
            borderColor: theme.palette.error.main,
            border: '1px solid',
            '&:hover': {
              bgcolor: alpha(theme.palette.error.main, 0.08),
              borderColor: theme.palette.error.main,
            }
          }}
        >
          Replace All
        </Button>
        <Button
          onClick={() => onAppend(pendingChunks)}
          startIcon={<AddIcon />}
          variant="contained"
          sx={{
            bgcolor: theme.palette.primary.main,
            color: '#fff',
            '&:hover': {
              bgcolor: theme.palette.primary.dark,
            }
          }}
        >
          Append
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChunkingConfirmationDialog; 