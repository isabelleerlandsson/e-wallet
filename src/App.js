import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddCard from "./components/AddCard";
import CardList from "./components/CardList";
import Navigation from "./Navigation";
import React, { useState } from "react";
import "./styles.css";

function App() {
  const initialCard = {
    vendor: "Mastercard",
    cardNumber: "1234 5678 9000 0000",
    firstName: "John",
    lastName: "Doe",
    expireMonth: "01",
    expireYear: "2025",
    ccv: "123",
    active: true,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [cards, setCards] = useState([initialCard]);

  return (
    <Router>
      <Navigation isEditing={isEditing} setIsEditing={setIsEditing} />

      <Routes>
        {/* Skickar card & setCards till AddCard */}
        <Route
          path="/addcard"
          element={<AddCard cards={cards} setCards={setCards} />}
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
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
