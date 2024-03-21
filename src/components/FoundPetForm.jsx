import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import uploadimgicon from '../../images/icons/uploadimgicon.svg'
import { supabase } from '../supabaseClient';
import { useContext,useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from './SessionContext';

const FoundPetForm = ({setFormSubmitted}) => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const session = useContext(SessionContext);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoading, setIsLoading] = useState(false);

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
        fileURL = uploadData.path;
      }
    }
    return fileURL;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { color, size, found_date, found_location, description, status, contact_number } = e.target.elements;
    const fileURL = await uploadFile();

    const BUCKET_BASE_URL = "https://porojjoxqjqbgxlkxzmy.supabase.co/storage/v1/object/public/petImages/";
    const user_id = session.user.id;
    const { data, error } = await supabase
    .from('foundpets') // Make sure 'foundPets' table exists
    .insert([
      { 
        finder_id: user_id ? user_id : null,
        imageURL: fileURL ? `${BUCKET_BASE_URL}${fileURL}` : null,
        color: color ? color.value : null, 
        size: size ? size.value : null,
        found_date: found_date ? found_date.value : null,
        found_location: found_location ? found_location.value : null,
        description: description ? description.value : null,
        status: status ? status.value : null,
        contact_number: contact_number ? contact_number.value : null,
      },
    ]);
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
         <button className="flex md:h-[35px] items-center bg-[#DE692C] rounded-full  px-7 py-2 text-white font-semibold mb-5"onClick={handleOpen} >
            Post a pet you found
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
           <Box className={` ${session ? 'w-96 md:w-10/12' : ''} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl p-8   max-h-[800px] overflow-y-auto rounded-3xl`}>
            {session ? (
            <div className="flex md:flex-row flex-col bg-white p-4 rounded-md gap-0 md:gap-20">
                <div className='flex-1  flex items-center'>
                <label className='w-full flex items-center justify-center text-center cursor-pointer'>
                    {!preview && (
                      <img src={uploadimgicon} alt='uploadimgicon' className='w-20' />
                    )}

                    {preview && <img src={preview} alt="preview" className='h-52 md:h-full object-contain' />}
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className='flex-1'>
                  <h2 id="modal-modal-title" className="text-3xl text-center font-bold mb-2">
                    Found Pet
                  </h2>

                  <form className="space-y-2 md:space-y-4" onSubmit={handleSubmit}>
                    <div className='flex  gap-2'>
                      <label className='w-full'>
                        <p className='font-semibold'> Color</p>
                        <input 
                          type="text" 
                          name="color" 
                          className="w-full p-2 border rounded-md text-[#5F5F5F]"
                          required 
                        />
                      </label>

                      <label className='w-full'>
                        <p className='font-semibold'> Size</p>
                        <input 
                          type="text" 
                          name="size" 
                          className="w-full p-2 border rounded-md text-[#5F5F5F]"
                          required 
                        />
                      </label>
                    </div>

                    <div className='flex gap-2'>
                      <label className='w-full'>
                        <p className='font-semibold'>Found Date</p>
                        <input 
                          type="date"
                          name="found_date" 
                          className="w-full p-2 border rounded-md text-[#5F5F5F]"
                          required 
                        />
                      </label>

                      <label className='w-full'>
                        <p className='font-semibold'>Found Location:</p>
                        <input 
                          type="text" 
                          name="found_location" 
                          className="w-full p-2 border rounded-md text-[#5F5F5F]"
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
                          required 
                        />
                    </label>




                    <button
                      type="submit"
                      className="w-full py-2 px-4 bg-[#DE692C] text-white rounded-full"
                    >
                      {isLoading ? 'Posting...' : 'Post'}
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              
              <div className="flex bg-white rounded-md gap-20">
                <div className='flex-1 flex flex-col items-center justify-center space-y-4'>
                  <p className='text-lg text-center font-regular'>Login  to post the pet you found</p>
                

                  <button 
                  onClick={() => navigate('/login')} 
                  className='bg-[#DE692C] py-1 px-4 text-white rounded-full text-lg'
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

export default FoundPetForm