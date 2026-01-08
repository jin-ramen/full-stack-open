import { useState, useEffect } from "react"
import TooManyMatches from "./TooManyMatches"
import CountryList from "./CountryList.jsx"
import CountryDetails from "./CountryDetails.jsx"

const DisplayCountries = ({ filteredCountries }) => {
    const [selectedCountry, setSelectedCountry] = useState(filteredCountries)

    useEffect(() => {
        setSelectedCountry(filteredCountries)
    }, [filteredCountries])

    const handleShowCountry = (country) => {
        setSelectedCountry([country])
    }

    if (selectedCountry.length === 0) {
        return null

    } else if (selectedCountry.length >= 10) {
        console.log("Too many matches")
        return <TooManyMatches />

    } else if (selectedCountry.length > 1) {
        console.log("Enough")
        return <CountryList 
            countries={selectedCountry} 
            handleShowCountry={handleShowCountry}
        />

    } else {
        console.log("Single")
        return <CountryDetails country={selectedCountry[0]} />
    }
}

export default DisplayCountries