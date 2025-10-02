import { useState, useEffect } from "react";
import axios from "axios";
import CountryList from "./components/CountryList";
import CountryInfoCard from "./components/CountryInfoCard";

function App() {
  const [data, setData] = useState(null);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/countries")
  //     .then((response) => setData(response.data));
  // }, []);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setData(response.data));
  }, []);

  const [matches, setMatches] = useState(null);

  return (
    <div className="m-4 flex flex-col gap-4">
      <h1 className="text-5xl font-bold">Country Info Lookup</h1>
      <input
        className="w-fit rounded-sm bg-neutral-100 px-4 py-2"
        name="search"
        type="text"
        placeholder="Search"
        onChange={(event) => {
          const query = event.target.value;
          const filteredData = data.filter((country) =>
            country.name.common.toUpperCase().includes(query.toUpperCase()),
          );
          setMatches(query && filteredData.length > 0 ? filteredData : null);
        }}
      />
      {matches ? (
        matches.length <= 10 ? (
          matches.length > 1 ? (
            <CountryList countries={matches} />
          ) : (
            <CountryInfoCard country={matches[0]} />
          )
        ) : (
          <div className="opacity-50">
            <p>Too many matches!</p>
            <p>Please specify your search query.</p>
          </div>
        )
      ) : (
        <div className="opacity-50">
          <p>Current query returned no results.</p>
        </div>
      )}
    </div>
  );
}

export default App;
