import React, { useEffect, useState } from 'react';
import dogplaceholder from '../../images/images/dogplaceholder.png';
const LostPetcard = ({ pet }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const showForm = () => {
    setIsFormVisible(true);
  };
  return (
    

  <div className="rounded-md  bg-[#F5F5F5] space-y-2 text-sm group  hover:bg-[#C1C1C1]">
      <div className="relative">
      <img loading="lazy" src={pet.imageURL ? pet.imageURL : dogplaceholder} alt={pet.name} className="w-full h-40 md:h-64 object-cover" />

        {/* <button className="absolute top-[-10px] left-[-10px] bg-red-600 text-white px-3 py-1 font-bold rounded-md">
          Missing
        </button> */}
          
      </div>

      <div className='p-2 space-y-1'>
            <h2 className="text-lg md:text-2xl font-bold">{pet.name}</h2>
              <div className='flex flex-col md:flex-row justify-between space-y-1 '>
                <div className=' text-sm md:text-md flex items-center space-x-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 2V6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 2V6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 10H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p>{pet.dateLost}</p>
                </div>
                <div className=' text-sm md:text-md flex items-center space-x-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M22 4L12 14.01L9 11.01" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <p>₱ {pet.reward}</p>
                </div>
              </div>

              <div className='flex flex-col md:flex-row justify-between space-y-3  md:space-y-0 md:space-x-3'>
                <div className='text-xs md:text-md flex items-center space-x-2'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <p>{pet.placeLost}</p>
                </div>
              </div>
      </div>
  </div>
  );
};

export default LostPetcard;

