import React, { Suspense, useState, useEffect, useContext } from 'react'
import LostPetcard from '@components/LostPetcard'
import { Link } from 'react-router-dom'
import LostPetForm from '@components/LostPetForm'
import loadingimg from '../../images/icons/loading.svg'
import { supabase } from '../supabaseClient'
import { SessionContext } from '../components/SessionContext'

const AllLostPets = () => {
  const [missingPets, setmissingPets] = useState([]) // state to hold the dogs data
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState('id');
  const [sortDirection, setSortDirection] = useState(true); // Initialize as boolean true
  const [sortField, setSortField] = useState('id');
  const session = useContext(SessionContext);
  
  useEffect(() => {
    getmissingPets().then(() => setIsLoading(false));
  }, [sortOption, sortDirection]) // Add sortDirection as a dependency


  async function getmissingPets() {
    let { data: missingPets, error } = await supabase
      .from('missingPets')
      .select('*')
      .order(sortOption, { ascending: sortDirection }) // Call order function once
    if (error) {
      console.error('Error fetching dogs: ', error);
    } else {
      setmissingPets(missingPets)
    }
  }

  const handleSortChange = (e) => {
    if (e.target.value === 'highest') {
      setSortOption('reward');
      setSortDirection(false); // false for descending order
    } else if (e.target.value === 'lowest') {
      setSortOption('reward');
      setSortDirection(true); // true for ascending order
    } else {
      setSortOption(e.target.value);
    }
  }

  const handleSortDirectionChange = (e) => {
    setSortDirection(e.target.value === 'true'); // Convert string to boolean
  }

  const handleNewestClick = () => {
    setSortField('dateAdded');
    setSortDirection(false);
  }

  return (
    <div >
      
      <div className='flex items-center justify-between pt-10'>
        <div>
          <h1 className="text-2xl md:text-5xl font-bold pb-5">Missing Pets</h1>
        </div>
        
        <div className='flex flex-col justify-end'>
          <LostPetForm />
        </div>
      </div>

      <div className='flex gap-2 md:gap-5 pb-4'>
        <button 
          onClick={handleNewestClick} 
          className='px-2 py-2 bg-gray-200 text-gray-700 text-xs md:text-md rounded'
        >
          Show Newest
        </button>

        <select 
        value={sortOption} 
        onChange={handleSortChange} 
        className=' py-2 bg-gray-200 text-gray-700 rounded text-xs md:text-md'
      >
        <option value="id">Sort by ID</option>
        <option value="name">Sort by Name</option>
        <option value="highest">Highest Reward</option>
        <option value="lowest">Lowest Reward</option>
      </select>

      <select 
        value={sortDirection} 
        onChange={handleSortDirectionChange} 
        className='px-2 py-2 bg-gray-200 text-gray-700 rounded text-xs md:text-md'
      >
        <option value="false">Descending</option>
        <option value="true">Ascending</option>
      </select>
    </div>

    {isLoading && 
      <div className='flex justify-center items-center mt-20'>
        <img src={loadingimg} className='animate-ping' alt='loading' />
      </div>
    }

    <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-4">
      {missingPets.map((pet) => (
        <Link key={pet.id} to={`/lostpets/${pet.id}`}>
          <LostPetcard pet={pet} />
        </Link>
      ))}
    </div>
  </div>
  )
}

export default AllLostPets