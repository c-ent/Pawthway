import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { supabase } from '../supabaseClient';

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

const LostPetForm = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    async function handleSubmit(e) {
      e.preventDefault();
      const { 
        imageURL, reward, name, animalType, color, size, age, 
        lastSeenLocation, placeLost, dateLost, contact, description 
      } = e.target.elements;
    
      const { data, error } = await supabase
        .from('missingPets')
        .insert([
          { 
            imageURL: imageURL ? imageURL.value : null,
            reward: reward ? reward.value : null,
            name: name ? name.value : null, 
            animalType: animalType ? animalType.value : null,
            color: color ? color.value : null, 
            size: size ? size.value : null,
            age: age ? age.value : null,
            lastSeenLocation: lastSeenLocation ? lastSeenLocation.value : null,
            placeLost: placeLost ? placeLost.value : null,
            dateLost: dateLost ? dateLost.value : null,
            contact: contact ? contact.value : null,
            description: description ? description.value : null,

          },
        ]);
      if (error) {
        console.error('Error inserting data:', error);
      } else {
        handleClose();
      }
    }



    const [uploadedImages, setUploadedImages] = React.useState([]);
    const handleImageUpload = (e) => {
        if (uploadedImages.length >= 4) {
          alert('You can only upload 4 images.');
          return;
        }
      
        const files = Array.from(e.target.files).slice(0, 4 - uploadedImages.length);
        const images = files.map(file => URL.createObjectURL(file));
        setUploadedImages(oldImages => [...oldImages, ...images]);
      };
    
  
    return (
      <div>


        <button className="flex  items-center bg-violet-500 rounded-md  px-2 text-white font-bold mb-5"onClick={handleOpen} >
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 61 61" fill="none">
        <path d="M12.002 32.6492C15.7588 22.2382 24.2774 13.9702 34.9095 17.2153C42.3285 19.4797 39.2162 23.6993 42.0992 26.4734C43.7258 27.7249 48.1419 26.0452 49.2842 27.6076C50.294 28.9894 49.5644 31.5103 49.2842 33.1651C48.1788 39.6901 40.6989 40.6505 34.3617 40.6505" stroke="white" stroke-opacity="0.9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M49.652 30.0003C49.1297 29.0091 47.9378 28.0824 46.502 27.3003" stroke="white" stroke-opacity="0.9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M20.7389 28.0835C20.3618 30.1367 14.5485 44.1219 20.5668 45.3134C31.7438 46.91 30.4023 34.1961 30.4023 26.2505" stroke="white" stroke-opacity="0.9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M36.002 26.1003V26.8503" stroke="white" stroke-opacity="0.9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
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
    <div className="bg-white p-4 rounded-md">
      <div className='flex-1'>
        {uploadedImages.map((image, index) => (
          <img 
            key={index} 
            src={image} 
            alt={`Uploaded ${index + 1}`} 
            className='w-24' 
            onClick={() => setMainImage(image)} 
          />
        ))}
        <input 
          type="file" 
          accept="image/*" 
          multiple 
          onChange={(e) => handleImageUpload(e)}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <h2 id="modal-modal-title" className="text-xl font-bold mb-2">
        Lost Pet Form
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Pet's Name"
          className="w-full p-2 border rounded-md"
        />
         <input
          name="reward"
          placeholder="Pet's Reward"
          className="w-full p-2 border rounded-md"
        />
        <input
          name="breed"
          placeholder="Breed"
          className="w-full p-2 border rounded-md"
        />
        <input
          name="color"
          placeholder="Color"
          className="w-full p-2 border rounded-md"
        />
        <input
          name="lastSeenLocation"
          placeholder="Last Seen Location"
          className="w-full p-2 border rounded-md"
        />
        <input
          name="animalType"
          placeholder="Animal Type"
          className="w-full p-2 border rounded-md"
        />
        <input
          name="size"
          placeholder="Size"
          className="w-full p-2 border rounded-md"
        />
        <input
          name="age"
          placeholder="Age"
          className="w-full p-2 border rounded-md"
        />
        <input
          name="placeLost"
          placeholder="Place Lost"
          className="w-full p-2 border rounded-md"
        />
        <input
          name="dateLost"
          placeholder="Date Lost"
          className="w-full p-2 border rounded-md"
        />
        <input
          name="contact"
          placeholder="Contact"
          className="w-full p-2 border rounded-md"
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full p-2 border rounded-md"
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  </Box>
</Modal>
      </div>
    );
}

export default LostPetForm