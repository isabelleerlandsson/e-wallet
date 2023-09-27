import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddCard from "./components/AddCard";
import CardList from "./components/CardList";
import Navigation from "./Navigation";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "./walletSlice";
import "./styles.css";

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <Router>
      <Navigation isEditing={isEditing} setIsEditing={setIsEditing} />

      <Routes>
        {/* Skickar card & setCards till AddCard */}
        <Route path="/addcard" element={<AddCard />} />

        {/* Skicka cards & setCards till CardList */}
        <Route
          path="/cards"
          element={
            <CardList isEditing={isEditing} setIsEditing={setIsEditing} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
