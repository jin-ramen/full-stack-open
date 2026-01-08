import { useState, useEffect } from 'react'
import axios from 'axios'
import QueryForm from './components/QueryForm'
import DisplayCountries from './components/DisplayCountries'

function App() {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    if (query) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {setCountries(response.data)})
    }
  }, [query])

  const filteredCountries = countries.filter(
    country => country.name.common.toLowerCase().includes(query.toLowerCase())
  )

  const handleQuery = (event) => {
    console.log(event.target.value)
    setQuery(event.target.value)
  }

  return (
    <>
      <QueryForm query={query} handleQuery={handleQuery} />
      <DisplayCountries filteredCountries={filteredCountries} />
    </>
  )
}

export default App
