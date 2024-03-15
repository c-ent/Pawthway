import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Comments from '../components/Comments';
import dogplaceholder from '../../images/images/dogplaceholder.png';
import DeleteFoundPetButton from '../components/DeleteFoundPetButton';
import { SessionContext } from '../components/SessionContext';
import FoundPetEditForm from '../components/FoundPetEditForm';

import pin from '../../images/icons/petInfo/pin.svg';
import calendar from '../../images/icons/petInfo/calendar.svg';
import phone from '../../images/icons/petInfo/phone.svg';
import coins from '../../images/icons/petInfo/reward.svg';
import circledot from '../../images/icons/petInfo/type.svg';
import circle from '../../images/icons/petInfo/circle.svg';
import year from '../../images/icons/petInfo/year.svg';
import weight from '../../images/icons/petInfo/size.svg';
import Loading from '../components/Loading';


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
    <div className='p-4 mx-auto max-w-screen-lg' >
          {
            pet.finder_id === session.user.id ? 
            <FoundPetEditForm pet={pet} setFormSubmitted={setFormSubmitted} /> 
            : null
          }


      <div className='flex flex-col md:flex-row pb-5'>
      <div className='flex-1 py-5'>
        <img src={pet.imageURL?pet.imageURL : dogplaceholder} alt={pet.description} className='w-full h-96 object-cover rounded-xl' />
        <DeleteFoundPetButton finder_id={pet.finder_id} pet_Id={pet.id} session={session}/> 
        </div>
     
        <div className='flex-1 p-0 md:p-7 flex items-center'>
           {/* <div className='flex justify-between pb-7'>
           

            <div className='flex justify-between space-x-3'>
              <button className="bg-red-600 text-white px-3 font-bold py-1 rounded-md">Finder ID: {pet.finder_id}</button>
            </div>
          </div> */}
     
            <div className='w-full space-y-6 flex flex-col justify-between '>
              
              {pet.found_location && <p className='text-sm flex items-center gap-2 font-semibold text-[#5F5F5F]'>
                <img src={pin} alt="pin" className='w-8 h-8' />
                {/* <p className='text-[#363636]'> Location </p> */}
                {pet.found_location}</p>
              }

              {pet.found_date && <p className='text-sm flex items-center gap-2 font-semibold text-[#5F5F5F]'>
                <img src={calendar} alt="calendar" className='w-8 h-8' />
                <p className='text-[#363636]'> Date Found </p>
                {pet.found_date}</p>
              } 

              {pet.contact_number && <p className='text-sm flex items-center gap-2 font-semibold text-[#5F5F5F] '>
                <img src={phone} alt="phone" className='w-8 h-8' />
                <p className='text-[#363636]'> # </p>
                {pet.contact_number}</p>
              }

              {pet.color && <p className='text-sm flex items-center gap-2 font-semibold text-[#5F5F5F]'>
                <img src={circle} alt="color" className='w-8 h-8' />
                <p className='text-[#363636]'> Color </p>
                {pet.color}</p>
              }

              {pet.size && <p className='text-sm flex items-center gap-2 font-semibold text-[#5F5F5F]'>
                <img src={weight} alt="color" className='w-8 h-8' />
                <p className='text-[#363636]'> Size </p>
                {pet.size}</p>
              }
              

              {pet.status && <p className='text-sm flex items-center gap-2 font-semibold text-[#5F5F5F]'>
                <img src={circledot} alt="circledot" className='w-8 h-8' />
                <p className='text-[#363636]'> Status: </p>
                {pet.status}</p>
              }

       
            </div>
 
        </div>
      </div>


    <Comments petType={"found"}petId={petId} />
  </div>


  );
};

export default FoundPet;