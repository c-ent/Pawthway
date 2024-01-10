import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { supabase } from '../supabaseClient';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const LostPetForm = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [imageURL, setImageURL] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              setPreview(reader.result);
          };
          reader.readAsDataURL(file);
      } else {
          setPreview(null);
      }
  };
    
    

    async function handleSubmit(e) {
      e.preventDefault();
      const { 
        reward, name, animalType, color, size, age, 
        lastSeenLocation, placeLost, dateLost, contact, description 
      } = e.target.elements;
    
      let fileURL = null;
    
      // Handle file upload
      if (selectedFile) {
        const filePath = `missingPets/${selectedFile.name}`;
        const { data: uploadData, error: uploadError } = await supabase
          .storage
          .from('petImages')
          .upload(filePath, selectedFile, {
            cacheControl: '3600',
            upsert: false
          });
    
        if (uploadError) {
          console.error('Error uploading image: ', uploadError);
          return;
        } else {
          console.log('Image uploaded successfully: ', uploadData);
          fileURL = uploadData.path;
        }
      }
    
      // Insert data into database
      const { data: insertData, error: insertError } = await supabase
        .from('missingPets')
        .insert([
          { 
            imageURL: fileURL ? `https://porojjoxqjqbgxlkxzmy.supabase.co/storage/v1/object/public/petImages/${fileURL}` : null,
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
      if (insertError) {
        console.error('Error inserting data:', insertError);
      } else {
        handleClose();
      }
    }

    console.log(preview)

    
  
    return (
      <div>


        <button className="flex  items-center bg-violet-500 rounded-md  px-2 text-white font-bold mb-5"onClick={handleOpen} >
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
    <div className="flex bg-white p-4 rounded-md gap-20">
      <div className='flex-1'>
    
    <label className='w-full inline-block text-center cursor-pointer'>
    
            {!preview && (
               <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 61 61" fill="none">
               <path d="M36.4996 40.7241L32.2061 36.4664C30.2329 34.5096 29.2461 33.5311 28.1101 33.1641C27.1109 32.8411 26.0354 32.8411 25.0359 33.1641C23.9 33.5311 22.9133 34.5096 20.9399 36.4664L10.9427 46.5354M36.4996 40.7241L37.3529 39.8776C39.3679 37.8796 40.3751 36.8806 41.5311 36.5161C42.5476 36.1954 43.6399 36.2079 44.6489 36.5519C45.7959 36.9431 46.7801 37.9649 48.7484 40.0086L50.8379 42.1301M36.4996 40.7241L46.3879 50.7869M10.9427 46.5354C11.0195 47.1864 11.1525 47.6976 11.3829 48.1499C11.8622 49.0906 12.6271 49.8556 13.5679 50.3349C14.6375 50.8799 16.0376 50.8799 18.8379 50.8799H42.8379C44.3911 50.8799 45.5136 50.8799 46.3879 50.7869M10.9427 46.5354C10.8379 45.6464 10.8379 44.4964 10.8379 42.8799V18.8799C10.8379 16.0796 10.8379 14.6795 11.3829 13.6099C11.8622 12.6691 12.6271 11.9042 13.5679 11.4249C14.6375 10.8799 16.0376 10.8799 18.8379 10.8799H28.3379M46.3879 50.7869C47.0896 50.7121 47.6316 50.5776 48.1079 50.3349C49.0486 49.8556 49.8136 49.0906 50.2929 48.1499C50.8379 47.0804 50.8379 45.6801 50.8379 42.8799V33.3799M45.8379 23.3799V15.8799M45.8379 15.8799V8.37988M45.8379 15.8799H53.3379M45.8379 15.8799H38.3379" stroke="black" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
             </svg>
            )}
            {preview && <img src={preview} alt="preview" className='w-full' />}
    <input 
        type="file" 
        accept="image/*" 
        multiple 
        onChange={handleFileChange}
        className="hidden"
    />
</label>
      </div>

      <div className='flex-1'>
        <h2 id="modal-modal-title" className="text-2xl font-bold mb-2">
          Lost Pet Form
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className='flex gap-2'>
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
          </div>

          <div className='flex gap-2'>
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
            name="animalType"
            placeholder="Animal Type"
            className="w-full p-2 border rounded-md"
            />
          </div>

          <div className='flex gap-2'>
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
          </div>


          <div className='flex gap-2'>
            <input
              name="placeLost"
              placeholder="Place Lost"
              className="w-full p-2 border rounded-md"
            />
            <input
            name="lastSeenLocation"
            placeholder="Last Seen Location"
            className="w-full p-2 border rounded-md"
            />
          </div>

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
            Post
          </button>
        </form>
      </div>
      
    </div>
  </Box>
</Modal>
      </div>
    );
}

export default LostPetForm