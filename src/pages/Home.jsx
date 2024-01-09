import React from 'react'
import logo from '../../images/icons/logo-blck.svg'
import map from '../../images/icons/map-blck.svg'
import pet1 from  '../../images/images/dog-banner1.png'
import pet2 from  '../../images/images/pet-banner-2.png'
import pet3 from  '../../images/images/pet-banner-3.png'
import { Link } from 'react-router-dom'

 
const Home = () => {
  return (
    <div> 

    <section className='h-full flex flex-col items-center space-y-5'>
        <div className='pt-16'>
          <img src={logo} alt="logo" className="w-20 h-20 md:w-28 md:h-28"/>
        </div>
        <div>
          <h1 className="text-2xl md:text-5xl font-bold  text-center">
            Helping Lost Pets <br></br> Finds Their Way Home
          </h1>
        </div>
        <div className=' space-x-1 md:space-x-3 flex'>
          <button className="bg-black hover:bg-purple-700 text-white font-bold py-2 px-2 md:px-4 rounded-full text-sm md:text-md">
            <Link to="/lostpets">Post a Missing Pet</Link>
          </button>
          <button className="bg-white hover:bg-purple-700 text-black font-bold py-2 px-2 md:px-4 border border-black rounded-full text-sm md:text-md">
            <Link to="/foundpets">List of Lost Pets</Link>
          </button>
        </div>
        <div  className='flex'>
          <img src={pet1} alt="logo"  className="h-20 sm:h-40"/>
          <img src={pet2} alt="logo"  className="h-20 sm:h-40"/>
          <img src={pet3} alt="logo"  className="h-20 sm:h-40"/>
        </div>
      </section> 

      <section className='flex-col md:flex-row flex items-center space-x-0 md:space-x-16 space-y-4 pt-20'>
        <div className='flex-1 flex items-center space-x-5'>
          <img src={map} alt="logo"  className="h-10 md:h-20 "/>
          <h2 className="text-lg md:text-2xl font-bold">PawPathway: <br></br>A Community-Powered Reunion Hub</h2>
        </div>

        <div className='flex-1'>
          <p className='font-semibold'>Discover and share information with our community, making heartwarming reunions a reality.</p>
        </div>
      </section>




      
      


    </div>
    
   
  )
}

export default Home