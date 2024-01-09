import React, { Suspense, useState, useEffect } from 'react'
import LostPetcard from '@components/LostPetcard'
import { Link } from 'react-router-dom'
import LostPetForm from '@components/LostPetForm'
import loadingimg from '../../images/icons/loading.svg'
import { supabase } from '../supabaseClient'

const AllLostPets = () => {
  const [missingPets, setmissingPets] = useState([]) // state to hold the dogs data
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState('id');
  const [sortDirection, setSortDirection] = useState(true); // Initialize as boolean true
  const [sortField, setSortField] = useState('id');
  useEffect(() => {
    getmissingPets().then(() => setIsLoading(false));
    getSession()
  }, [sortOption, sortDirection]) // Add sortDirection as a dependency

  const [session, setSession] = useState(null);

  async function getSession() {
    const {data: { session },} = await supabase.auth.getSession()
    setSession(session);
  }

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
    setSortOption(e.target.value);
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
        {isLoading && 
            <div className='h-screen flex justify-center items-center animate-ping'>
              <img src={loadingimg} alt='loading' />
            </div>
        }
      <div className='flex items-center justify-between pt-10'>
        <div>
          <h1 className="text-2xl md:text-5xl font-bold pb-5">Missing Pets</h1>
        </div>
        
        <div className='flex flex-col justify-end'>
          <select value={sortOption} onChange={handleSortChange}>
            <option value="id">Sort by ID</option>
            <option value="name">Sort by Name</option>
            {/* Add more options as needed */}
          </select>

          <select value={sortDirection} onChange={handleSortDirectionChange}>
            <option value="false">Descending</option>
            <option value="true">Ascending</option>
          </select>

          <button onClick={handleNewestClick}>Show Newest</button>
          <LostPetForm />
        </div>
      </div>

    
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
         
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