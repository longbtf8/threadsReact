import { useSelector } from "react-redux";
import PostCard from "./PostCard";
import { Download, X } from "lucide-react";
import Modal from "react-modal";
import { Button } from "../ui/button";
import { useCallback, useRef } from "react";
import { toJpeg } from "html-to-image";

export const CopyAsImage = ({ isOpen, onClose }) => {
  const { activePostData } = useSelector((state) => state.interaction);
  const post = activePostData?.post;
  //  download Img
  const postRef = useRef();
  const onDownLoadClick = useCallback(() => {
    if (postRef.current === null) {
      return;
    }

    toJpeg(postRef.current, { cacheBust: true })
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = "post-thread.jpeg";
        link.href = dataUrl;
        link.click();
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postRef]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modal SignIn"
      overlayClassName="fixed inset-0 flex md:justify-center md:items-center z-100 bg-black/40 items-end justify-end"
      className="outline-none bg-background md:p-4 md:rounded-2xl md:w-130 md:pt-12 md:pb-14 md:px-14 md:min-h-50.5 min-h-20 p-6 rounded-t-2xl w-full "
    >
      <X
        size={24}
        strokeWidth={1.5}
        className="text-gray-400 md:hidden cursor-pointer mb-2"
        onClick={onClose}
      />

      <div
        className=" border p-4 rounded-2xl pointer-events-none select-none relative pb-10 bg-background"
        ref={postRef}
      >
        <PostCard
          username={post?.user?.username}
          date={post.created_at}
          ToggleInteractionBar={true}
          likesCount={post.likes_count}
          repostCount={post.reposts_and_quotes_count}
          content={post.content}
        />
        <div className="absolute right-2 bottom-2">
          <img src="./Thread_logo.svg" alt="logoThread" className="w-8 h-8 " />
        </div>
      </div>
      <div className="relative mt-9 ">
        <div className="flex gap-2 justify-end">
          <Button onClick={onDownLoadClick} className={"cursor-pointer"}>
            <Download />
          </Button>
          <Button className="cursor-pointer">Sao Chép</Button>
        </div>
      </div>
    </Modal>
  );
};
