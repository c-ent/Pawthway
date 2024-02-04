import { useState, useEffect, useContext } from 'react'
import Comments from '@components/Comments'
import { useParams } from 'react-router-dom'
import { supabase } from '../supabaseClient';
import DeleteLostPetButton from '../components/DeleteLostPetButton';
import { SessionContext } from '../components/SessionContext';
import dogplaceholder from '../../images/images/dogplaceholder.png';
import MissingPetEditForm from '../components/MissingPetEditForm';

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
      <div className='text-center  my-4'>
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
          <div className='flex pb-7 w-full  '>
            <div className='w-1/2 space-y-3'>
            
             {/* Location */}
             {pet.placeLost && (    
              <p className='text-sm flex items-center gap-2 font-semibold'>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 41 40" fill="none">
                <path d="M37.1389 28.1279V33.0717C37.1407 33.5307 37.0467 33.985 36.8629 34.4055C36.679 34.826 36.4093 35.2035 36.0711 35.5138C35.7329 35.824 35.3337 36.0602 34.8989 36.2073C34.4641 36.3543 34.0035 36.4089 33.5464 36.3676C28.4753 35.8166 23.6043 34.0838 19.3245 31.3084C15.3428 28.7783 11.967 25.4024 9.43684 21.4207C6.65177 17.1215 4.91856 12.2268 4.37763 7.13297C4.33645 6.67726 4.39061 6.21797 4.53666 5.78433C4.68271 5.3507 4.91745 4.95222 5.22594 4.61428C5.53443 4.27634 5.90991 4.00633 6.32846 3.82145C6.74702 3.63658 7.19949 3.54087 7.65706 3.54044H12.6009C13.4007 3.53257 14.176 3.81578 14.7824 4.33728C15.3888 4.85878 15.7849 5.58299 15.8968 6.37492C16.1055 7.95706 16.4925 9.51052 17.0504 11.0057C17.2721 11.5955 17.3201 12.2365 17.1886 12.8528C17.0572 13.4691 16.7519 14.0348 16.3088 14.4828L14.2159 16.5757C16.5618 20.7014 19.9779 24.1175 24.1036 26.4634L26.1965 24.3705C26.6446 23.9275 27.2102 23.6221 27.8265 23.4907C28.4428 23.3593 29.0838 23.4072 29.6737 23.629C31.1688 24.1869 32.7223 24.5739 34.3044 24.7825C35.1049 24.8955 35.836 25.2987 36.3586 25.9155C36.8813 26.5323 37.1589 27.3197 37.1389 28.1279Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
                {pet.placeLost}
              </p>
               )}

                 {/* Date Lost */}
              {pet.dateLost && (    
              <p className='text-sm flex items-center gap-2 font-semibold'>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 41 41" fill="none">
                <path d="M32.1953 7.21387H9.12403C7.30375 7.21387 5.82812 8.68949 5.82812 10.5098V33.5811C5.82812 35.4013 7.30375 36.877 9.12403 36.877H32.1953C34.0156 36.877 35.4912 35.4013 35.4912 33.5811V10.5098C35.4912 8.68949 34.0156 7.21387 32.1953 7.21387Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M27.251 3.91797V10.5098" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14.0674 3.91797V10.5098" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.82812 17.1016H35.4912" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
                {pet.dateLost}
              </p>
               )}

                {/* Location */}
            {pet.contact && (    
              <p className='text-sm flex items-center gap-2 font-semibold'>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 41 40" fill="none">
                <path d="M37.1389 28.1279V33.0717C37.1407 33.5307 37.0467 33.985 36.8629 34.4055C36.679 34.826 36.4093 35.2035 36.0711 35.5138C35.7329 35.824 35.3337 36.0602 34.8989 36.2073C34.4641 36.3543 34.0035 36.4089 33.5464 36.3676C28.4753 35.8166 23.6043 34.0838 19.3245 31.3084C15.3428 28.7783 11.967 25.4024 9.43684 21.4207C6.65177 17.1215 4.91856 12.2268 4.37763 7.13297C4.33645 6.67726 4.39061 6.21797 4.53666 5.78433C4.68271 5.3507 4.91745 4.95222 5.22594 4.61428C5.53443 4.27634 5.90991 4.00633 6.32846 3.82145C6.74702 3.63658 7.19949 3.54087 7.65706 3.54044H12.6009C13.4007 3.53257 14.176 3.81578 14.7824 4.33728C15.3888 4.85878 15.7849 5.58299 15.8968 6.37492C16.1055 7.95706 16.4925 9.51052 17.0504 11.0057C17.2721 11.5955 17.3201 12.2365 17.1886 12.8528C17.0572 13.4691 16.7519 14.0348 16.3088 14.4828L14.2159 16.5757C16.5618 20.7014 19.9779 24.1175 24.1036 26.4634L26.1965 24.3705C26.6446 23.9275 27.2102 23.6221 27.8265 23.4907C28.4428 23.3593 29.0838 23.4072 29.6737 23.629C31.1688 24.1869 32.7223 24.5739 34.3044 24.7825C35.1049 24.8955 35.836 25.2987 36.3586 25.9155C36.8813 26.5323 37.1589 27.3197 37.1389 28.1279Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
                {pet.contact}
              </p>
               )}


               
                         {/* Reward */}
          <div className='flex justify-between pb-7'>
            <div className='flex justify-between space-x-3'>
              <button className="bg-red-600 text-white px-3 font-bold py-1 rounded-md">Reward: ₱ {pet.reward}</button>
            </div>
          </div>

           

          

            </div>

            <div className='w-1/2 space-y-3'>
               {/* Animal Type */}
            {pet.animalType && (
              <p className='text-sm flex items-center gap-2 font-semibold'>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 28 26" fill="none">
                  <path d="M3.6 1H24.4C25.0896 1 25.7509 1.28095 26.2385 1.78105C26.7261 2.28115 27 2.95942 27 3.66667V11.6667C27 15.2029 25.6304 18.5943 23.1924 21.0948C20.7544 23.5952 17.4478 25 14 25C12.2928 25 10.6023 24.6551 9.02511 23.9851C7.44788 23.315 6.01477 22.3329 4.80761 21.0948C2.36964 18.5943 1 15.2029 1 11.6667V3.66667C1 2.95942 1.27393 2.28115 1.76152 1.78105C2.24912 1.28095 2.91044 1 3.6 1Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 10L14 16L19 10" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {pet.animalType}
              </p>
            )}

            {/* Pet Color */}
            {pet.color && (
              <p className='text-sm flex items-center gap-2 font-semibold'>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 31 23" fill="none">
                <path d="M1 11.5C1 11.5 6.27273 1 15.5 1C24.7273 1 30 11.5 30 11.5C30 11.5 24.7273 22 15.5 22C6.27273 22 1 11.5 1 11.5Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 16C18.2091 16 20 14.2091 20 12C20 9.79086 18.2091 8 16 8C13.7909 8 12 9.79086 12 12C12 14.2091 13.7909 16 16 16Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
                {pet.color}
              </p>
            )}

            {/* Pet Age */}
            {pet.age && (
              <p className='text-sm flex items-center gap-2 font-semibold'>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 27 27" fill="none">
                <path d="M13.5 24.75C19.7132 24.75 24.75 19.7132 24.75 13.5C24.75 7.2868 19.7132 2.25 13.5 2.25C7.2868 2.25 2.25 7.2868 2.25 13.5C2.25 19.7132 7.2868 24.75 13.5 24.75Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.5 6.75V13.5L18 15.75" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
                {pet.age}
              </p>
            )}


            {/* Pet Size */}
            {pet.size && (
              <p className='text-sm flex items-center gap-2 font-semibold'>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                <path d="M12.1553 22.2168C17.6781 22.2168 22.1553 17.7396 22.1553 12.2168C22.1553 6.69395 17.6781 2.2168 12.1553 2.2168C6.63243 2.2168 2.15527 6.69395 2.15527 12.2168C2.15527 17.7396 6.63243 22.2168 12.1553 22.2168Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.1553 15.2168C13.8121 15.2168 15.1553 13.8737 15.1553 12.2168C15.1553 10.5599 13.8121 9.2168 12.1553 9.2168C10.4984 9.2168 9.15527 10.5599 9.15527 12.2168C9.15527 13.8737 10.4984 15.2168 12.1553 15.2168Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
                {pet.size}
              </p>
            )}
           


            </div>
          </div>
        </div>
        

        
      </div>

      <div className='pt-3 text-center'>
        <h1 className='font-bold'>Description</h1>
        <p className=' text-sm'>{pet.description}</p>
      </div>


      <Comments petType={"missing"}petId={pet.id}/>
    </div>
  )
}

export default LosttPet

