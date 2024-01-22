import React from 'react'
import { Link } from 'react-router-dom'
import FoundPetCard from './FoundPetCard'

const UsersFoundPets = ({foundPets}) => {
  return (
    <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-4">
      {foundPets.map((pet) => (
        <Link key={pet.id} to={`/foundpets/${pet.id}`}>
          <FoundPetCard pet={pet} />
        </Link>
      ))}
    </div>
  )
}

export default UsersFoundPets