import React from "react";
import "font-awesome/css/font-awesome.min.css";
import cardChip from "./img/chip.png";
import mastercardLogo from "./img/mastercard-logo.png";
import visaLogo from "./img/visa-logo.png";
import amexLogo from "./img/amex-logo.png";
import nfcLogo from "./img/nfc.png";

function CardList({ cards, setCards, isEditing }) {
  const cardLogos = {
    mastercard: mastercardLogo,
    visa: visaLogo,
    americanexpress: amexLogo,
  };

  // Ta bort kort
  function deleteCard(cardId, event) {
    event.stopPropagation();
    if (cards[cardId].active) {
      alert(
        "Det går inte att ta bort ett aktivt kort. Vänligen byt kort först!"
      );
      return;
    }

    if (cards.length <= 1) {
      alert(
        "Du måste ha minst ett kort i din plånbok. Vänligen lägg till ett nytt och prova igen!"
      );
      return;
    }

    const updatedCards = cards.filter((_, id) => id !== cardId);
    setCards(updatedCards);
  }
  // ---------------------------------------------

  // Position aktiva kortet
  function handleCardClick(clickedId) {
    const updatedCards = cards.map((card, id) => {
      if (id === clickedId) {
        return { ...card, active: true };
      } else {
        return { ...card, active: false };
      }
    });

    const activeCard = updatedCards[clickedId];
    updatedCards.splice(clickedId, 1);
    updatedCards.unshift(activeCard);

    setCards(updatedCards);
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
                onClick={() => handleCardClick(i)}
                key={card.id}
              >
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
                      onClick={(event) => deleteCard(i, event)}
                    ></i>
                  )}{" "}
                </span>
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
                onClick={() => handleCardClick(i)}
                key={card.id}
              >
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
                      onClick={(event) => deleteCard(i, event)}
                    ></i>
                  )}{" "}
                </span>
              </div>
            );
          }

          return null; // Inget returnerat för aktiva kort här
        })}
      </div>
    </div>
  );
}

export default CardList;
