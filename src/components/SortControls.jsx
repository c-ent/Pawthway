

const SortControls = ({ componentType, handleNewestClick, handleSortChange, handleSortDirectionChange, sortOption, sortDirection }) => {
  return (
    <div className='flex gap-2 md:gap-3 pb-4'>
      <button 
        onClick={handleNewestClick} 
        className='px-4 h-[35px] bg-[#242424] text-white text-xs md:text-md rounded-full'
      >
        Show Newest
      </button>

      <select 
        value={sortOption} 
        onChange={handleSortChange} 
        className=' py-0 px-2 h-[35px] bg-transparent text-[#242424] border border-[#242424] rounded-full text-xs md:text-md'
      >
        <option value="id">Sort by ID</option>
        <option value="name">Sort by Name</option>
        {componentType === 'missingPets' && <option value="highest">Highest Reward</option>}
        {componentType === 'missingPets' && <option value="lowest">Lowest Reward</option>}
      </select>

      <button onClick={handleSortDirectionChange} className="border border-[#242424] rounded-full px-2">
      {sortDirection ? (
        
<svg width="35" height="21" viewBox="0 0 35 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.1436 10.4998H33.1436M19.1436 3.33317H33.1436M19.1436 17.6665H33.1436M6.89355 1.5415V19.4582M6.89355 19.4582L1.64355 14.0832M6.89355 19.4582L12.1436 14.0832" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

      ) : (
      

<svg width="34" height="21" viewBox="0 0 34 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.75 10.5002H32.75M18.75 17.6668H32.75M18.75 3.3335H32.75M6.5 19.4585V1.54183M6.5 1.54183L1.25 6.91683M6.5 1.54183L11.75 6.91683" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


      )}
    </button>
    </div>
  )
}

export default SortControls