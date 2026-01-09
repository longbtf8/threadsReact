import { InstagramLogoIcon } from "@radix-ui/react-icons";
import {
  ChevronRight,
  Heart,
  MessageCircle,
  Repeat,
  SquareArrowOutUpRight,
  X,
} from "lucide-react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { Link } from "react-router";
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
    icon: SquareArrowOutUpRight,
    title: "Đăng ký để đăng",
    content:
      "Tham gia Threads để chia sẻ ý tưởng, đặt câu hỏi, đăng những suy nghĩ bất chợt và hơn thế nữa.",
  },
  heart: {
    showIcon: true,
    icon: Heart,
    title: "Bạn thích nội dung này ư? Bạn sẽ thích mê Threads",
    content: `Hãy đăng ký để thích, trả lời và hơn thế nữa.`,
  },
  comment: {
    showIcon: true,
    icon: MessageCircle,
    title: "Đăng ký để trả lời",
    content: "Chỉ còn một bước nữa là bạn có thể tham gia cuộc trò chuyện rồi.",
  },
  repeat: {
    showIcon: true,
    icon: Repeat,
    title: "Đăng ký để đăng lại",
    content:
      "Bạn đã tiến thêm được một bước trong hành trình khơi mào cuộc trò chuyện.",
  },
};

const ModalSignInUp = ({ modalIsOpen, closeModal }) => {
  const modalType = useSelector((state) => state.modalSignInUp.modalType);
  const currentConfig = MODAL_CONFIG[modalType] || MODAL_CONFIG.default;
  const IconComponent = currentConfig.icon;
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Modal SignIn"
      overlayClassName="fixed inset-0 flex md:justify-center md:items-center z-100 bg-black/40 items-end"
      className="outline-none bg-background md:p-4 md:rounded-2xl md:w-130 md:pt-12 md:pb-14 md:px-14 md:h-110.5 min-h-80 p-6 rounded-t-2xl w-full"
    >
      <X
        size={24}
        strokeWidth={1.5}
        className="text-gray-400 md:hidden cursor-pointer"
        onClick={closeModal}
      />
      <div className="pb-4">
        {currentConfig.showIcon ? (
          <div className="pb-5 flex justify-center items-center w-full h-17">
            <IconComponent size={48} strokeWidth={1.5} />
          </div>
        ) : (
          <></>
        )}
        <p className="md:text-[32px] font-semibold text-center pb-3 text-[24px]">
          {currentConfig.title}
        </p>
        <div className="text-[15px] text-gray-400 text-center flex justify-center ">
          <p className="max-w-78"> {currentConfig.content}</p>
        </div>
      </div>
      <div className="flex justify-center items-center mb-2 pb-4 cursor-pointer font-semibold underline">
        {" "}
        <Link to={"/login"}>Đăng nhập </Link>
      </div>
      <div className=" flex items-center gap-x-2 bg-background rounded-2xl border p-5 cursor-pointer ">
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
