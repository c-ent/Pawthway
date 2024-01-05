import React, { Suspense } from 'react'
import LostPetcard from './LostPetcard'
import lostdogimg from '../../images/images/lostdog.png'

const LostPets = () => {
  const dog = {
    image: lostdogimg,
    name: 'Rorie',
    breed: 'Labrador',
    color: 'Black',
    size: 'Large',
    age: 5,
    lastSeenLocation: 'Park Street',
    dateLost: '2021-09-01',
    contact: '123-456-7890',
  };

  return (
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

    <LostPetcard dog={dog} />
    <LostPetcard dog={dog} />
    <LostPetcard dog={dog} />
    <LostPetcard dog={dog} />
    <LostPetcard dog={dog} />
    <LostPetcard dog={dog} />
    <LostPetcard dog={dog} />


</div>
   
  )
}



export default LostPets


{/* <div className="flex flex-wrap justify-between">
{dogs.map((dog, index) => (
  <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4" key={index}>
    <LostPetcard dog={dog}/>
  </div>
))}
</div> */}