import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import "../styles/homePage.css";
import Chart from "./chart";
import { useDispatch, useSelector } from "react-redux";
import { RootState, addRestaurant } from "../store/homePageSlice";

interface Restaurant {
  id: string;
  name: string;
}

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const [query, setQuery] = useState<Restaurant>({ id: "", name: "" });

  const [results, setResults] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const restaurants = useSelector(
    (state: RootState) => state.homePage.restaurants
  );

  useEffect(() => {
    if (query.name.length > 0 && showSuggestions) {
      setIsLoading(true);
      const searchQuery = query.name.toLowerCase(); // convert search query to lowercase
      axios
        .get(
          `https://api.airtable.com/v0/appjWdL7YgpxIxCKA/restaurants?filterByFormula=FIND("${searchQuery}",LOWER({Name}))`,
          {
            headers: {
              Authorization: "Bearer keyfXgn8PL6pB3x32",
            },
          }
        )
        .then((response) => {
          setResults(
            response.data.records.map((record: any) => ({
              id: record.id,
              name: record.fields.Name,
            }))
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setResults([]);
    }
  }, [query, showSuggestions]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery({
      id: query.id,
      name: event.target.value,
    });
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (restaurant: Restaurant) => {
    setQuery(restaurant);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const handleAddClick = () => {
    dispatch(addRestaurant(query));
    setQuery({ id: "", name: "" });
  };

  

  return (
    <>
      <div className="search-container">
        <div className="input-container">
          <input
            type="text"
            value={query.name}
            onChange={handleInputChange}
            className="search-input"
            ref={inputRef}
          />
          <Button variant="primary" onClick={handleAddClick}>
            ADD
          </Button>
        </div>
        {isLoading ? (
          <p className="search-message">Loading...</p>
        ) : (
          showSuggestions &&
          results.length > 0 && (
            <div className="search-results-container">
              <ul className="search-results">
                {results.slice(0, 6).map((restaurant) => (
                  <li
                    key={restaurant.id}
                    className="search-result"
                    onClick={() => handleSuggestionClick(restaurant)}
                  >
                    {restaurant.name}
                  </li>
                ))}
              </ul>
            </div>
          )
        )}
        
      </div>
      <div className="cardContainer">
          {restaurants.map((restraunt, index) => (
            <div key={index}>
              <Chart
                restaurantName={restraunt.name}
                restaurantId={restraunt.id}
               
              />
            </div>
          ))}
        </div>
    </>
  );
};

export default HomePage;
