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
          <img src={logo} alt="logo"  className="w-28 h-28"/>
        </div>
        <div>
          <h1 className="text-5xl font-bold  text-center">
            Helping Lost Pets <br></br> Finds Their Way Home
          </h1>
        </div>
        <div className='space-x-3'>
          <button className="bg-black hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full">
            <Link to="/lostpets">Post a Missing Pet</Link>
          </button>
          <button className="bg-white hover:bg-purple-700 text-black font-bold py-2 px-4 border border-black rounded-full">
            <Link to="/foundpets">List of Lost Pets</Link>
          </button>
        </div>
        <div  className='flex'>
          <img src={pet1} alt="logo"  className="h-40"/>
          <img src={pet2} alt="logo"  className="h-40 "/>
          <img src={pet3} alt="logo"  className="h-40 "/>
        </div>
      </section> 

      <section className='flex items-center space-x-16 pt-20'>
        <div className='flex-1 flex items-center space-x-5'>
          <img src={map} alt="logo"  className="h-20 "/>
          <h2 className="text-2xl font-bold">PawPathway: <br></br>A Community-Powered Reunion Hub</h2>
        </div>

        <div className='flex-1'>
          <p className='font-semibold'>Discover and share information with our community, making heartwarming reunions a reality.</p>
        </div>
      </section>




      
      


    </div>
    
   
  )
}

export default Home