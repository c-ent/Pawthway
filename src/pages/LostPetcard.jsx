import React, { useEffect, useState } from 'react';

const LostPetcard = ({ dog }) => {
  const [isLoading, setIsLoading] = useState(true);



  return (
    <div className="border p-4">
      <img src={dog.image} alt={dog.name} className="w-full h-64 object-cover" />
      <h2 className="text-xl font-bold">{dog.name}</h2>
      <p>Breed: {dog.breed}</p>
      <p>Color: {dog.color}</p>
      <p>Size: {dog.size}</p>
      <p>Age: {dog.age}</p>
      <p>Last Seen: {dog.lastSeenLocation}</p>
      <p>Date Lost: {dog.dateLost}</p>
      <p>Contact: {dog.contact}</p>
    </div>
  );
};

export default LostPetcard;