import React, { useState } from 'react';
import AccordionItem from './AccordionItem';

const Accordion = ({ items, defaultOpenIndex = 0, allowMultiple = false }) => {
    const [openIndexes, setOpenIndexes] = useState(
        allowMultiple ? [defaultOpenIndex] : [defaultOpenIndex]
    );

    const handleToggle = (index) => {
        if (allowMultiple) {
            setOpenIndexes((prev) =>
                prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
            );
        } else {
            setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
        }
    };

    return (
        <div className="h-auto">
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    index={index}
                    title={item.accordionTitle}
                    content={item.content}
                    isOpen={openIndexes.includes(index)}
                    onToggle={handleToggle}
                />
            ))}
        </div>
    );
};

export default Accordion;