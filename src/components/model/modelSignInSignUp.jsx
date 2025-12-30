import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { ChevronRight, SquareArrowOutUpRight } from "lucide-react";
import Modal from "react-modal";
Modal.setAppElement("#root");
const ModelSignInUp = ({ modalIsOpen, closeModal }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      contentLabel="Modal SignIn"
      overlayClassName="fixed inset-0 flex justify-center items-center z-100 bg-black/40"
      className="outline-none bg-background p-4 rounded-2xl w-130 pt-12 pb-14 px-14 h-108.5"
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
    >
      <div className="pb-8">
        <div className="pb-5 flex justify-center items-center w-full h-17">
          <SquareArrowOutUpRight size={48} strokeWidth={1.5} />
        </div>
        <p className="text-[32px] font-semibold text-center pb-3">
          Đăng ký để đăng
        </p>
        <p className="text-[15px] text-gray-400 text-center">
          Tham gia Threads để chia sẻ ý tưởng, đặt câu hỏi, đăng những suy nghĩ
          bất chợt và hơn thế nữa.
        </p>
      </div>

      <div className="mt-6 flex items-center gap-x-2 bg-background rounded-2xl border py-5  pr-5">
        <div className="py-5 px-7 ">
          {" "}
          <InstagramLogoIcon className="w-6 h-6" />
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

export default ModelSignInUp;
