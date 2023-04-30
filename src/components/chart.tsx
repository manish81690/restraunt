import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../styles/chart.css';
import { useDispatch } from "react-redux";
import { addToBookmark, removeFromBookmark, removeRestaurant } from "../store/homePageSlice";

interface CardProps {
  restaurantName: string,
  restaurantId:string,
  
  
}

const Chart: React.FC<CardProps> = ({restaurantName,restaurantId}) => {
  const srcUrl = `https://datastudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params={"ds2.name2":"${restaurantName}"}`;
  const [bookmarked, setBookmarked] = useState(false);
  const dispatch = useDispatch();
  const handleDeleteClick = () => {
    dispatch(removeRestaurant(restaurantId));
  };

  const handleBookmarkClick = () => {
    if (bookmarked) {
      setBookmarked(false);
      dispatch(removeFromBookmark(restaurantId));
    } else {
      dispatch(addToBookmark(restaurantId));
      setBookmarked(true);
    }
    
  };

  return (
    <Card  className="restrauntCard" style={{ width: '40rem', height: '20rem' }}>
      <Card.Title>{restaurantName}</Card.Title>
      <Card.Body>
        <iframe title="map" src={srcUrl} width="100%" height="100%" />
      </Card.Body>
      <div className="d-flex justify-content-end">
      <Button className="mx-2" variant="primary" onClick={handleBookmarkClick}>
  {bookmarked ? 'Bookmarked' : 'Bookmark'}
</Button>
        <Button variant="danger" onClick={handleDeleteClick}>Delete</Button>
      </div>
    </Card>
  );
};

export default Chart;
