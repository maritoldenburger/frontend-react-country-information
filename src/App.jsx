import './App.css';
import axios from 'axios';
import React, {useEffect, useState} from "react";
import worldMap from "./assets/world_map.png";

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
                <img src={worldMap} alt="Wereldkaart"/>
            </header>
            <main>
                {countries.length > 0
                    ? (
                        <ul>
                            <li>
                                <p>{countries[0].name.common} Has a population of {countries[0].population} people</p>
                            </li>
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
