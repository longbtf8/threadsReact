import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { ChevronRight, SquareArrowOutUpRight, X } from "lucide-react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
Modal.setAppElement("#root");

const MODAL_CONFIG = {
  default: {
    showIcon: false,
    title: "Bày tỏ nhiều hơn qua Threads",
    content:
      "Tham gia Threads để chia sẻ suy nghĩ, nắm bắt những gì đang diễn ra, theo dõi những người bạn yêu mến và hơn thế nữa.",
  },
  post: {
    showIcon: true,
    title: "Đăng ký để đăng",
    content:
      "Tham gia Threads để chia sẻ ý tưởng, đặt câu hỏi, đăng những suy nghĩ bất chợt và hơn thế nữa.",
  },
};

const ModalSignInUp = ({ modalIsOpen, closeModal }) => {
  const modalType = useSelector((state) => state.modalSignInUp.modalType);
  const currentConfig = MODAL_CONFIG[modalType] || MODAL_CONFIG.default;
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Modal SignIn"
      overlayClassName="fixed inset-0 flex md:justify-center md:items-center z-100 bg-black/40 items-end"
      className="outline-none bg-background md:p-4 md:rounded-2xl md:w-130 md:pt-12 ,md:pb-14 md:px-14 md:h-101.5 min-h-78 p-6 rounded-t-2xl w-full"
    >
      <X
        size={24}
        strokeWidth={1.5}
        className="text-gray-400 md:hidden cursor-pointer"
        onClick={closeModal}
      />
      <div className="pb-8">
        {currentConfig.showIcon ? (
          <div className="pb-5 flex justify-center items-center w-full h-17">
            <SquareArrowOutUpRight size={48} strokeWidth={1.5} />
          </div>
        ) : (
          <></>
        )}
        <p className="md:text-[32px] font-semibold text-center pb-3 text-[24px]">
          {currentConfig.title}
        </p>
        <p className="text-[15px] text-gray-400 text-center flex justify-center ">
          <div className="max-w-78"> {currentConfig.content}</div>
        </p>
      </div>

      <div className=" flex items-center gap-x-2 bg-background rounded-2xl border p-5 cursor-pointer">
        <div className="mr-1">
          {" "}
          <img
            src="./Instagram_logo.svg.webp"
            alt="logoIG"
            className="w-11.25 h-11.25"
          />
        </div>
        <div className="grow">
          <p className="text-gray-400">Tiếp tục bằng Instagram</p>
          <p className="font-semibold"> Bùi Thành Long</p>
        </div>
        <div>
          <ChevronRight size={24} strokeWidth={1.5} className="text-gray-400" />
        </div>
      </div>
    </Modal>
  );
};

export default ModalSignInUp;
