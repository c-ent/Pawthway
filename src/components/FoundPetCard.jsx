import React, { useEffect, useState } from 'react';
import dogplaceholder from '../../images/images/dogplaceholder.png';
import { formatDistance, parseISO } from 'date-fns';
import pin from '../../images/icons/petInfo/pin.svg';
import phone from '../../images/icons/petInfo/phone.svg';
import calendar from '../../images/icons/petInfo/calendar.svg';

const FoundPetCard = ({ pet }) => {
  const [isLoading, setIsLoading] = useState(true);


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
    <div className="rounded-md  bg-[#F5F5F5] space-y-2 text-sm group  hover:bg-[#C1C1C1]">
      <div className="relative">
        <img src={pet.imageURL  ? pet.imageURL : dogplaceholder } alt={pet.description} className="w-full h-40 md:h-80 object-cover rounded-md" />
        <button className="absolute top-[8px] right-[1%] bg-[#d9d9d962] text-black px-3 py-1 font-semibold rounded-md">
         {formatDate(pet.found_date)}
        </button>
      </div>
      
      {/* <h2 className="text-2xl font-bold">{pet.description}</h2> */}

      <div className='p-3'>
            <div className="text-[#525252] space-y-2">
           
                <div className='flex  space-x-2'>
                  <img src={pin} alt="pin" className='w-4 h-4' />
                  <p className='text-xs md:text-sm'>{pet.found_location}</p>
                </div>

                <div className='flex items-center space-x-2'>
                  {/* <p>Date Found:</p> */}
                  <img src={calendar} alt="calendar" className='w-4 h-4' />
                  <p className='text-xs md:text-sm'>{pet.found_date}</p>
                </div>
         

              <div className='flex items-center space-x-2'>
                <img src={phone} alt="phone" className='w-4 h-4' />
                <p className='text-xs md:text-sm'>{pet.contact_number}</p>
              </div>
            </div>

            {/* <div className='flex items-center space-x-2'>
              <p>{pet.status}</p>
            </div> */}

            {/* <div className='flex items-center space-x-2'>
              <p>{pet.color}</p>
            </div>

            <div className='flex items-center space-x-2'>
              <p>{pet.size}</p>
            </div> */}
      </div>

    </div>
  );
};

export default FoundPetCard;