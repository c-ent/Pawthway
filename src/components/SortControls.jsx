import React from 'react'

const SortControls = ({ componentType, handleNewestClick, handleSortChange, handleSortDirectionChange, sortOption, sortDirection }) => {
  return (
    <div className='flex gap-2 md:gap-5 pb-4'>
      <button 
        onClick={handleNewestClick} 
        className='px-2 py-2 bg-violet-500 text-white text-xs md:text-md rounded'
      >
        Show Newest
      </button>

      <select 
        value={sortOption} 
        onChange={handleSortChange} 
        className=' py-2 bg-violet-500 text-white rounded text-xs md:text-md'
      >
        <option value="id">Sort by ID</option>
        <option value="name">Sort by Name</option>
        {componentType === 'missingPets' && <option value="highest">Highest Reward</option>}
        {componentType === 'missingPets' && <option value="lowest">Lowest Reward</option>}
      </select>

      <select 
        value={sortDirection} 
        onChange={handleSortDirectionChange} 
        className='px-2 py-2 bg-violet-500 text-white rounded text-xs md:text-md'
      >
        <option value="false">Ascending</option>
        <option value="true">Descending</option>
      </select>
    </div>
  )
}

export default SortControls