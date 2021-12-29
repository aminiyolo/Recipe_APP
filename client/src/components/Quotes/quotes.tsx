import React from "react";
import getNumber from "./getNumber";

const Quote = () => {
  const number = getNumber();

  const quotes: any = [
    [
      "A crust eaten in peace is better than a banquet partaken in anxiety",
      "Aesop",
    ],
    [
      "Part of the secret of success in life is to eat what you like and let the food fight it out inside",
      "Mark Twain",
    ],
    [
      "The discovery of a new dish does more for human happiness than the discovery of a new star",
      "Jean Anthelme Brillat-Savarin",
    ],
    [
      "You don't have to cook fancy or complicated masterpieces - just good food from fresh ingredients",
      "Julia Child",
    ],
    [
      "Eat breakfast like a king, lunch like a prince, and dinner like a pauper",
      "Adelle Davis",
    ],
  ];
  return (
    <>
      <p style={{ fontWeight: "650", color: "black" }}>
        {quotes[`${number}`][0]}
      </p>
      <p style={{ fontWeight: "650", color: "black" }}>
        - {quotes[`${number}`][1]}
      </p>
    </>
  );
};

export default React.memo(Quote);
