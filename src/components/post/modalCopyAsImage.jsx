import { useSelector } from "react-redux";
import PostCard from "./PostCard";
import { Download, X } from "lucide-react";
import Modal from "react-modal";
import { Button } from "../ui/button";

export const CopyAsImage = ({ isOpen, onClose }) => {
  const { activePostData } = useSelector((state) => state.interaction);
  const post = activePostData?.post;
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modal SignIn"
      overlayClassName="fixed inset-0 flex md:justify-center md:items-center z-100 bg-black/40 items-end"
      className="outline-none bg-background md:p-4 md:rounded-2xl md:w-130 md:pt-12 md:pb-14 md:px-14 md:h-30.5 min-h-80 p-6 rounded-t-2xl w-full relative"
    >
      <X
        size={24}
        strokeWidth={1.5}
        className="text-gray-400 md:hidden cursor-pointer"
        onClick={onClose}
      />
      <div className=" border p-4 rounded-2xl">
        <PostCard
          username={post?.user?.username}
          date={post.created_at}
          ToggleInteractionBar={true}
          likesCount={post.likes_count}
          isRepost={post.is_reposted_by_auth}
        />
      </div>
      <div className="absolute right-14 bottom-14">
        <div className="flex gap-2">
          <Button>
            <Download />
          </Button>
          <Button>Sao Chép</Button>
        </div>
      </div>
    </Modal>
  );
};
