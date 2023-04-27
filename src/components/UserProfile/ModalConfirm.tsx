import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import warningIcon from '../../assets/images/warning.png';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: '#fff',
  padding: '24px',
  borderRadius: '24px',
  textAlign: 'center',
};

const styleBtn = {
  fontWeight: 600,
  fontSize: '16px',
  lineHeight: '24px',
  padding: '8px',
  borderRadius: '24px',
  width: '150px',
  cursor: 'pointer',
};

interface Props {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

export default function ModalConfirm({ showModal, setShowModal }: Props) {
  const { t } = useTranslation(['userProfile']);

  return (
    <div>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img src={warningIcon} alt="" />
          <Typography
            id="modal-modal-title"
            sx={{
              fontWeight: 700,
              color: 'var(--primary-color)',
              fontSize: '20px',
              lineHeight: '24px',
              marginTop: '28px',
            }}
          >
            {t('deleteProfile')}
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{
              color: 'rgba(0, 0, 0, 0.8)',
              fontSize: '16px',
              lineHeight: '24px',
            }}
          >
            {t('warningDeleteProfile')}
          </Typography>
          <Grid
            container
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '24px',
            }}
          >
            <Grid
              item
              sx={{
                color: 'rgba(0, 0, 0, 0.8)',
                border: 'var(--primary-border)',
                ...styleBtn,
              }}
              onClick={() => setShowModal(false)}
            >
              {t('cancel')}
            </Grid>
            <Grid
              item
              sx={{
                ...styleBtn,
                bgcolor: 'var(--delete-color)',
                color: '#fff',
              }}
            >
              {t('delete')}
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
