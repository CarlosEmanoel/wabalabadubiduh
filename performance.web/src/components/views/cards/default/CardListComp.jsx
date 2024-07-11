import React from "react";
import Card from "./CardComp";

export default function CardListComp({ size, cursor, cards = [] }) {
  return (
    <div className="flex flex-wrap -m-4">
      {cards.map((card, index) => (
        <Card
          key={index}
          size={size}
          cursor={cursor}
          image={card.image}
          title={card.title}
          subtitle={card.subtitle}
          description={card.description}
          link={card.link}
        />
      ))}
    </div>
  );
}
