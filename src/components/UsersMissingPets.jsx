import React from 'react'
import LostPetcard from '@components/LostPetcard'
import { Link } from 'react-router-dom'
const UsersMissingPets = ({missingPets}) => {
  return (
    <div>
        {missingPets.map((pet) => (
        <Link key={pet.id} to={`/lostpets/${pet.id}`}>
          <LostPetcard pet={pet} />
        </Link>
      ))}
    </div>
  )
}

export default UsersMissingPets