import './App.css';
import axios from 'axios';
import React, {useEffect, useState} from "react";
import worldMap from "./assets/world_map.png";
import getRegionColour from "./helpers/getRegionColour.jsx";

function App() {

    const [countries, setCountries] = useState([]);

    async function fetchCountries() {

        try {
            const result = await axios.get("https://restcountries.com/v3.1/all");
            console.log(result.data);
            setCountries(result.data);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <header>
                <img src={worldMap} alt="World map"/>
            </header>
            <main>
                {countries.length > 0
                    ? (
                        <ul>
                            {countries
                                .sort((a, b) => a.population - b.population)
                                .map((country) => (
                                    <li key={country.cca3}>
                                        <img
                                            src={country.flags.png}
                                            alt={`Flag of ${country.name.common}`}
                                        />
                                        <h4 className={getRegionColour(country.region)}>
                                            {country.name.common}
                                        </h4>
                                        <p>Has a population of {country.population} people</p>
                                    </li>
                                ))}
                        </ul>
                    )
                    : (
                        <button className="button" onClick={fetchCountries}>Show all countries</button>
                    )
                }
            </main>
            <footer>
            </footer>
        </>
    )
}

export default App
