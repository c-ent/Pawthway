import React from 'react'
import { useState } from 'react';

const Pagination = ({ page, setPage, hasNextPage }) => {
    
    // Function to go to the next page
    function nextPage() {
    if (hasNextPage) {
      setPage(oldPage => oldPage + 1);
    }
  }
  
  // Function to go to the previous page
  function previousPage() {
    setPage(oldPage => oldPage > 1 ? oldPage - 1 : 1);
  }
  return (
    <div className='p-4 flex justify-center space-x-1'>
        {page > 1 && (
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded' onClick={previousPage}>Previous</button>
        )}
        {hasNextPage && (
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded' onClick={nextPage}>Next</button>
        )}
  </div>
  )
}

export default Pagination