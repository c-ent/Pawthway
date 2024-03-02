import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import uploadimgicon from '../../images/icons/uploadimgicon.svg'
import { supabase } from '../supabaseClient';
import { useContext,useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from './SessionContext';

const LostPetForm = ({setFormSubmitted}) => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const session = useContext(SessionContext);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showOptional, setShowOptional] = useState(false);

  const navigate = useNavigate();
  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);


  const handleFilePreview = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  }

  useEffect(() => {
    handleFilePreview();
  }, [selectedFile]);

  const uploadFile = async () => {
  let fileURL = null;
  if (selectedFile) {
    const uniqueName = `${Date.now()}.${selectedFile.name.split('.').pop()}`; // Generate a unique name
    const filePath = `missingPets/${uniqueName}`;
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('petImages')
      .upload(filePath, selectedFile, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Error uploading image: ', uploadError);
    } else {
      fileURL = uploadData.path;
    }
  }
  return fileURL;
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { 
      reward, name, animalType, color, size, age, 
      lastSeenLocation, placeLost, dateLost, contact, description 
    } = e.target.elements;

    console.log("submitting start")
    
    console.log("now uploading image")
    const fileURL = await uploadFile();
    

    const BUCKET_BASE_URL = "https://porojjoxqjqbgxlkxzmy.supabase.co/storage/v1/object/public/petImages/";
    const user_id = session.user.id;
    console.log("now uploading data")
    const { data, error } = await supabase
          .from('missingPets')
          .insert([
              { 
                  user_id: user_id ? user_id : null,
                  imageURL: fileURL ? `${BUCKET_BASE_URL}${fileURL}` : null,
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
          ])
          .select();
      if (error) {
          console.error('Error inserting data:', error);
      } else {
        setIsLoading(false);
        handleClose();
        setFormSubmitted(prevState => !prevState); 
      }



      

     

  
    }
  
    return (
      <div>
        <button className="flex  h-[35px] items-center bg-[#DE692C] rounded-full  px-7 py-2 text-white font-bold mb-5"onClick={handleOpen} >
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 61 61" fill="none">
            <path d="M12.002 32.6492C15.7588 22.2382 24.2774 13.9702 34.9095 17.2153C42.3285 19.4797 39.2162 23.6993 42.0992 26.4734C43.7258 27.7249 48.1419 26.0452 49.2842 27.6076C50.294 28.9894 49.5644 31.5103 49.2842 33.1651C48.1788 39.6901 40.6989 40.6505 34.3617 40.6505" stroke="white" strokeOpacity="0.9" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M49.652 30.0003C49.1297 29.0091 47.9378 28.0824 46.502 27.3003" stroke="white" strokeOpacity="0.9" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20.7389 28.0835C20.3618 30.1367 14.5485 44.1219 20.5668 45.3134C31.7438 46.91 30.4023 34.1961 30.4023 26.2505" stroke="white" strokeOpacity="0.9" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M36.002 26.1003V26.8503" stroke="white" strokeOpacity="0.9" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg> */}
            Post a missing pet
        </button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
           <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 md:w-10/12 bg-white shadow-2xl p-4  max-h-[800px] overflow-y-auto">
            {session ? (
            <div className="flex md:flex-row flex-col bg-white p-4 rounded-md gap-0 md:gap-20">
                <div className='flex-1  flex items-center'>
                  <label className='w-full inline-block text-center cursor-pointer'>
                    {!preview && (
                      <img src={uploadimgicon} alt='uploadimgicon' className='w-full h-full' />
                    )}

                    {preview && <img src={preview} alt="preview" className='w-full h-full object-contain' />}
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className='flex-1'>


                  <h2 id="modal-modal-title" className="text-2xl font-bold mb-2">
                    Post a missing pet
                  </h2>

                  <form className="space-y-2 md:space-y-4" onSubmit={handleSubmit}>
  <div className='flex gap-2'>
    <label>
      Pet's Name
      <input
        name="name"
        placeholder="James"
        className="w-full p-2 border rounded-md"
      />
    </label>
    <label>
      Animal Type
      <select
        name="animalType"
        className="w-full p-2 border rounded-md"
      >
        <option value="Dog" selected>Dog</option>
        <option value="Cat">Cat</option>
        <option value="Fish">Fish</option>
        <option value="Bird">Bird</option>
        <option value="Rabbit">Rabbit</option>
        <option value="Hamster">Hamster</option>
        <option value="Guinea Pig">Guinea Pig</option>
        <option value="Turtle">Turtle</option>
        <option value="Other">Others</option>
      </select>
    </label>
  </div>

  <div className='flex gap-2'>
    <label>
      Place Lost
      <input
        name="placeLost"
        placeholder="Purok 2, Brgy. San Jose"
        className="w-full p-2 border rounded-md"
      />
    </label>
    <label className=''>
      Date Lost
      <input
        type="date"
        name="dateLost"
        className="w-full p-2 border rounded-md"
      />
    </label>
  </div>

  <div className='flex gap-2'>
    <label>
      Contact
      <input
        type="tel"
        name="contact"
        placeholder="09123456789"
        className="w-full p-2 border rounded-md"
      />
    </label>
    <label>
      Pet's Reward
      <input
        type="number"
        name="reward"
        placeholder="1000"
        className="w-full p-2 border rounded-md"
      />
    </label>
  </div>

  <label>
    Description
    <textarea
      name="description"
      placeholder="Description"
      className="w-full p-2 border rounded-md"
    />
  </label>

  <div>
    <input
      type="checkbox"
      id="optional"
      name="optional"
      checked={showOptional}
      onChange={() => setShowOptional(!showOptional)}
    />
    <label htmlFor="optional">Show optional fields</label>
  </div>

  {showOptional && (
    <div className='flex gap-2'>
      <label>
        Breed
        <input
          name="breed"
          placeholder="Breed"
          className="w-full p-2 border rounded-md"
        />
      </label>
      <label>
        Color
        <input
          name="color"
          placeholder="Color"
          className="w-full p-2 border rounded-md"
        />
      </label>
      <label>
        Size
        <input
          name="size"
          placeholder="Size"
          className="w-full p-2 border rounded-md"
        />
      </label>
      <label>
        Age
        <input
          type="number"
          name="age"
          placeholder="Age"
          min="0"
          className="w-full p-2 border rounded-md"
        />
      </label>
    </div>
  )}

  <button
    type="submit"
    className="w-full py-2 px-4 bg-blue-500 text-white rounded-md"
  >
    {isLoading ? 'Posting...' : 'Post'}
  </button>
</form>
                </div>
              </div>
            ) : (
              
              <div className="flex bg-white p-4 rounded-md gap-20">
              <div className='flex-1 flex flex-col items-center justify-center space-y-4'>
                {/* <p className='text-lg font-bold'>Log In to post</p> */}
              

                <button 
                  onClick={() => navigate('/login')} 
                  className='bg-blue-700 py-1 px-4 text-white rounded-md text-lg'
                >
                  Log in
                </button>
              </div>
            </div>
             
            )}
          </Box>
        </Modal>
      </div>
    );
}

export default LostPetForm