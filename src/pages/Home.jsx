import React from 'react'
import logo from '../../images/icons/logo-blck.svg'
import plane from '../../images/icons/plane.svg'
import plane1 from '../../images/icons/plane1.svg'
import doggif from '../../images/images/dog-bouncing.gif'
import pet1 from  '../../images/images/dog-banner1.webp'
import pet2 from  '../../images/images/pet-banner-2.webp'
import pet3 from  '../../images/images/pet-banner-3.webp'
import yarn from '../../images/icons/yarn.svg'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';


const Home = () => {
  return (
    <div className='overflow-hidden'> 
    <section className=' flex flex-col items-center  justify-center space-y-5 h-[700px] p-4 '>
      {/* <div className='absolute left-[15%] top-0 md:visible invisible'>
        <img src={yarn} alt="logo" className="w-20 h-20 md:w-16 md:h-28"/>
      </div> */}

      <div className='absolute left-[15%] top-[13%] md:top-[10%]   lg:visible invisible '>
      <motion.img 
        src={plane1} 
        alt="logo" 
        className="w-16 h-auto md:w-20"
        initial={{ x: -300 , y: -100}} // start from the right
        animate={{ x: 0, y: 0 }} // animate to original position
        transition={{ duration: 1.5 }} // animation duration
      />
    </div>

      <div className='absolute right-[15%] bottom-[30%] lg:visible invisible '>
      <motion.img 
        src={plane} 
        alt="logo" 
        className="w-20 h-20 md:w-20"
        initial={{ x: 300 , y: 100}} // start from the right
        animate={{ x: 0, y: 0 }} // animate to original position
        transition={{ duration: 1.5 }} // animation duration
      />
    </div>
        {/* <div className='pt-16'>
          <img src={logo} alt="logo" className="w-20 h-20 md:w-28 md:h-28"/>
        </div> */}
        <div className="">
          <motion.h1 
            className="text-[#1D1D1F] text-5xl md:text-7xl font-bold text-center max-w-[800px]">
            Helping Lost <span className=' bg-gradient-to-r from-[#DE692C] to-[#DE972C] bg-clip-text text-transparent'>Pets </span> <span className='bg-gradient-to-r from-[#DE692C] to-[#DE972C] bg-clip-text text-transparent'> Finds </span>  Their Way <span className='bg-gradient-to-r from-[#DE692C] to-[#DE972C] bg-clip-text text-transparent'> Home </span>
          </motion.h1>
        </div>

        <div>
         <p className='text-xl p-2 text-center'> Pawthway easily find lost pets with  free service</p>
        </div>
        <div className=' space-x-1 md:space-x-3 flex'>

          <Link to="/lostpets">
            <button className="bg-[#1D1D1F] hover:bg-purple-700 text-white font-bold py-2 px-3 md:px-4 rounded-full text-sm md:text-md">
              Post a Missing Pet
            </button>
          </Link>

          <Link to="/foundpets">
            <button className="bg-transparent hover:bg-purple-700 text-[#1D1D1F] font-bold py-2 px-3 md:px-4 border border-[#1D1D1F] rounded-full text-sm md:text-md">
            List of Lost Pets
            </button>
          </Link>
          
        </div>
        <div className='flex '>
        <img src={pet3} alt="logo"  className="h-20 sm:h-44"/>
          <img src={pet2} alt="logo"  className="h-20 sm:h-44"/>
          <img src={pet1} alt="logo"  className="h-20 sm:h-44"/>
        </div>
      </section> 


<section className='p-12 md:p-20'>
<p className="max-w-[400px] text-center m-auto text-xl md:text-xl ">
     Utilize our user-friendly interface to quickly upload information about your missing pet, reaching a broad audience eager to help.
  </p>
</section>
   
{/* <section className='flex items-center pt-10 max-w-3xl mx-auto'>
  <div className='flex flex-col px-4 md:px-10'>
    <h1 className="text-3xl md:text-2xl font-bold mb-4">About</h1>
    <div className='flex justify-center items-center flex-col-reverse md:flex-row'>
   
    <p className='font-semibold text-xs md:text-sm max-w-4xl text-center pb-5'>
      Welcome to PawPathway, your go-to hub for heartwarming pet reunions. Join our community to discover and share information, turning stories of lost pets finding their way home into joyful realities.
    </p>
    
    </div>

    <div className='flex justify-center items-start'>
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
      <path d="M36.78 20.1434C44.118 11.0978 32.8538 12.3326 31.2189 11.5145C30.6444 11.2274 30.0792 8.45558 28.8008 9.09563C26.832 10.0805 26.9993 15.2075 26.7857 16.9178C26.6697 17.8487 25.37 19.1816 24.9428 20.1434C24.2609 21.6782 23.5116 23.5038 22.259 25.4103C21.0065 27.317 18.3888 28.7951 17.0786 30.2522C11.5023 36.4503 13.8931 43.7369 20.0153 48.4488C26.2074 53.2146 52.0697 51.4359 44.7599 40.4654" stroke="black" stroke-opacity="0.9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M33.8852 24.3425C35.7024 30.9941 33.0938 37.9404 33.0938 44.4536C33.0938 45.2031 34.5812 44.4798 35.3099 44.6138" stroke="black" stroke-opacity="0.9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M24.4004 31.3318C25.8632 31.5472 27.1982 32.6211 28.2336 33.6249C33.3876 38.6221 26.8035 41.9805 26.4389 43.747C26.3565 44.1466 28.0556 44.4218 28.3968 44.4584" stroke="black" stroke-opacity="0.9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M31.7305 9.4491C32.7242 8.51692 32.9138 10.1485 33.0941 11.0457" stroke="black" stroke-opacity="0.9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    
    <image src={doggif} alt="logo"  />
    </div>
   
   
  </div>
</section> */}





      
      


    </div>
    
   
  )
}

export default Home