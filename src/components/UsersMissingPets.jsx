import React from 'react'
import LostPetcard from '@components/LostPetcard'
import { Link } from 'react-router-dom'
const UsersMissingPets = ({missingPets}) => {
  return (
    <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-4">
    {missingPets.map((pet) => (
      <Link key={pet.id} to={`/lostpets/${pet.id}`}>
        <LostPetcard pet={pet} />
      </Link>
    ))}
  </div>
  )
}

export default UsersMissingPets