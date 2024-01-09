import React, { Suspense, useState, useEffect } from 'react'
import LostPetcard from 'src/components/LostPetCard'
import { Link } from 'react-router-dom';
import LostPetForm from 'src/components/LostPetForm';
import { supabase } from 'src/supabaseClient'

const AllLostPets = () => {
  const [missingPets, setmissingPets] = useState([]) // state to hold the dogs data
  useEffect(() => {
    getmissingPets()
  }, [])

  async function getmissingPets() {
    let { data: missingPets, error } = await supabase
    .from('missingPets')
    .select('*')
    if (error) {
      console.error('Error fetching dogs: ', error);
    } else {
      setmissingPets(missingPets)
    }
  }

  return (
    <div className='pt-10' >
      <div className='flex items-center justify-between'>
        <h1 className="text-5xl font-bold pb-5">Missing Pets</h1>
        <LostPetForm />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Suspense fallback={<div>Loading...</div>}>
          {missingPets.map((pet) => ( // map over your dogs state
            <Link key={pet.id} to={`/lostpets/${pet.id}`}>
              <LostPetcard pet={pet} />
            </Link>
          ))}
        </Suspense>
      </div>
    </div>
  )
}

export default AllLostPets