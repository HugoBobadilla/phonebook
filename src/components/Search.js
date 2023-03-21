import React from 'react'

const Search = ({ handleFilter, filter }) => {
  return (
    <>
      <label htmlFor="filter">Filter shown with
        <input 
          type="text" 
          name="filter" 
          id="filter" 
          onChange={handleFilter} 
          value={filter} 
        />
      </label>
    </>
  )
}

export default Search