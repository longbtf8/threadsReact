import { MessageSquareQuote, Repeat } from "lucide-react";
import { useEffect, useState } from "react";
import { AddPost } from "../QuoteModal";

// handleRepeat
const HandleRepeat = ({ isOpen, onClose, handleRepost, post }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const [toggleQuote, setToggleQuote] = useState(false);
  const handleToggleQuote = () => {
    setToggleQuote(false);
    onClose();
  };

  if (!isOpen && !toggleQuote) return null;
  return (
    <div
      className="inset-0 bg-black/50  fixed left-0 bottom-15 md:z-40 z-100 md:absolute md:bottom-auto md:left-0 md:inset-auto md:top-full md:bg-transparent"
      onClick={onClose}
    >
      <div
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 z-1000 border  md:absolute md:min-w-50 md:top-0 md:right-auto md:bottom-auto md:left-0 md:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* core */}
        <div className="bg-gray-100 rounded-2xl md:bg-transparent">
          <div
            className="flex items-center gap-3 w-full p-3 cursor-pointer border-b md:hover:bg-gray-100 transition md:border-0 rounded-xl md:p-2"
            onClick={() => {
              handleRepost();
              onClose();
            }}
          >
            <span className="grow">Đăng lại</span>
            <Repeat size={20} />
          </div>
          <div
            className="flex items-center gap-3 w-full p-3 cursor-pointer md:hover:bg-gray-100 transition rounded-xl"
            onClick={() => {
              setToggleQuote(true);
            }}
          >
            <span className="grow">Trích dẫn</span>
            <MessageSquareQuote size={20} />
          </div>
        </div>
      </div>
      <AddPost isOpen={toggleQuote} onClose={handleToggleQuote} post={post} />
    </div>
  );
};
export default HandleRepeat;
