import React from "react"

const Person = ({ person, deletePerson }) => {
  return (
      <p>
        {person.name} {person.phone}
        <button onClick={() => deletePerson(person.id)}>delete</button>
      </p>
  )
}

export default Person
