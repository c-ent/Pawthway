import React, { useEffect, useState } from 'react';
import dogplaceholder from '../../images/images/dogplaceholder.png';
const FoundPetCard = ({ pet }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="rounded-md  bg-[#F5F5F5] space-y-2 text-sm group  hover:bg-[#C1C1C1]">
      <div className="relative">
        <img src={pet.imageURL  ? pet.imageURL : dogplaceholder } alt={pet.description} className="w-full h-40 md:h-64 object-cover" />
      </div>
      
      {/* <h2 className="text-2xl font-bold">{pet.description}</h2> */}

      <div className='p-3'>
            <div className="">
           
                <div className='flex  space-x-2'>
                  <p>Where:</p>
                  <p className='font-bold'>{pet.found_location}</p>
                </div>

                <div className='flex items-center space-x-2'>
                  <p>Date Found:</p>
                  <p className='font-bold'>{pet.found_date}</p>
                </div>
         

              <div className='flex items-center space-x-2'>
                  <p>Contact</p>
                <p className='font-bold'>{pet.contact_number}</p>
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