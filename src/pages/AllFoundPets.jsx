import React from 'react'
import FoundPetCard from '../components/FoundPetCard'
import foundpetimg from '../../images/images/lostdog.png'
import { Link } from 'react-router-dom';
const AllFoundPets = () => {
  const dog = {
    image: foundpetimg,
    name: 'Rorie',
    breed: 'Labrador',
    color: 'Black',
    size: 'Large',
    age: 5,
    lastSeenLocation: 'Park Street',
    dateLost: '2021-09-01',
    contact: '123-456-7890',
    placeLost: 'New York, NY',
    reward:'$100',
  };
  return (
<div className='pt-10' >
       <h1 className="text-5xl font-bold pb-5">Found Pets</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Link to={`/foundpets/${dog.id}`}>
          <FoundPetCard dog={dog} />
        </Link>

        <Link to={`/foundpets/${dog.id}`}>
          <FoundPetCard dog={dog} />
        </Link>

        <Link to={`/foundpets/${dog.id}`}>
          <FoundPetCard dog={dog} />
        </Link>

        <Link to={`/foundpets/${dog.id}`}>
          <FoundPetCard dog={dog} />
        </Link>

        <Link to={`/foundpets/${dog.id}`}>
          <FoundPetCard dog={dog} />
        </Link>
        
      </div>
    </div>
  )
}

export default AllFoundPets