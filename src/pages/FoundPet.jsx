import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Comments from '../components/Comments';
import dogplaceholder from '../../images/images/dogplaceholder.png';
import DeleteFoundPetButton from '../components/DeleteFoundPetButton';
import { SessionContext } from '../components/SessionContext';
import FoundPetEditForm from '../components/FoundPetEditForm';
const FoundPet = () => {
  const { petId } = useParams();
  const [pet, setPet] = useState(null);
  const [formsubmited, setFormSubmitted] = useState(false); // Initialize as boolean true

  const session = useContext(SessionContext);
  useEffect(() => {
    const fetchPet = async () => {
      const { data: foundPet, error } = await supabase
        .from('foundpets')
        .select('*')
        .eq('id', petId);

      if (error) {
        console.error('Error fetching pet: ', error);
      } else {
        setPet(foundPet[0]);
      }
    };

    fetchPet();
  }, [petId,formsubmited]);

  if (!pet) {
    return <div>Loading...</div>;
  }
  return (
    <div className='pt-10 p-4 md:p-0  mx-auto max-w-screen-xl '>

          {
            pet.finder_id === session.user.id ? 
            <FoundPetEditForm pet={pet} setFormSubmitted={setFormSubmitted} /> 
            : null
          }


      <div className='flex flex-col md:flex-row'>
      <div className='flex-1 py-5'>
        <img src={pet.imageURL?pet.imageURL : dogplaceholder} alt={pet.description} className='w-full h-96 object-cover' />
        <DeleteFoundPetButton finder_id={pet.finder_id} pet_Id={pet.id} session={session}/> 
        </div>
     
        <div className='flex-1 p-0 md:p-7'>
           <div className='flex justify-between pb-7'>
            <div>
              <h1 className='font-bold text-4xl'>{pet.description}</h1>
            </div>

            {/* <div className='flex justify-between space-x-3'>
              <button className="bg-red-600 text-white px-3 font-bold py-1 rounded-md">Finder ID: {pet.finder_id}</button>
            </div> */}
          </div>
          <div className='flex pb-7'>
            <div className='w-1/2 space-y-3'>
            {pet.color && <p className='text-sm flex items-center gap-2 font-semibold'>Color: {pet.color}</p>}
              {pet.size && <p className='text-sm flex items-center gap-2 font-semibold'>Size: {pet.size}</p>}
              {pet.found_date && <p className='text-sm flex items-center gap-2 font-semibold'>Found Date: {pet.found_date}</p>}
              {pet.found_location && <p className='text-sm flex items-center gap-2 font-semibold'>Found Location: {pet.found_location}</p>}
              {pet.status && <p className='text-sm flex items-center gap-2 font-semibold'>Status: {pet.status}</p>}
              {pet.contact_number && <p className='text-sm flex items-center gap-2 font-semibold'>Contact Number: {pet.contact_number}</p>}
            </div>
          </div>
        </div>
      </div>


    <Comments petType={"found"}petId={petId} />
  </div>


  );
};

export default FoundPet;