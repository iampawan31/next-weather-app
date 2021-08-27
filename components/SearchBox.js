import { useState, useEffect } from "react";
import cities from "../lib/city.list.json";
import Link from "next/link";
import Router from "next/router";

const SearchBox = ({ placeholder }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const clearQuery = () => setQuery("");

    Router.events.on("routeChangeComplete", clearQuery);

    return () => {
      Router.events.off("routeChangeComplete", clearQuery);
    };
  }, []);

  useEffect(() => {
    const matchingCities = [];
    if (query.length > 3) {
      cities.map((city) => {
        if (city.name.toLowerCase().startsWith(query.toLowerCase())) {
          const cityData = {
            ...city,
            slug: `${city.name.toLowerCase().replace(/ /g, "-")}-${city.id}`,
          };
          matchingCities.push(cityData);
        }
      });
      if (matchingCities.length > 5) {
        setResults(matchingCities.slice(0, 5));
      } else {
        setResults(matchingCities);
      }
    }

    return () => {
      setResults([]);
    };
  }, [query]);

  return (
    <div className="search">
      <input
        type="text"
        value={query}
        autoComplete="off"
        placeholder={placeholder ? placeholder : ""}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query.length > 3 && (
        <ul>
          {results.length > 0 ? (
            results.map((city) => (
              <li key={city.id}>
                <Link href={`/location/${city.slug}`}>
                  <a>
                    {city.name} {city.state ? `, ${city.state}` : ""}
                    <span>({city.country})</span>
                  </a>
                </Link>
              </li>
            ))
          ) : (
            <li className="search__no-results">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
