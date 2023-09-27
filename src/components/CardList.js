import React from "react";
import "font-awesome/css/font-awesome.min.css";
import cardChip from "./img/chip.png";
import mastercardLogo from "./img/mastercard-logo.png";
import visaLogo from "./img/visa-logo.png";
import amexLogo from "./img/amex-logo.png";
import nfcLogo from "./img/nfc.png";
import { useSelector, useDispatch } from "react-redux";
import { selectCards, deleteCard, setActiveCard } from "../walletSlice";

function CardList({ isEditing }) {
  const cards = useSelector(selectCards);
  const dispatch = useDispatch();

  const cardLogos = {
    mastercard: mastercardLogo,
    visa: visaLogo,
    americanexpress: amexLogo,
  };

  function handleDeleteCard(cardId, event) {
    event.stopPropagation();
    dispatch(deleteCard(cardId));
  }

  function handleCardClick(clickedId, event) {
    event.stopPropagation();
    dispatch(setActiveCard(clickedId));
  }
  // ---------------------------------------------

  return (
    <div className="preview-container">
      <h1>E-WALLET</h1>

      {/* Aktiva kortet */}
      <h3>Aktiv</h3>
      <div>
        {cards.map((card, i) => {
          let cardType = card.vendor.toLowerCase().replace(/\s+/g, "");

          if (card.active) {
            return (
              <div
                className={`card preview ${
                  card.active ? "active-card" : ""
                } ${cardType}`}
                onClick={(event) => handleCardClick(i, event)}
                key={i}
              >
                {/* Kortets innehåll */}
                <img src={cardChip} alt="Card Chip" className="card-chip" />
                <img src={nfcLogo} alt="NFC Chip" className="nfc-chip" />

                <p className="cardNumber">{card.cardNumber}</p>

                <div className="dates">
                  <span>
                    {card.expireMonth}/{card.expireYear}
                  </span>
                  <span>{card.ccv}</span>
                </div>

                <p className="card-name">
                  {card.firstName} {card.lastName}
                </p>

                <img
                  src={cardLogos[cardType]}
                  alt={card.vendor}
                  className={`vendor-logo-${cardType}`}
                />

                <span className="delete-icon">
                  {isEditing && (
                    <i
                      className="fa fa-trash"
                      onClick={(event) => handleDeleteCard(i, event)}
                    ></i>
                  )}
                </span>
                {/* -------------------------- */}
              </div>
            );
          }
          return null;
        })}

        {/* Inaktiva kort */}
        <h3>Inaktiv</h3>
        {cards.map((card, i) => {
          let cardType = card.vendor.toLowerCase().replace(/\s+/g, "");

          if (!card.active) {
            return (
              <div
                className={`card preview ${
                  card.active ? "active-card" : ""
                } ${cardType}`}
                onClick={(event) => handleCardClick(i, event)}
                key={i}
              >
                {/* Kortets innehåll */}
                <img src={cardChip} alt="Card Chip" className="card-chip" />
                <img src={nfcLogo} alt="NFC Chip" className="nfc-chip" />

                <p className="cardNumber">{card.cardNumber}</p>

                <div className="dates">
                  <span>
                    {card.expireMonth}/{card.expireYear}
                  </span>
                  <span>{card.ccv}</span>
                </div>

                <p className="card-name">
                  {card.firstName} {card.lastName}
                </p>

                <img
                  src={cardLogos[cardType]}
                  alt={card.vendor}
                  className={`vendor-logo-${cardType}`}
                />

                <span className="delete-icon">
                  {isEditing && (
                    <i
                      className="fa fa-trash"
                      onClick={(event) => handleDeleteCard(i, event)}
                    ></i>
                  )}
                </span>
                {/* -------------------------- */}
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}

export default CardList;
