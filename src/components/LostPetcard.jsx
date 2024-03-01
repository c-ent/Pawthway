import { useState } from 'react';
import dogplaceholder from '../../images/images/dogplaceholder.png';
import { formatDistance, parseISO } from 'date-fns';



const LostPetcard = ({ pet }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const showForm = () => {
    setIsFormVisible(true);
  };

  function formatDate(dateString) {
    try {
      const date = parseISO(dateString);
      const now = new Date();
      return formatDistance(date, now, { addSuffix: true });
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString; // Return the original string if there's an error
    }
  }

  return (
  <div className="rounded-md  space-y-2 text-sm group max-w-[350px] hover:bg-[#C1C1C1]">
      <div className="relative">
      <img loading="lazy" src={pet.imageURL ? pet.imageURL : dogplaceholder} alt={pet.name} className="w-full h-40 md:h-80 object-cover rounded-md" />
          <button className="absolute top-[8px] right-[1%] bg-[#d9d9d962] text-black px-3 py-1 font-semibold rounded-md">
         {formatDate(pet.dateLost)}
        </button>
      </div>

      <div className='px-2 pb-2 space-y-0 '>
              <div className='flex flex-col md:flex-row justify-between space-y-1 '>
              <div className='text-[#525252] text-xs md:text-sm flex items-center space-x-2'>
                <p>{pet.placeLost}</p>
              </div>

                <div className=' text-[#525252]  text-xs md:text-sm flex items-center space-x-2'>
                  
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.3337 8.43311V10.8998C12.3337 12.9798 10.3937 14.6664 8.00033 14.6664C5.60699 14.6664 3.66699 12.9798 3.66699 10.8998V8.43311C3.66699 10.5131 5.60699 11.9998 8.00033 11.9998C10.3937 11.9998 12.3337 10.5131 12.3337 8.43311Z" stroke="#525252" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12.3337 5.10016C12.3337 5.70683 12.167 6.26683 11.8737 6.74683C11.1603 7.92016 9.69366 8.66683 8.00033 8.66683C6.30699 8.66683 4.84033 7.92016 4.12699 6.74683C3.83366 6.26683 3.66699 5.70683 3.66699 5.10016C3.66699 4.06016 4.15365 3.12016 4.93365 2.44016C5.72032 1.7535 6.80033 1.3335 8.00033 1.3335C9.20033 1.3335 10.2803 1.7535 11.067 2.4335C11.847 3.12016 12.3337 4.06016 12.3337 5.10016Z" stroke="#525252" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12.3337 5.10016V8.4335C12.3337 10.5135 10.3937 12.0002 8.00033 12.0002C5.60699 12.0002 3.66699 10.5135 3.66699 8.4335V5.10016C3.66699 3.02016 5.60699 1.3335 8.00033 1.3335C9.20033 1.3335 10.2803 1.7535 11.067 2.4335C11.847 3.12016 12.3337 4.06016 12.3337 5.10016Z" stroke="#525252" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>

                  <p> {pet.reward}</p>
                </div>
              </div>

              {/* <div className='flex flex-col md:flex-row justify-between space-y-3  md:space-y-0 md:space-x-3'>
               
              </div> */}
               <h2 className="text-md md:text-2xl font-bold overflow-hidden whitespace-nowrap text-overflow-ellipsis">{pet.name}</h2>
      </div>
      
  </div>
  );
};

export default LostPetcard;

