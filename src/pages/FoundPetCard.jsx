import React, { useEffect, useState } from 'react';

const FoundPetCard = ({ dog }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
<div className="rounded-md p-4 bg-[#F5F5F5] space-y-2 text-sm group hover:border-2">
      <div className="relative">
        <img src={dog.image} alt={dog.name} className="w-full h-64 object-cover rounded-b-md overflow-hidden" />
      
      </div>
      <h2 className="text-2xl font-bold">{dog.name}</h2>

      <div className="grid grid-cols-2 gap-4 items-start">
        <div className='space-y-2'>
          <div className='flex items-center space-x-2'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16 2V6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8 2V6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3 10H21" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p>{dog.lastSeenLocation}</p>
          </div>

          <div className='flex items-center space-x-2'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p>{dog.placeLost}</p>
          </div>
        </div>

          <div className='flex items-center space-x-2'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M21.9999 16.9201V19.9201C22.0011 20.1986 21.944 20.4743 21.8324 20.7294C21.7209 20.9846 21.5572 21.2137 21.352 21.402C21.1468 21.5902 20.9045 21.7336 20.6407 21.8228C20.3769 21.912 20.0973 21.9452 19.8199 21.9201C16.7428 21.5857 13.7869 20.5342 11.1899 18.8501C8.77376 17.3148 6.72527 15.2663 5.18993 12.8501C3.49991 10.2413 2.44818 7.27109 2.11993 4.1801C2.09494 3.90356 2.12781 3.62486 2.21643 3.36172C2.30506 3.09859 2.4475 2.85679 2.6347 2.65172C2.82189 2.44665 3.04974 2.28281 3.30372 2.17062C3.55771 2.05843 3.83227 2.00036 4.10993 2.0001H7.10993C7.59524 1.99532 8.06572 2.16718 8.43369 2.48363C8.80166 2.80008 9.04201 3.23954 9.10993 3.7201C9.23656 4.68016 9.47138 5.62282 9.80993 6.5301C9.94448 6.88802 9.9736 7.27701 9.89384 7.65098C9.81408 8.02494 9.6288 8.36821 9.35993 8.6401L8.08993 9.9101C9.51349 12.4136 11.5864 14.4865 14.0899 15.9101L15.3599 14.6401C15.6318 14.3712 15.9751 14.1859 16.3491 14.1062C16.723 14.0264 17.112 14.0556 17.4699 14.1901C18.3772 14.5286 19.3199 14.7635 20.2799 14.8901C20.7657 14.9586 21.2093 15.2033 21.5265 15.5776C21.8436 15.9519 22.0121 16.4297 21.9999 16.9201Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          <p>{dog.contact}</p>
          </div>
      </div>

    


    {/* <div className='flex justify-between space-x-3'>
      <button className="flex  items-center bg-green-500 text-white px-3  rounded-md  ">
        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
        <path d="M4 17.4619C6.06627 11.7358 10.7515 7.18843 16.5992 8.9732C20.6796 10.2186 18.9678 12.5394 20.5535 14.0652C21.4481 14.7535 23.877 13.8296 24.5052 14.689C25.0606 15.449 24.6593 16.8354 24.5052 17.7456C23.8973 21.3343 19.7833 21.8626 16.2979 21.8626" stroke="white" stroke-opacity="0.9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M24.7076 16.005C24.4203 15.4599 23.7648 14.9502 22.9751 14.52" stroke="white" stroke-opacity="0.9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8.80477 14.9505C8.59737 16.0798 5.40009 23.7717 8.71014 24.427C14.8575 25.3051 14.1197 18.3125 14.1197 13.9424" stroke="white" stroke-opacity="0.9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M17.2002 13.8599V14.2724" stroke="white" stroke-opacity="0.9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Found
      </button>
      <button className='bg-red-500 text-white px-3 font-bold py-1 rounded-md'>Reward: {dog.reward}</button>
    </div> */}

    
      
    </div>
  );
};

export default FoundPetCard;

