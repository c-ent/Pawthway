import React, { useEffect, useState } from 'react';
import dogplaceholder from '../../images/images/dogplaceholder.png';
import calendar from '../../images/icons/calendar.svg';
import mappPin from '../../images/icons/map-pin.svg';
import rewardIcon from '../../images/icons/check-circle.svg';
const LostPetcard = ({ pet }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const showForm = () => {
    setIsFormVisible(true);
  };
  return (
    

  <div className="rounded-md  space-y-2 text-sm group max-w-[350px] hover:bg-[#C1C1C1]">
      <div className="relative">
      <img loading="lazy" src={pet.imageURL ? pet.imageURL : dogplaceholder} alt={pet.name} className="w-full h-40 md:h-80 object-cover" />
        {/* <button className="absolute top-[-10px] left-[-10px] bg-red-600 text-white px-3 py-1 font-bold rounded-md">
          Missing
        </button> */}
      </div>

      <div className='px-2 pb-2 space-y-1'>
      <h2 className="text-md md:text-2xl font-bold overflow-hidden whitespace-nowrap text-overflow-ellipsis">{pet.name}</h2>
              <div className='flex flex-col md:flex-row justify-between space-y-1 '>
                {/* <div className=' text-sm md:text-md flex items-center space-x-2'>
                  <img src={calendar} alt='date' className='w-5 h-5' />
                  <p>{pet.dateLost}</p>
                </div> */}

<div className='text-xs md:text-md flex items-center space-x-2'>
                          <img src={mappPin} alt='location' className='w-5 h-5' />
                          <p>{pet.placeLost}</p>
                </div>

                <div className=' text-sm md:text-md flex items-center space-x-2'>
                  <img src={rewardIcon} alt='reward' className='w-5 h-5' />
                  <p>₱ {pet.reward}</p>
                </div>
              </div>

              {/* <div className='flex flex-col md:flex-row justify-between space-y-3  md:space-y-0 md:space-x-3'>
               
              </div> */}
      </div>
  </div>
  );
};

export default LostPetcard;

