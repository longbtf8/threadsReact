import { CodeXml, Images, Link } from "lucide-react";

// HandleSend
const HandleSend = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div
      className="inset-0 bg-black/50  fixed left-0 bottom-15 z-999 md:absolute md:bottom-auto md:left-0 md:inset-auto md:top-full md:bg-transparent"
      onClick={onClose}
    >
      <div
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-2 z-1000 border  md:absolute md:min-w-60 md:top-2 md:right-auto md:bottom-auto md:left-0 md:rounded-2xl md:p-2 md:h-36"
        onClick={(e) => e.stopPropagation()}
      >
        {/* core */}
        <div className="bg-gray-100 rounded-2xl md:bg-transparent">
          <div
            className="flex items-center gap-3 w-full p-3 cursor-pointer border-b md:hover:bg-gray-100 transition md:border-0 md:rounded-xl md:py-1.5"
            onClick={onClose}
          >
            <span className="grow">Sao chép liên kết</span>
            <Link size={20} />
          </div>
          <div
            className="flex items-center gap-3 w-full p-3 cursor-pointer md:hover:bg-gray-100 transition md:rounded-xl md:py-1 md:border-0 border-b "
            onClick={onClose}
          >
            <span className="grow">Sao chép dưới dạng hình ảnh</span>
            <Images size={20} />
          </div>
          <div
            className="flex items-center gap-3 w-full p-3 cursor-pointer md:hover:bg-gray-100 transition md:rounded-xl md:py-1.5"
            onClick={onClose}
          >
            <span className="grow">Lấy mã nhúng</span>
            <CodeXml size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default HandleSend;
