const CountryList = ({ countries, handleShowCountry }) => (
    countries.map((country) => (
        <p key={country.cca3}>
            {country.name.common}
            <button onClick={() => handleShowCountry(country)}>
                show
            </button>
        </p>
    ))
)

export default CountryList