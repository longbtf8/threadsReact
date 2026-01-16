import { CodeXml, Images, Link } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CopyAsImage } from "../modalCopyAsImage";
import { EmbedModal } from "../EmbedModal";
import { handleCopyPostLink } from "../handleCopyPostLink";

// HandleSend
const HandleSend = ({ isOpen, onClose }) => {
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

  // lấy data từ redux
  const { activePostId, activePostData } = useSelector(
    (state) => state.interaction
  );
  const username = activePostData?.username;
  const postId = activePostId;
  // handleCopyLink
  const handleCopyLink = () => {
    handleCopyPostLink({
      onClose: onClose,
      PostId: postId,
      username: username,
    });
  };

  // download and copy img
  const [toggleModalCpImg, setToggleModalCpImg] = useState(false);
  const handleCloseModalCpImg = () => {
    setToggleModalCpImg(false);
    onClose();
  };

  // get embed code
  const [toggleEmbedModal, setEmbedModal] = useState(false);
  const handleCloseEmbedModal = () => {
    setEmbedModal(false);
    onClose();
  };
  return (
    <>
      {isOpen && !toggleModalCpImg && !toggleEmbedModal && (
        <div
          className="inset-0 bg-black/50  fixed left-0 bottom-15 md:z-40 z-100 md:absolute md:bottom-auto md:left-0 md:inset-auto md:top-full md:bg-transparent"
          onClick={onClose}
        >
          <div
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-2 z-1000 border  md:absolute md:min-w-60 md:top-0 md:right-auto md:bottom-auto md:left-0 md:rounded-2xl md:p-2 md:h-36"
            onClick={(e) => e.stopPropagation()}
          >
            {/* core */}
            <div className="bg-gray-100 rounded-2xl md:bg-transparent">
              <div
                className="flex items-center gap-3 w-full p-3 cursor-pointer border-b md:hover:bg-gray-100 transition md:border-0 md:rounded-xl md:py-1.5"
                onClick={() => {
                  handleCopyLink();
                }}
              >
                <span className="grow">Sao chép liên kết</span>
                <Link size={20} />
              </div>
              <div
                className="flex items-center gap-3 w-full p-3 cursor-pointer md:hover:bg-gray-100 transition md:rounded-xl md:py-1 md:border-0 border-b "
                onClick={() => {
                  setToggleModalCpImg(true);
                }}
              >
                <span className="grow">Sao chép dưới dạng hình ảnh</span>
                <Images size={20} />
              </div>
              <div
                className="flex items-center gap-3 w-full p-3 cursor-pointer md:hover:bg-gray-100 transition md:rounded-xl md:py-1.5"
                onClick={() => {
                  setEmbedModal(true);
                }}
              >
                <span className="grow">Lấy mã nhúng</span>
                <CodeXml size={20} />
              </div>
            </div>
          </div>
        </div>
      )}

      <CopyAsImage
        isOpen={toggleModalCpImg}
        onClose={() => {
          handleCloseModalCpImg();
        }}
      />
      <EmbedModal
        isOpen={toggleEmbedModal}
        onClose={() => {
          handleCloseEmbedModal();
        }}
      />
    </>
  );
};
export default HandleSend;
