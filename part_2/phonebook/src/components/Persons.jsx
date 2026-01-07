const Persons = ({ persons, newSearch }) => {
  const personToShow = persons.filter(person => (
    person.name.toLowerCase().includes(newSearch.toLowerCase())
  ))

  return (
    <>
      {personToShow.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))}
    </>
  )
}

export default Persons