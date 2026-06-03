// components/ui/Accordion.jsx
import { useState } from 'react';
import { ChevronDown } from 'react-icons/bs';

export default function AccordionItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-b-0 py-4 first:pt-0 last:pb-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full text-left font-semibold text-primary hover:text-primary/80 transition"
      >
        {question}
        <ChevronDown
          className={`flex-shrink-0 transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
          size={20}
        />
      </button>
      {open && (
        <p className="mt-4 text-text-light text-sm leading-relaxed animate-in fade-in">
          {answer}
        </p>
      )}
    </div>
  );
}

export function Accordion({ items }) {
  return (
    <div className="space-y-0">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
        />
      ))}
    </div>
  );
}
