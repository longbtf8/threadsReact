import { X } from "lucide-react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import PostCard from "./PostCard";
import { Button } from "../ui/button";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";

export const EmbedModal = ({ isOpen, onClose }) => {
  const { activePostData } = useSelector((state) => state.interaction);
  const post = activePostData?.post;

  if (!post) {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        overlayClassName="fixed inset-0 flex md:justify-center md:items-center z-100 bg-black/40 items-end"
        className="outline-none bg-background md:p-4 md:rounded-2xl md:w-130 md:pt-12 md:pb-14 md:px-14 md:min-h-50.5 min-h-20 p-6 rounded-t-2xl w-full"
      >
        <div className="text-center p-4">Đang tải...</div>
      </Modal>
    );
  }
  const embedUrl =
    window.location.origin +
    "/" +
    post?.user?.username +
    "/post/" +
    post?.id +
    "/embed";
  const embedCode = `<iframe src="${embedUrl}"></iframe>`;
  const handleCopy = (value) => {
    copy(value);
    toast("Đã sao chép", {
      position: "bottom-center",
      autoClose: 3000,
      theme: "dark",
      className: "!w-fit",
    });

    onClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modal SignIn"
      overlayClassName="fixed inset-0 flex md:justify-center md:items-center z-100 bg-black/40 items-end "
      className="outline-none bg-background md:p-4 md:rounded-2xl md:w-130 md:pt-12 md:pb-14 md:px-14 md:min-h-50.5 min-h-20 p-6 rounded-t-2xl w-full "
    >
      <X
        size={24}
        strokeWidth={1.5}
        className="text-gray-400 md:hidden cursor-pointer mb-2"
        onClick={onClose}
      />
      <div className=" border p-4 rounded-2xl  relative pb-10 bg-background">
        <PostCard
          username={post?.user?.username}
          date={post?.created_at}
          ToggleInteractionBar={true}
          likesCount={post?.likes_count}
          repostCount={post?.reposts_and_quotes_count}
          content={post?.content}
          className={"pointer-events-none select-none"}
        />
        <div className="absolute right-2 bottom-1 flex gap-1 border p-1 rounded-xl bg-gray-200 cursor-pointer">
          View On Threads
          <img src="./Thread_logo.svg" alt="logoThread" className="w-6 h-6" />
        </div>
      </div>

      <textarea
        name="embedCode"
        id="embedCode"
        className="mt-4 w-full border p-2 rounded-xl bg-gray-200"
      >
        {embedCode}
      </textarea>
      <div
        className="flex justify-end"
        onClick={() => {
          handleCopy(embedCode);
        }}
      >
        <Button>Sao Chép</Button>
      </div>
    </Modal>
  );
};
