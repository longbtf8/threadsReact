import { useState } from "react";

export const useSetQuoteModal = (onClose) => {
  const [toggleQuote, setToggleQuote] = useState(false);
  const handleToggleQuote = () => {
    setToggleQuote(false);
    onClose();
  };
  return { toggleQuote, handleToggleQuote, setToggleQuote };
};
