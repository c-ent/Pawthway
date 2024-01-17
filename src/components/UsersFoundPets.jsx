import React from 'react'
import { Link } from 'react-router-dom'
import FoundPetCard from './FoundPetCard'

const UsersFoundPets = ({foundPets}) => {
  return (
    <div>
      {foundPets.map((pet) => (
        <Link key={pet.id} to={`/foundpets/${pet.id}`}>
          <FoundPetCard pet={pet} />
        </Link>
      ))}
    </div>
  )
}

export default UsersFoundPets