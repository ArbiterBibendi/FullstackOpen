import { React, useState } from 'react';
import axios from 'axios'
import { useEffect } from 'react';

const CountryDisplay = ({ countryData, filter, waiting }) => {
  const MAX_COUNTRIES = 10
  const filteredCountries = countryData.filter((country) => {
    return country.name.common.toLowerCase().includes(filter.toLowerCase());
  })
  if (waiting) {
    return <p>Waiting for results...</p>
  }
  if (filteredCountries.length < 1 || filter === '') {
    return <p>No countries found</p>
  }
  else if (filteredCountries.length > 1 && filteredCountries.length <= MAX_COUNTRIES) {
    return filteredCountries.map((country) => <p key={country.name.common}>{country.name.common}</p>);
  }
  else if (filteredCountries.length > MAX_COUNTRIES) {
    return <p>Too many matches, specify another filter</p>
  }
  else {
    return <Country country={filteredCountries[0]}/>
  }
}
const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>

      <div>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      </div>

      <b>languages:</b>
      <ul>
        {
          Object.values(country.languages).map((language) => <li key={language}>{language}</li>)
        }
      </ul>
      <img src={country.flags.png} />
    </div>
  )
}
const App = () => {
  const [countryData, setCountryData] = useState([]);
  const [filter, setFilter] = useState('');
  const [waiting, setWaiting] = useState(false);
  useEffect(() => {
    setWaiting(true);
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setCountryData(response.data);
        setWaiting(false);
      })
  }, []);
  return (
    <div>
      find countries
      <input onChange={(e) => setFilter(e.target.value)} />
      <div>
        <CountryDisplay countryData={countryData} filter={filter} waiting={waiting} />
      </div>
    </div>
  );
}

export default App;
