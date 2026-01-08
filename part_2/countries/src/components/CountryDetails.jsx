import CountryWeather from "./CountryWeather"

const CountryDetails = ({ country }) => {
    return (
    <>
    <div>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
    </div>
    <div>
        <h2>Languages</h2>
        <ul>
            {Object.values(country.languages).map((language) => (
                <li key={language}>{language}</li>
            ))}
        </ul>
        <img src={country.flags.png ? country.flags.png : "Loading..."} alt={`Flag of ${country.name.common}`} />
    </div>
    <CountryWeather capital={country.capital} />
    </>
    )
}

export default CountryDetails