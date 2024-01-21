import React, { useState, useEffect } from 'react'
import FoundPetCard from '@components/FoundPetCard'
import { Link } from 'react-router-dom'
import FoundPetForm from '@components/FoundPetForm'
import loadingimg from '../../images/icons/loading.svg'
import { supabase } from '../supabaseClient'

const AllFoundPets = () => {
  const [foundPets, setFoundPets] = useState([]) // state to hold the dogs data
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState('id');
  const [sortDirection, setSortDirection] = useState(true); // Initialize as boolean true
  const [formsubmited, setFormSubmitted] = useState(false); // Initialize as boolean true
  const [sortField, setSortField] = useState('id');

  useEffect(() => {
    getFoundPets().then(() => setIsLoading(false));
  }, [sortOption, sortDirection,formsubmited]) // Add sortDirection as a dependency

  async function getFoundPets() {
    let { data: foundPets, error } = await supabase
      .from('foundpets')
      .select('*')
      .order(sortOption, { ascending: sortDirection }) // Call order function once
    if (error) {
      console.error('Error fetching dogs: ', error);
    } else {
      console.log(foundPets)
      setFoundPets(foundPets)
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

  return (
    <div className='pt-10 mx-auto max-w-screen-xl' >
      
      <div className='flex items-center justify-between'>
        <h1 className="text-5xl font-bold pb-5">Found Pets</h1>
        <FoundPetForm setFormSubmitted={setFormSubmitted}/>
      </div>

      {isLoading && 
        <div className='flex justify-center items-center mt-20'>
          <img src={loadingimg} className='animate-ping' alt='loading' />
        </div>
      }

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {foundPets.map((pet) => (
          <Link key={pet.id} to={`/foundpets/${pet.id}`}>
            <FoundPetCard pet={pet} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default AllFoundPets