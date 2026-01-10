import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

import {
  ChevronRight,
  CircleEllipsis,
  FileText,
  Folders,
  Images,
  MapPin,
  SeparatorHorizontal,
  SlidersVertical,
  Smile,
  TextAlignStart,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import Modal from "react-modal";

export function AddPost({ isOpen, onClose }) {
  const actionStyle = "cursor-pointer p-1.5 text-(--color-time)";

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        overlayClassName="fixed inset-0 flex md:justify-center md:items-center z-100 bg-black/40 items-end"
        className="outline-none bg-background md:p-4 md:rounded-2xl md:w-130 md:pt- md:pb-6 md:px-6 md:h-110.5 min-h-80 p-6 rounded-t-2xl w-full relative"
      >
        <div className="border-b -mx-6">
          <header className="flex items-center justify-between  py-2  px-6">
            <button
              className="close-btn cursor-pointer p-1 font-bold"
              onClick={onClose}
            >
              <X />
            </button>
            <p className="text-[16px] font-bold">Thread mới</p>
            <div className="flex items-center">
              <Folders size={34} className="p-1.5" />
              <CircleEllipsis size={34} className="p-1.5" />
            </div>
          </header>
        </div>

        <form>
          {/* Content Post */}
          <div className="flex gap-3  pt-4 pb-1.25">
            <Avatar>
              <AvatarImage
                src="./placeholder.avif"
                className="w-9 h-9  rounded-full border"
              />
              <AvatarFallback className="w-9 rounded-full h-9 border p-1.5">
                Avt
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <p className="font-semibold">User name</p>
                <ChevronRight className="mr-1 -ml-0.5 size-4" />
                <input
                  type="text"
                  placeholder="Thêm chủ đề"
                  className="px-0.5 py-px focus:outline-0"
                />
              </div>
              <main>
                <textarea
                  placeholder={`Có gì mới...?`}
                  className="w-full resize-none overflow-hidden focus:outline-0"
                ></textarea>
              </main>
              {/* Action */}
              <div className="flex gap-1.5">
                <Images size={30} className={`${actionStyle}`} />
                <Smile size={30} className={`${actionStyle}`} />
                <TextAlignStart size={30} className={`${actionStyle}`} />
                <FileText size={30} className={`${actionStyle}`} />
                <MapPin size={30} className={`${actionStyle}`} />
              </div>
            </div>
          </div>

          {/* Error Message */}
          {/* {error && (
              <div className="mx-6 mb-4 rounded-lg border border-red-500/20 bg-red-500/10 p-3">
                <p className="text-sm text-red-500">
                  {error?.data?.message || "Có lỗi xảy ra, vui lòng thử lại"}
                </p>
              </div>
            )} */}

          {/* Modal Footer */}
          <footer className="flex items-center justify-between p-6">
            <div className="flex items-center gap-2 text-(--color-time)">
              <SlidersVertical size={20} />
              <span className="font-semibold">
                Các lựa chọn để kiểm soát câu trả lời
              </span>
            </div>
            <Button
              className={`cursor-pointer border border-(--outline-primary) bg-(--bg-primary) px-4 text-(--text-color) select-none`}
            >
              "Đang đăng..." : "Đăng"
            </Button>
          </footer>
        </form>
      </Modal>
    </>
  );
}
