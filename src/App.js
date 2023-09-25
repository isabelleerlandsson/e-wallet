import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddCard from "./components/AddCard";
import CardList from "./components/CardList";
import Navigation from "./Navigation";
import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";

function App() {
  const [randomUser, setRandomUser] = useState(null);
  const vendors = ["Mastercard", "Visa", "American Express"];

  function randomVendor() {
    const randomIndex = Math.floor(Math.random() * vendors.length);
    return vendors[randomIndex];
  }

  const initialCard = {
    vendor: randomVendor(),
    cardNumber: "0000 0000 0000 0000",
    firstName: "",
    lastName: "",
    expireMonth: "01",
    expireYear: "2025",
    ccv: "123",
    active: true,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [cards, setCards] = useState([initialCard]);

  useEffect(() => {
    axios
      .get("https://randomuser.me/api/")
      .then((response) => {
        const user = response.data.results[0];
        setRandomUser({
          firstName: user.name.first.toUpperCase(),
          lastName: user.name.last.toUpperCase(),
        });

        setCards((prevCards) => {
          const updatedCard = {
            ...prevCards[0],
            firstName: user.name.first.toUpperCase(),
            lastName: user.name.last.toUpperCase(),
          };

          return [updatedCard];
        });
      })
      .catch((error) => {
        console.error("Error fetching random user:", error);
      });
  }, []);

  return (
    <Router>
      <Navigation isEditing={isEditing} setIsEditing={setIsEditing} />

      <Routes>
        {/* Skickar card & setCards till AddCard */}
        <Route
          path="/addcard"
          element={
            <AddCard
              cards={cards}
              setCards={setCards}
              randomUser={randomUser}
            />
          }
        />

        {/* Skicka cards & setCards till CardList */}
        <Route
          path="/cards"
          element={
            <CardList
              cards={cards}
              setCards={setCards}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              randomUser={randomUser}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
