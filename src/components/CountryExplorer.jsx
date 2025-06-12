// 1. Country Explorer Application
// ● Objective:
// Build a Country Explorer Application that fetches and displays a list of countries
// with their Name, National Flag, Capital City, and Population. Users can filter
// countries by name using a search bar.
// Functionality Requirements:
// ● Fetch Data:
// ○ Use the API: https://restcountries.com/v3.1/all
// ● Sample Response:
// [
// ● { "name": { "common": "France" }, "capital": ["Paris"], "region": "Europe",
// "population": 67391582, "flags": { "png": "https://flagcdn.com/w320/fr.png"
// } },
// ● { "name": { "common": "Japan" }, "capital": ["Tokyo"], "region": "Asia",
// "population": 125960000, "flags": { "png":
// "https://flagcdn.com/w320/jp.png" } },
// ● { "name": { "common": "Brazil" }, "capital": ["Brasília"], "region":
// "Americas", "population": 212559417, "flags": { "png":
// "https://flagcdn.com/w320/br.png" } }
// ○ ]
// ● Display Countries:
// ○ Country Name
// ○ National Flag
// ○ Capital City
// ○ Population
// ● Search Bar:
// ○ Real-time filtering based on Country Name
// Technical Requirements:
// ● React Functional Components
// ● useState
// ● useEffect
// ● Fetch API
// ● Real-time search filtering


import axios from 'axios';
import {React , useState , useEffect} from 'react';

const CountryExplorer = () => {
    const [countries , setCountries] = useState([]);
    const [filteredCountries , setFilteredCountries] = useState([]);
    const [searchTerm , setSearchTerm] = useState("");
    const [loading , setLoading] = useState(true)
    const [error , setError] = useState('');

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get("https://restcountries.com/v3.1/all?fields=name,flags,capital,population");
                setCountries(response.data);
                setFilteredCountries(response.data);
                setLoading(false);
            }
            catch(err) {
                console.error(err);
                setError("Failed to fetch the countries")
                setLoading(false)
            }
        }
        fetchCountries();
    } , [])

    // For filtering countries based on search term
    useEffect(() => {
        if(searchTerm == '') {
            setFilteredCountries(countries);
        }
        else {
            const filter = countries.filter((country) => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()));
            setFilteredCountries(filter); 
        }
    } , [searchTerm , countries]);

    if(loading) {
        return (
            <div>
                Loading
            </div>
        )
    }
    if(error) {
        return (
            <div>
                {error}
            </div>
        )
    }

    return (
        <div>
            <h1>
                Country Explorer
            </h1>
            <div>
                <input type='text'
                placeholder='Search Country'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <p>
                Showing {filteredCountries.length} countries
            </p>
            <div>
                {filteredCountries.map((country , index) => (
                    <div key={index}>
                        <img src={country.flag?.png} alt={`Flag of ${country.name.common}`} onError={(e) => e.target.style.display = 'none'} />
                        <h3>Country name : {country.name.common}</h3>
                        <p>Polutation :{country.polulation}</p>
                        <p>Capital: {country.capital}</p>
                    </div>
                ))}
            </div>
            {filteredCountries.length == 0 && searchTerm && (
                <div>No Countries Found with matching {searchTerm}</div>
            )}
        </div>
    )
}

export default CountryExplorer