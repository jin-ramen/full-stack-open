const Persons = ({ persons, newSearch, deletePerson }) => {
  const personToShow = persons.filter(person => (
    person.name.toLowerCase().includes(newSearch.toLowerCase())
  ))

  return (
    <>
      {personToShow.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.id)}>
            delete
          </button>
        </div>
      ))}
    </>
  )
}

export default Persons