import React, { useState, useEffect, useContext } from 'react'
import Comments from '@components/Comments'
import { useParams } from 'react-router-dom'
import { supabase } from '../supabaseClient';
import DeleteButton from '../components/DeleteButton';
import { SessionContext } from '../components/SessionContext';

const LosttPet = () => {
  const { petId } = useParams();
  const [pet, setPet] = useState([])
  const session = useContext(SessionContext);


    
  useEffect(() => {
    getPet();
  }, [petId]); // add id as a dependency

  

  async function getPet() {
    let { data: missingPet, error } = await supabase
    .from('missingPets') // select the 'missingPets' table
    .select('*') // select all columns
    .eq('id', petId) // where the 'id' column equals the provided id


    if (error) {
      console.error('Error fetching pet: ', error);
    } else {
      setPet(missingPet[0])
    }
  }

  return (
    <div className='pt-10'>
       <DeleteButton pet_user_id={pet.user_id}  pet_Id={pet.id}  session={session}/>
       <div className='flex flex-col md:flex-row'>
          <div className='flex-1 py-5'>
            <img src={pet.imageURL} alt={pet.name} className='w-full h-96 object-cover'  onClick={() => setMainImage(pet.image)} />
          </div>

        <div className='flex-1 p-0 md:p-7'>
          <div className='flex justify-between pb-7'>
            <div>
              <h1 className='font-bold text-4xl'>{pet.name}</h1>
            </div>
            <div className='flex justify-between space-x-3'>
              <button className="flex  items-center bg-purple-700 text-white px-3  rounded-md ">
                <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
                <path d="M4 17.4619C6.06627 11.7358 10.7515 7.18843 16.5992 8.9732C20.6796 10.2186 18.9678 12.5394 20.5535 14.0652C21.4481 14.7535 23.877 13.8296 24.5052 14.689C25.0606 15.449 24.6593 16.8354 24.5052 17.7456C23.8973 21.3343 19.7833 21.8626 16.2979 21.8626" stroke="white" strokeOpacity="0.9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M24.7076 16.005C24.4203 15.4599 23.7648 14.9502 22.9751 14.52" stroke="white" strokeOpacity="0.9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.80477 14.9505C8.59737 16.0798 5.40009 23.7717 8.71014 24.427C14.8575 25.3051 14.1197 18.3125 14.1197 13.9424" stroke="white" strokeOpacity="0.9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.2002 13.8599V14.2724" stroke="white" strokeOpacity="0.9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Found
              </button>
              <button className="bg-red-600 text-white px-3 font-bold py-1 rounded-md">Reward: {pet.reward}</button>
            </div>
          </div>

          <div className='flex pb-7'>
            <div className='w-1/2 space-y-3'>
              
            {pet.animalType && (
              <p className='text-sm flex items-center gap-2 font-semibold'>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 28 26" fill="none">
                  <path d="M3.6 1H24.4C25.0896 1 25.7509 1.28095 26.2385 1.78105C26.7261 2.28115 27 2.95942 27 3.66667V11.6667C27 15.2029 25.6304 18.5943 23.1924 21.0948C20.7544 23.5952 17.4478 25 14 25C12.2928 25 10.6023 24.6551 9.02511 23.9851C7.44788 23.315 6.01477 22.3329 4.80761 21.0948C2.36964 18.5943 1 15.2029 1 11.6667V3.66667C1 2.95942 1.27393 2.28115 1.76152 1.78105C2.24912 1.28095 2.91044 1 3.6 1Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 10L14 16L19 10" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {pet.animalType}
              </p>
            )}

            {pet.color && (
              <p className='text-sm flex items-center gap-2 font-semibold'>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 31 23" fill="none">
                <path d="M1 11.5C1 11.5 6.27273 1 15.5 1C24.7273 1 30 11.5 30 11.5C30 11.5 24.7273 22 15.5 22C6.27273 22 1 11.5 1 11.5Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 16C18.2091 16 20 14.2091 20 12C20 9.79086 18.2091 8 16 8C13.7909 8 12 9.79086 12 12C12 14.2091 13.7909 16 16 16Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
                {pet.color}
              </p>
            )}

            {pet.age && (
              <p className='text-sm flex items-center gap-2 font-semibold'>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 27 27" fill="none">
                <path d="M13.5 24.75C19.7132 24.75 24.75 19.7132 24.75 13.5C24.75 7.2868 19.7132 2.25 13.5 2.25C7.2868 2.25 2.25 7.2868 2.25 13.5C2.25 19.7132 7.2868 24.75 13.5 24.75Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.5 6.75V13.5L18 15.75" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
                {pet.age}
              </p>
            )}

            {pet.size && (
              <p className='text-sm flex items-center gap-2 font-semibold'>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                <path d="M12.1553 22.2168C17.6781 22.2168 22.1553 17.7396 22.1553 12.2168C22.1553 6.69395 17.6781 2.2168 12.1553 2.2168C6.63243 2.2168 2.15527 6.69395 2.15527 12.2168C2.15527 17.7396 6.63243 22.2168 12.1553 22.2168Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.1553 15.2168C13.8121 15.2168 15.1553 13.8737 15.1553 12.2168C15.1553 10.5599 13.8121 9.2168 12.1553 9.2168C10.4984 9.2168 9.15527 10.5599 9.15527 12.2168C9.15527 13.8737 10.4984 15.2168 12.1553 15.2168Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
                {pet.size}
              </p>
            )}

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

            </div>
            <div className='w-1/2 space-y-3'>
            {/* {pet.lastSeenLocation && (              
              <p className='text-sm flex items-center gap-2 font-semibold'>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 39 39" fill="none">
                <path d="M34.125 16.25C34.125 27.625 19.5 37.375 19.5 37.375C19.5 37.375 4.875 27.625 4.875 16.25C4.875 12.3712 6.41584 8.65128 9.15856 5.90856C11.9013 3.16584 15.6212 1.625 19.5 1.625C23.3788 1.625 27.0987 3.16584 29.8414 5.90856C32.5842 8.65128 34.125 12.3712 34.125 16.25Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19.5 21.125C22.1924 21.125 24.375 18.9424 24.375 16.25C24.375 13.5576 22.1924 11.375 19.5 11.375C16.8076 11.375 14.625 13.5576 14.625 16.25C14.625 18.9424 16.8076 21.125 19.5 21.125Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
                {pet.lastSeenLocation}
              </p>
               )} */}



            {pet.contact && (    
              <p className='text-sm flex items-center gap-2 font-semibold'>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 41 40" fill="none">
                <path d="M37.1389 28.1279V33.0717C37.1407 33.5307 37.0467 33.985 36.8629 34.4055C36.679 34.826 36.4093 35.2035 36.0711 35.5138C35.7329 35.824 35.3337 36.0602 34.8989 36.2073C34.4641 36.3543 34.0035 36.4089 33.5464 36.3676C28.4753 35.8166 23.6043 34.0838 19.3245 31.3084C15.3428 28.7783 11.967 25.4024 9.43684 21.4207C6.65177 17.1215 4.91856 12.2268 4.37763 7.13297C4.33645 6.67726 4.39061 6.21797 4.53666 5.78433C4.68271 5.3507 4.91745 4.95222 5.22594 4.61428C5.53443 4.27634 5.90991 4.00633 6.32846 3.82145C6.74702 3.63658 7.19949 3.54087 7.65706 3.54044H12.6009C13.4007 3.53257 14.176 3.81578 14.7824 4.33728C15.3888 4.85878 15.7849 5.58299 15.8968 6.37492C16.1055 7.95706 16.4925 9.51052 17.0504 11.0057C17.2721 11.5955 17.3201 12.2365 17.1886 12.8528C17.0572 13.4691 16.7519 14.0348 16.3088 14.4828L14.2159 16.5757C16.5618 20.7014 19.9779 24.1175 24.1036 26.4634L26.1965 24.3705C26.6446 23.9275 27.2102 23.6221 27.8265 23.4907C28.4428 23.3593 29.0838 23.4072 29.6737 23.629C31.1688 24.1869 32.7223 24.5739 34.3044 24.7825C35.1049 24.8955 35.836 25.2987 36.3586 25.9155C36.8813 26.5323 37.1589 27.3197 37.1389 28.1279Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
                {pet.contact}
              </p>
               )}
            </div>
          </div>


          <hr className='border-black border-t-1' />
          <div className='pt-5'>
            <p className='text-center text-sm'><span className='text-3xl font-bold'>“</span>{pet.description}<span className='text-3xl font-bold'>”</span></p>
          </div>

          <button 
            className="flex items-center bg-blue-600 text-white px-3  py-1 rounded-md"
            onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
          >

          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
            <path d="M18.4014 2.58374H15.4014C14.0753 2.58374 12.8035 3.11052 11.8658 4.04821C10.9282 4.98589 10.4014 6.25766 10.4014 7.58374V10.5837H7.40137V14.5837H10.4014V22.5837H14.4014V14.5837H17.4014L18.4014 10.5837H14.4014V7.58374C14.4014 7.31852 14.5067 7.06417 14.6943 6.87663C14.8818 6.6891 15.1362 6.58374 15.4014 6.58374H18.4014V2.58374Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
            Share
          </button>

          

      
         
        </div>

      </div>


      <Comments petId={pet.id}/>
    </div>
  )
}

export default LosttPet

