import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./Card";
import "./Deck.css";

const Deck = () => {
  const initialState = [];
  const [cards, setCards] = useState(initialState);
  const [isShuttled, setIsShuttled] = useState(false);

  const deckRef = useRef();
  const btn = useRef();
  const btnReshuffle = useRef();

  useEffect(() => {
    async function getDeck() {
      const res = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      );
      deckRef.current = res.data.deck_id;
    }
    getDeck();
  }, []);

  useEffect(() => {
    const clicked = async () => {
      try {
        const res = await axios.get(
          `https://deckofcardsapi.com/api/deck/${deckRef.current}/draw/?count=1`
        );
        if (res.data.remaining === 0) throw Error("Error! Empty Deck!");

        setCards((cards) => [
          ...cards,
          {
            deckId: res.data.deck_id,
            cardCode: res.data.cards[0].code,
            image: res.data.cards[0].image,
          },
        ]);
      } catch (err) {
        alert(err);
      }
    };
    btn.current.addEventListener("click", clicked);
  }, []);

  useEffect(() => {
    const clickedReshuffle = async () => {
      setIsShuttled(true);
      try {
        const res = await axios.get(
          `https://deckofcardsapi.com/api/deck/${deckRef.current}/shuffle/`
        );
        setCards(initialState);
      } catch (err) {
        alert(err);
      } finally {
        setIsShuttled(false);
      }
    };
    btnReshuffle.current.addEventListener("click", clickedReshuffle);
  }, []);

  return (
    <div className="Deck">
      <div>
        {cards.map((card) => (
          <Card key={card.cardCode} image={card.image} />
        ))}
      </div>
      <button ref={btn}>Give Me a Card!</button>

      <button ref={btnReshuffle} disabled={isShuttled}>
        Shuffle
      </button>
    </div>
  );
};

export default Deck;
