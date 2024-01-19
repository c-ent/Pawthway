import { useState, useEffect, useContext } from 'react'
import Comments from '@components/Comments'
import { useParams } from 'react-router-dom'
import { supabase } from '../supabaseClient';
import DeleteLostPetButton from '../components/DeleteLostPetButton';
import { SessionContext } from '../components/SessionContext';
import dogplaceholder from '../../images/images/dogplaceholder.png';
import MissingPetEditForm from '../components/MissingPetEditForm';


import pin from '../../images/icons/petInfo/pin.svg';
import calendar from '../../images/icons/petInfo/calendar.svg';
import phone from '../../images/icons/petInfo/phone.svg';
import coins from '../../images/icons/petInfo/reward.svg';
import circledot from '../../images/icons/petInfo/type.svg';
import circle from '../../images/icons/petInfo/circle.svg';
import year from '../../images/icons/petInfo/year.svg';
import weight from '../../images/icons/petInfo/size.svg';

const LosttPet = () => {
  const { petId } = useParams();
  const [pet, setPet] = useState([])
  const session = useContext(SessionContext);
  const [formsubmited, setFormSubmitted] = useState(false); // Initialize as boolean true
  const [isLoading, setIsLoading] = useState(true);

    
  useEffect(() => {
    getPet();
  }, [petId,formsubmited]); // add id as a dependency

  async function getPet() {
    setIsLoading(true);
    let { data: missingPet, error } = await supabase
      .from('missingPets') // select the 'missingPets' table
      .select('*') // select all columns
      .eq('id', petId); // where the 'id' column equals the provided id

    if (error) {
      console.error('Error fetching pet: ', error);
    } else {
      setPet(missingPet[0]);
    }
    setIsLoading(false);
  }


  if (isLoading) {
    return <div>Loading...</div>;
  }
 
  if (!pet) {
    return <div>Pet not found</div>;
  }

  

  return (
    <div className='pt-10 p-4 md:p-0 mx-auto max-w-screen-lg' >
      <div className='text-center  my-10'>
        <h1 className='font-bold text-5xl'>{pet.name}</h1>
      </div>
       <div className='flex flex-col md:flex-row'>
{/* 
          {
            pet.user_id === session.user.id ? 
              <MissingPetEditForm setFormSubmitted={setFormSubmitted} pet={pet} />
            : null
          } */}

           {/* <DeleteLostPetButton pet_user_id={pet.user_id} pet_Id={pet.id} session={session}/>  */}

          <div className='flex-1'>
            <img src={pet.imageURL? pet.imageURL : dogplaceholder} alt={pet.name} className='w-full h-96 object-cover rounded-xl'  onClick={() => setMainImage(pet.image)} />
          </div>

        <div className='flex-1 p-0 md:p-7 flex justify-center items-center'>
          <div className='flex w-full h-full text-[#5F5F5F] 20 '>
            <div className='w-1/2 my-12 flex flex-col justify-between '>
            
             {/* Location */}
             {pet.placeLost && (    
              <p className='text-md flex items-center gap-3 font-semibold'>
                <img src={pin} alt="pin" className='w-8 h-8' />
                <p className='text-md text-[#363636]'>Place:</p>
                {pet.placeLost}
              </p>
               )}

                 {/* Date Lost */}
              {pet.dateLost && (    
              <p className='text-md flex items-center gap-3 font-semibold'>
              <img src={calendar} alt="calendar" className='w-8 h-8' />
                <p className='text-md text-[#363636]'>Date:</p>
                {pet.dateLost}
              </p>
               )}

                {/* Location */}
            {pet.contact && (    
              <p className='text-md flex items-center gap-3 font-semibold'>
               <img src={phone} alt="phone" className='w-8 h-8' />
                {pet.contact}
              </p>
               )}


               
                         {/* Reward */}
                         {pet.reward && (    
              <p className='text-md flex items-center gap-3 font-semibold'>
              <img src={coins} alt="coins" className='w-8 h-8' />
              <p className='text-md text-[#363636]'>Reward:</p>
                {pet.reward}
              </p>
               )}

           

          

            </div>

            <div className='w-1/2 my-12 flex flex-col justify-between '>
               {/* Animal Type */}
            {pet.animalType && (
              <p className='text-sm flex items-center gap-3 font-semibold'>
                <img src={circledot} alt="type" className='w-8 h-8' />
                <p className='text-md text-[#363636]'>Type:</p>
                {pet.animalType}
              </p>
            )}

            {/* Pet Color */}
            {pet.color && (
              <p className='text-sm flex items-center gap-3 font-semibold'>
                <img src={circle} alt="circle" className='w-8 h-8' />
                <p className='text-md text-[#363636]'>Color:</p>
                {pet.color}
              </p>
            )}

            {/* Pet Age */}
            {pet.age && (
              <p className='text-sm flex items-center gap-3 font-semibold'>
             <img src={year} alt="year" className='w-8 h-8' />
             <p className='text-md text-[#363636]'>Age:</p>
                {pet.age}
              </p>
            )}


            {/* Pet Size */}
            {pet.size && (
              <p className='text-sm flex items-center gap-3 font-semibold'>
                 <img src={weight} alt="weight" className='w-8 h-8' />
                 <p className='text-md text-[#363636]'>Size:</p>
                {pet.size}
              </p>
            )}
           


            </div>
          </div>
        </div>
        

        
      </div>

      <div className='py-14  gap-8 text-center'>
        
        <p className=' text-sm text-[#5F5F5F]'>{pet.description}</p>
        <h1 className='font-bold'>-owner</h1>
      </div>


      <Comments petType={"missing"}petId={pet.id}/>
    </div>
  )
}

export default LosttPet

