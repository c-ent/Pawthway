import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import uploadimgicon from '../../images/icons/uploadimgicon.svg'
import { supabase } from '../supabaseClient';
import { useContext,useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from './SessionContext';

const LostPetForm = () => {
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
        navigate('/lostpets');
      }



      

     

  
    }

  
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
           <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 md:w-10/12 bg-white border-2 border-black shadow-2xl p-4  max-h-[800px] overflow-y-auto">
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
                <p className='text-lg font-bold'>Logged In to post</p>
              
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <g clipPath="url(#clip0_127_11)">
                  <path d="M59.934 24.808C59.5685 21.224 57.6991 18.212 54.8106 16.5484C53.2939 15.6719 51.5516 15.2127 49.7659 15.2127C49.7531 15.2127 49.7404 15.2155 49.7276 15.2155C49.6091 9.53285 46.4572 4.70182 41.3948 3.34272C40.5212 3.10922 39.6191 2.98999 38.7128 2.98999C35.4339 2.98999 32.3453 4.55207 30.0011 7.10988C27.6569 4.55207 24.5682 2.98999 21.2893 2.98999C20.3823 2.98999 19.481 3.10922 18.6023 3.34272C13.5428 4.69898 10.3909 9.53285 10.271 15.2148C10.2582 15.2148 10.2454 15.212 10.2327 15.212C8.44703 15.212 6.70184 15.674 5.1937 16.5455C2.3009 18.212 0.43151 21.224 0.0652975 24.808C-0.227105 27.676 0.469125 30.7363 2.02127 33.4289C3.68484 36.3196 6.1433 38.458 8.88705 39.5836C8.36612 41.4658 8.05172 43.409 8.05172 45.3947C8.05172 56.1746 15.2496 57.0099 17.4569 57.0099C19.6492 57.0099 21.6939 56.3648 23.8578 55.6814C25.9124 55.0313 28.0337 54.3577 30.0018 54.3577C31.9705 54.3577 34.094 55.0305 36.1458 55.6814C38.3097 56.3669 40.3544 57.0099 42.5467 57.0099C45.7596 57.0099 48.4522 55.5848 50.1257 52.9965C51.3706 51.071 51.9518 48.6559 51.9518 45.394C51.9518 43.4075 51.6367 41.465 51.1165 39.5829C53.8624 38.4601 56.318 36.3217 57.9794 33.4339C59.5302 30.7363 60.2264 27.676 59.934 24.808ZM32.5255 15.3674C33.605 11.3362 36.8406 8.70036 39.754 9.47962C42.6673 10.2617 44.1507 14.1659 43.074 18.1942C41.9917 22.2226 38.7589 24.8613 35.8456 24.0792C32.9294 23.2992 31.446 19.3979 32.5255 15.3674ZM20.2446 9.47678C23.1552 8.69681 26.3915 11.3334 27.4731 15.3646C28.5525 19.3958 27.0692 23.2971 24.1559 24.0763C21.2425 24.8584 18.009 22.2197 16.9274 18.1914C15.8451 14.163 17.3312 10.2596 20.2446 9.47678ZM7.51943 30.2587C5.67275 27.0585 6.04394 23.3829 8.36044 22.0494C10.6741 20.7137 14.0446 22.2247 15.8912 25.4276C17.7429 28.6306 17.3667 32.3062 15.0531 33.639C12.7387 34.9733 9.36611 33.4644 7.51943 30.2587ZM29.9982 48.0079C21.383 48.0079 14.398 55.4549 14.398 45.394C14.398 35.331 24.4028 27.1771 29.9982 27.1799C35.5936 27.1827 45.5985 35.331 45.5985 45.394C45.5985 55.4557 38.6135 48.0079 29.9982 48.0079ZM52.4763 30.2587C50.6296 33.4644 47.2592 34.9726 44.9427 33.639C42.629 32.3055 42.2529 28.6277 44.1045 25.4276C45.9512 22.2247 49.3216 20.7137 51.6353 22.0494C53.9525 23.3829 54.323 27.0585 52.4763 30.2587Z" fill="#010002"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_127_11">
                  <rect width="60" height="60" fill="white"/>
                  </clipPath>
                  </defs>
                </svg>
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