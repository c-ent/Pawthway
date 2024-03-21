import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import uploadimgicon from '../../images/icons/uploadimgicon.svg'
import { supabase } from '../supabaseClient';
import { useContext,useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from './SessionContext';
import edit from '../../images/icons/edit.svg';

const FoundPetEditForm = ({setFormSubmitted,pet}) => {
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




  if (!pet) {
    return <div>Loading...</div>;
  }

  const [formValues, setFormValues] = useState({
    color: pet.color,
    size: pet.size,
    found_date: pet.found_date,
    found_location: pet.found_location,
    description: pet.description,
    status: pet.status,
    contact_number: pet.contact_number,
  });

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };
  

  const handleFilePreview = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setFormValues({
          ...formValues,
          imageURL: reader.result,
        });
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
      setFormValues({
        ...formValues,
        imageURL: pet.imageURL,
      });
    }
  };

  useEffect(() => {
    handleFilePreview();
  }, [selectedFile]);

  const uploadFile = async () => {
    let fileURL = null;
    if (selectedFile) {
      const uniqueName = `${Date.now()}.${selectedFile.name.split('.').pop()}`; // Generate a unique name
      const filePath = `foundPets/${uniqueName}`;
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
        // Extract the 'petImages/foundPets/1705910443327.png' part from pet.imageURL
        const url = new URL(pet.imageURL);
        let existingImagePath = url.pathname.split('/public/')[1];
      
        // Remove 'petImages/' from the start of the string
        existingImagePath = existingImagePath.replace('petImages/', '');
      
        // Delete old image
        const { data, error } = await supabase
          .storage
          .from('petImages')
          .remove([existingImagePath]);
      
        if (error) {
          console.error('Error deleting image: ', error);
        } else {
          fileURL = uploadData.path;
        }
      }
    }
    return fileURL;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

     // Check if session user id is equal to pet user id
     if (session.user.id !== pet.user_id) {
      console.error('User is not authorized to edit this pet');
      return; // Return from the function if user is not authorized
    }
    
    const fileURL = await uploadFile();
  
    const BUCKET_BASE_URL = "https://porojjoxqjqbgxlkxzmy.supabase.co/storage/v1/object/public/petImages/";
    const user_id = session.user.id;
  
    // Prepare the data to update
    let updateData = {
      finder_id: user_id ? user_id : null,
      color: formValues.color, 
      size: formValues.size,
      found_date: formValues.found_date,
      found_location: formValues.found_location,
      description: formValues.description,
      status: formValues.status,
      contact_number: formValues.contact_number,
    };
  
    // Only include imageURL in the update data if fileURL is not null
    if (fileURL) {
      updateData.imageURL = `${BUCKET_BASE_URL}${fileURL}`;
    }
  
    const { data, error } = await supabase
      .from('foundpets') // Make sure 'foundPets' table exists
      .update(updateData)
      .eq('id', pet.id); // Replace 'id' and pet.id with your actual column name and value
  
    if (error) {
      console.error('Error updating data:', error);
    } else {
      setIsLoading(false);
      handleClose();
      setFormSubmitted(prevState => !prevState); 
    }
  }
  
    return (
      <div>
         <button className="flex  items-center rounded-md  px-2 text-white font-bold mb-5"onClick={handleOpen} >
          <img src={edit} alt="edit" className="w-6 h-6" />
        </button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
           <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 md:w-10/12 bg-white shadow-2xl p-8   max-h-[800px] overflow-y-auto rounded-3xl">
            {session ? (
             <div className="flex md:flex-row flex-col bg-white p-4 rounded-md gap-0 md:gap-20">
              <div className='flex-1  flex items-center'>
                <label className='w-full flex items-center justify-center text-center cursor-pointer'>
                    {!preview && !formValues.imageURL && (
                      <img 
                        src={uploadimgicon} 
                        alt='uploadimgicon' 
                        className='w-20'
                      />
                    )}

                    {(preview || pet.imageURL) && (
                      <img 
                        src={preview || pet.imageURL} 
                        alt="preview" 
                        className='h-52 md:h-full object-contain' 
                      />
                    )}
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className='flex-1'>
                 {/* <h2 id="modal-modal-title" className="text-3xl text-center font-bold mb-2">
                    Edit a Found Pet
                  </h2> */}

                  <form className="space-y-2 md:space-y-4" onSubmit={handleSubmit}>
                    <div className='flex  gap-2'>
                        <label className='w-full'>
                          <p className='font-semibold'> Color</p>
                          <input 
                            type="text" 
                            name="color" 
                            className="w-full p-2 border rounded-md text-[#5F5F5F]"
                            value={formValues.color} 
                            onChange={handleChange} 
                            required 
                          />
                        </label>

                        <label className='w-full'>
                          <p className='font-semibold'> Size</p>
                          <input 
                            type="text" 
                            name="size" 
                            className="w-full p-2 border rounded-md text-[#5F5F5F]"
                            value={formValues.size} 
                            onChange={handleChange}
                            required 
                          />
                        </label>
                      </div>
                    
                    <div className='flex-col md:flex-row flex gap-2'>
                      <label className='w-full'>
                        <p className='font-semibold'>Found Date</p>
                        <input 
                          type="date"
                          name="found_date" 
                          className="w-full p-2 border rounded-md text-[#5F5F5F]"
                          value={formValues.found_date} 
                          onChange={handleChange} 
                          required 
                        />
                      </label>

                      <label className='w-full'>
                        <p className='font-semibold'>Found Location:</p>
                        <input 
                          type="text" 
                          name="found_location" 
                          className="w-full p-2 border rounded-md text-[#5F5F5F]"
                          value={formValues.found_location} 
                          onChange={handleChange} 
                          required 
                        />
                      </label>

                    </div>

                    <div className='flex gap-2'>
                      <label className=' w-full'>
                        <p className='font-semibold'>Description</p>
                        <textarea 
                          name="description" 
                          className="w-full p-2 border rounded-md text-[#5F5F5F]"
                          value={formValues.description} 
                          onChange={handleChange}  
                          required
                        />
                      </label>
                    </div>

                    <label>
                      <p className='font-semibold'>Contact Number</p>
                      <input 
                          type="text" 
                          name="contact_number" 
                          className="w-full p-2 border rounded-md text-[#5F5F5F]"
                          value={formValues.contact_number} 
                          onChange={handleChange} 
                          required 
                        />
                    </label>

                    
                    <button
                      type="submit"
                      className="w-full py-2 px-4 bg-[#DE692C] text-white rounded-full"
                    >
                      {isLoading ? 'Updating...' : 'Update'}
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

export default FoundPetEditForm