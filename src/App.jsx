import './App.css';
import axios from 'axios';
import React, {useEffect, useState} from "react";
import worldMap from "./assets/world_map.png";
import globe from "./assets/globe.gif";
import getRegionColour from "./helpers/getRegionColour.jsx";
import numberToMillion from "./helpers/numberToMillion.jsx";

function App() {

    const [countries, setCountries] = useState([]);
    const [countryInfo, setCountryInfo] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState("");

    async function fetchCountries() {

        try {
            const result = await axios.get("https://restcountries.com/v3.1/all");
            console.log(result.data);
            setCountries(result.data);

        } catch (error) {
            console.error(error);
        }
    }

    async function fetchCountryInfo(e) {
        e.preventDefault();
        setError("");

        try {
            const result = await axios.get(`https://restcountries.com/v3.1/name/${searchQuery}`);
            setCountryInfo(result.data[0])
            console.log(result.data[0]);
            setSearchQuery("");

        } catch (error) {
            console.error(error);
            setError(`${searchQuery} bestaat niet. Probeer het opnieuw.`)
        }
    }

    return (
        <>
            <header>
                <img src={worldMap} alt="World map" className="header-image"/>
            </header>
            <main>
                <section>
                    <h1>World Regions</h1>
                    {countries.length > 0
                        ? (
                            <ul className="countries-grid">
                                {countries
                                    .sort((a, b) => a.population - b.population)
                                    .map((country) => (
                                        <li key={country.cca3}>
                                            <div className="countries-title">
                                                <img
                                                    className="flag"
                                                    src={country.flags.png}
                                                    alt={`Vlag van ${country.name.common}`}
                                                />
                                                <h4 className={getRegionColour(country.region)}>
                                                    {country.name.common}
                                                </h4>
                                            </div>
                                            <p>Has a population of {country.population} people</p>
                                        </li>
                                    ))}
                            </ul>
                        )
                        : (
                            <button onClick={fetchCountries}>Alle landen ophalen</button>
                        )
                    }
                </section>
                <section>
                    <h1>Search country information</h1>
                    <img src={globe} alt="Globe"/>
                    <form className="search-bar" onSubmit={fetchCountryInfo}>
                        <input
                            type="search"
                            name="search"
                            placeholder="Bijvoorbeeld Nederland of Peru"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        >
                        </input>
                        <button>Zoek</button>
                        {error && <p>{error}</p>}
                    </form>
                    {countryInfo.name &&
                        <div className="country-info-card">
                            <div className="country-info-title">
                                <img
                                    className="flag"
                                    src={countryInfo.flags.png}
                                    alt={`Vlag van ${countryInfo.name.common}`}
                                />
                                <h2>{countryInfo.name.common}</h2>
                            </div>
                            <p>{countryInfo.name.common} is situated in {countryInfo.subregion} and the capital
                                is {countryInfo.capital}.</p>
                            <p>It has a population of {numberToMillion(countryInfo.population)} people and it
                                borders
                                with {countryInfo.borders.length} neighboring countries.</p>
                            <p>Websites can be found on {countryInfo.tld} domains.</p>
                        </div>
                    }
                </section>
            </main>
            <footer>
            </footer>
        </>
    )
}

export default App
