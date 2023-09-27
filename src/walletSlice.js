import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Hämta API
export const getUser = createAsyncThunk("wallet/getUser", async () => {
  const response = await axios.get("https://randomuser.me/api/");
  const user = response.data.results[0];
  console.log(user);

  // Förnamn och efternamn från API
  return {
    firstName: user.name.first.toUpperCase(),
    lastName: user.name.last.toUpperCase(),
  };
});

const vendors = ["Mastercard", "Visa", "American Express"];
// Slumpmässig vendor vid start av applikation
function randomVendor() {
  const randomIndex = Math.floor(Math.random() * vendors.length);
  return vendors[randomIndex];
}

// Kort som finns vid start av applikation
const initialState = {
  cards: [
    {
      vendor: randomVendor(),
      cardNumber: "0000 0000 0000 0000",
      firstName: "",
      lastName: "",
      expireMonth: "01",
      expireYear: "2025",
      ccv: "123",
      active: true,
    },
  ],
  user: null,
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    // Lägg till nya kort
    addCard: (state, action) => {
      state.cards.push(action.payload);
    },

    // Ta bort kort funktionen
    deleteCard: (state, action) => {
      const cardId = action.payload;
      const card = state.cards[cardId];
      if (card && card.active) {
        alert(
          "Det går inte att ta bort ett aktivt kort. Vänligen byt kort först!"
        );
        return state;
      }
      if (state.cards.length <= 1) {
        alert(
          "Du måste ha minst ett kort i din plånbok. Vänligen lägg till ett nytt och prova igen!"
        );
        return state;
      }
      return {
        ...state,
        cards: state.cards.filter((_, id) => id !== cardId),
      };
    },

    // Sätt kort aktiva
    setActiveCard: (state, action) => {
      const clickedId = action.payload;
      state.cards = state.cards.map((card, id) => {
        if (id === clickedId) {
          return { ...card, active: true };
        } else {
          return { ...card, active: false };
        }
      });
    },
  },
  // Skriver ut namnet på aktiva kortet vid start av applikation.
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = {
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
      };
      // Uppdatera även första kortet med användarnamnet
      state.cards[0].firstName = action.payload.firstName;
      state.cards[0].lastName = action.payload.lastName;
    });
  },
});

export const { addCard, deleteCard, setActiveCard } = walletSlice.actions;

export const selectCards = (state) => state.wallet.cards;

export default walletSlice.reducer;
