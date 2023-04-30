import React from 'react';
import { useSelector } from "react-redux";
import { RootState } from '../store/homePageSlice';
import Chart from './chart';



interface BookmarkedProps {
}

const Bookmarked: React.FC<BookmarkedProps> = () => {
    const bookmarkedRestaurants = useSelector((state: RootState) => state.homePage.bookmarkedRestaurants);
  return (
    <div>
      <h1>Bookmarked Restaurants</h1>
      <div className="cardContainer">
          {bookmarkedRestaurants.map((restraunt, index) => (
            <div key={index}>
              <Chart
                restaurantName={restraunt.name}
                restaurantId={restraunt.id}
               
              />
            </div>
          ))}
        </div>
    </div>
  );
};

export default Bookmarked;
