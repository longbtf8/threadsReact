import { useEffect } from "react";

export const useHandleClickOutSide = ({ valueRef, isOpen, onClose }) => {
  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (
        valueRef?.current &&
        isOpen &&
        !valueRef?.current?.contains(e.target) &&
        e.target.isConnected
      ) {
        onClose();
        console.log(valueRef?.current?.contains(e.target));
      }
    };
    window.addEventListener("mousedown", handleClickOutSide);
    return () => {
      window.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [isOpen, onClose]);
};
