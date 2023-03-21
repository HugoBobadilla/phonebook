import React from 'react'

const AddPerson = ({
  handleSubmit,
  handleNewName,
  handlePhoneNumber,
  newName,
  phoneNumber
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a new</h2>
      <div>
        name: <input onChange={handleNewName} value={newName} />
      </div>
      <div>
        number: <input onChange={handlePhoneNumber} value={phoneNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default AddPerson