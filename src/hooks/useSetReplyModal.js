import { useState } from "react";

export const useSetReplyModal = (onClose) => {
  const [toggleReplyModal, setToggleReplyModal] = useState(false);
  const handleToggleReplyModal = () => {
    setToggleReplyModal(false);
    onClose();
  };
  return { toggleReplyModal, handleToggleReplyModal, setToggleReplyModal };
};
