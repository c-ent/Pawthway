import React, { useEffect, useState } from 'react';

const FoundPetCard = ({ pet }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="rounded-md p-4 bg-[#F5F5F5] space-y-2 text-sm group hover:bg-[#C1C1C1]">
      <div className="relative">
        <img src={pet.imageURL} alt={pet.description} className="w-full h-64 object-cover rounded-b-md overflow-hidden" />
      </div>
      <h2 className="text-2xl font-bold">{pet.description}</h2>

      <div className="grid grid-cols-2 gap-4 items-start">
        <div className='space-y-2'>
          <div className='flex items-center space-x-2'>
            <p>{pet.found_location}</p>
          </div>

          <div className='flex items-center space-x-2'>
            <p>{pet.found_date}</p>
          </div>
        </div>

        <div className='flex items-center space-x-2'>
          <p>{pet.contact_number}</p>
        </div>
      </div>

      <div className='flex items-center space-x-2'>
        <p>{pet.status}</p>
      </div>

      <div className='flex items-center space-x-2'>
        <p>{pet.color}</p>
      </div>

      <div className='flex items-center space-x-2'>
        <p>{pet.size}</p>
      </div>
    </div>
  );
};

export default FoundPetCard;