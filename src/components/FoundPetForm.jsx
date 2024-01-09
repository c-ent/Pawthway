import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const FoundPetForm = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    return (
      <div>


        <button className="flex  items-center bg-green-600 rounded-md  px-2 text-white font-bold mb-5"onClick={handleOpen} >
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 61 61" fill="none">
        <path d="M12.002 32.6492C15.7588 22.2382 24.2774 13.9702 34.9095 17.2153C42.3285 19.4797 39.2162 23.6993 42.0992 26.4734C43.7258 27.7249 48.1419 26.0452 49.2842 27.6076C50.294 28.9894 49.5644 31.5103 49.2842 33.1651C48.1788 39.6901 40.6989 40.6505 34.3617 40.6505" stroke="white" strokeOpacity="0.9" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M49.652 30.0003C49.1297 29.0091 47.9378 28.0824 46.502 27.3003" stroke="white" strokeOpacity="0.9" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20.7389 28.0835C20.3618 30.1367 14.5485 44.1219 20.5668 45.3134C31.7438 46.91 30.4023 34.1961 30.4023 26.2505" stroke="white" strokeOpacity="0.9" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M36.002 26.1003V26.8503" stroke="white" strokeOpacity="0.9" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
            Post
        </button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      </div>
    );
}

export default FoundPetForm