import React from "react";
import IconCardComp from "./IconCardComp";

export default function IconCardListComp({
  size,
  cursor,
  cards = [],
  transparent,
}) {
  /* 
<div className="container mx-auto px-4 py-8">
<div className="">
*/
  return (
    <div className="container mx-auto gap-3 py-8 flex flex-wrap">
      {cards.map((card, index) => (
        <IconCardComp
          key={index}
          size={size}
          cursor={cursor}
          image={card.image}
          title={card.title}
          subtitle={card.subtitle}
          description={card.description}
          link={card.link}
          buttonTitle={card.buttonTitle}
          transparent={transparent}
        />
      ))}
    </div>
  );
}
