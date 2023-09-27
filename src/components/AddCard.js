import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addCard } from "../walletSlice";
import cardChip from "./img/chip.png";
import nfcLogo from "./img/nfc.png";
import visaLogo from "./img/visa-logo.png";
import mastercardLogo from "./img/mastercard-logo.png";
import amexLogo from "./img/amex-logo.png";

// Förhandsvisning - upplägg
function CardPreview({ card, cardType, cardLogos }) {
  return (
    <div className={`card preview ${cardType}`}>
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
    </div>
  );
}

function AddCard({}) {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.wallet);
  const user = useSelector((state) => state.wallet.user);
  const initialFirstName = cards && cards[0] && cards[0].firstName;
  const initialLastName = cards && cards[0] && cards[0].lastName;

  const cardLogos = {
    mastercard: mastercardLogo,
    visa: visaLogo,
    americanexpress: amexLogo,
  };

  // Uppdatera värde
  const [vendor, setVendor] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [firstName, setFirstName] = useState(
    initialFirstName ? initialFirstName : ""
  );
  const [lastName, setLastName] = useState(
    initialLastName ? initialLastName : ""
  );
  const [expireMonth, setExpireMonth] = useState("");
  const [expireYear, setExpireYear] = useState("");
  const [ccv, setCcv] = useState("");

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }
  }, [user]);

  const cardType = vendor.toLowerCase().replace(/\s+/g, "");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Max 4 kort
    if (cards && cards.cards && cards.cards.length >= 4) {
      alert("Du kan bara ha maximalt 4 kort i din e-wallet!");
      return;
    }

    // Max och minst 16 siffror
    if (cardNumber.replace(/[^0-9]/g, "").length !== 16) {
      alert("Kortnumret måste ha 16 siffror");
      return;
    }

    // Måste ange månad
    if (!expireMonth || expireMonth === "") {
      alert("Du måste ange en utgångsmånad");
      return;
    }

    // Måste ange år
    if (!expireYear || expireYear === "") {
      alert("Du måste ange ett utgångsår");
      return;
    }

    // Måste ange CCV
    if (!ccv || ccv.length !== 3) {
      alert("Du måste ange ett korrekt CCV");
      return;
    }

    navigate("/cards"); // Navigerar vidare till cards när man lagt till et nytt.

    // Lägg till nya kortet till cards-arrayen
    const newCard = {
      vendor,
      cardNumber,
      firstName,
      lastName,
      expireMonth,
      expireYear,
      ccv,
    };

    dispatch(addCard(newCard));

    // Rensar efter sparat kort
    setVendor("");
    setCardNumber("");
    setFirstName("");
    setLastName("");
    setExpireMonth("");
    setExpireYear("");
    setCcv("");
  };

  //   Alla fält måste vara ifyllda för att förhandsvisningen ska funka
  const allFieldsFilled = () => {
    return (
      vendor &&
      cardNumber &&
      firstName &&
      lastName &&
      expireMonth &&
      expireYear &&
      ccv
    );
  };

  return (
    <div>
      <h1>Lägg till nytt kort</h1>

      {allFieldsFilled() && (
        <div className="preview-container">
          <CardPreview
            card={{
              vendor,
              cardNumber,
              firstName,
              lastName,
              expireMonth,
              expireYear,
              ccv,
            }}
            cardType={cardType}
            cardLogos={cardLogos}
          />
        </div>
      )}

      {/* FORMULÄR FÖR NYTT KORT */}
      <form onSubmit={handleSubmit}>
        {/* För- och efternamn*/}
        <div>
          <input type="text" readOnly value={firstName} placeholder="Förnamn" />
          <input
            type="text"
            readOnly
            value={lastName}
            placeholder="Efternamn"
          />
        </div>

        {/* Vendor */}
        <div>
          <select value={vendor} onChange={(e) => setVendor(e.target.value)}>
            <option value="" disabled>
              Korttyp
            </option>
            <option value="Mastercard">Mastercard</option>
            <option value="Visa">Visa</option>
            <option value="AMERICAN EXPRESS">American Express</option>
          </select>
        </div>

        {/* Kortnummer */}
        <div>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => {
              const formatted = e.target.value
                .replace(/\D/g, "")
                .slice(0, 16)
                .replace(/(\d{4})(?=\d)/g, "$1 ");
              setCardNumber(formatted);
            }}
            placeholder="Kortnummer"
            maxLength="19"
          />
        </div>

        <div>
          <div className="dateContainer">
            {/* ExpireMonth */}
            <select
              value={expireMonth}
              onChange={(e) => setExpireMonth(e.target.value)}
            >
              <option value="">Månad</option>
              <option value="01">Januari</option>
              <option value="02">Februari</option>
              <option value="03">Mars</option>
              <option value="04">April</option>
              <option value="05">Maj</option>
              <option value="06">Juni</option>
              <option value="07">Juli</option>
              <option value="08">Augusti</option>
              <option value="09">September</option>
              <option value="10">Oktober</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>

            {/* ExpireYear */}
            <select
              value={expireYear}
              onChange={(e) => setExpireYear(e.target.value)}
            >
              <option value="">År</option>
              {[...Array(10)].map((_, i) => (
                <option key={i} value={currentYear + i}>
                  {currentYear + i}
                </option>
              ))}
            </select>
            {/* CCV */}
            <input
              type="text"
              value={ccv}
              onChange={(e) => {
                if (e.target.value === "" || /^[0-9]+$/.test(e.target.value)) {
                  setCcv(e.target.value);
                }
              }}
              placeholder="CCV"
              maxLength="3"
              pattern="\d{3}"
            />
          </div>
        </div>

        <div className="buttonContainer">
          <button className="button" type="submit">
            Lägg till kort
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCard;
