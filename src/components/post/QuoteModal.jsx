import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

import {
  ChevronRight,
  CircleEllipsis,
  FileText,
  Folders,
  Images,
  MapPin,
  SlidersVertical,
  Smile,
  TextAlignStart,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import Modal from "react-modal";
import PostCard from "./PostCard";
import { MdGifBox } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { MorePost } from "./writeMorePost";
import { measureHeight } from "@/utils/measureHeight";
import { useGetUserInfoQuery } from "@/services/Auth/authApi";

export function AddPost({ isOpen, onClose, post }) {
  const actionStyle = "cursor-pointer p-1.5 text-(--color-time)";
  //info Me
  const { data: currentUser } = useGetUserInfoQuery();

  const { username, date, content } = {
    username: post?.user.username,
    date: post?.created_at,
    content: post?.content,
  };
  // add post
  const [extraPosts, setExtraPosts] = useState([]);
  const handleAddPost = () => {
    setExtraPosts((prev) => [...prev, { id: Date.now() }]);
  };
  const handleRemovePost = (idPost) => {
    setExtraPosts((prev) => prev.filter((item) => item.id != idPost));
  };

  // logic kẻ nối avatar
  const [replyHeight, setReplyHeight] = useState(0);
  const replyDiv = useRef();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (replyDiv.current) {
        measureHeight({
          variable: replyDiv.current,
          setHeight: setReplyHeight,
        });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [isOpen]);
  const calculatedLineHeight = replyHeight > 36 ? replyHeight - 36 : 0;
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        overlayClassName="fixed inset-0 flex md:justify-center md:items-center z-100 md:bg-black/40  "
        className="outline-none bg-background md:p-4 md:rounded-2xl md:w-155 md:pt- md:pb-6 md:px-6 md:min-h-100.5 min-h-80 p-6 w-full relative  flex flex-col max-h-[90vh] "
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

        <form className="overflow-y-auto flex-1">
          {/* Content Post */}
          <div className="flex gap-3  pt-4 pb-1.25 relative" ref={replyDiv}>
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
                <p className="font-semibold">{currentUser.username}</p>
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
                <MdGifBox size={30} className={`${actionStyle} `} />
                <Smile size={30} className={`${actionStyle}`} />
                <TextAlignStart size={30} className={`${actionStyle}`} />
                <FileText size={30} className={`${actionStyle}`} />
                <MapPin size={30} className={`${actionStyle}`} />
              </div>

              <div className="min-h-10 flex-1 mt-2 border px-2 py-4 rounded-md  mb">
                <PostCard
                  content={content}
                  username={username}
                  date={date}
                  ToggleInteractionBar={false}
                />
              </div>
            </div>
            {/* Đường kẻ - CHỈ hiện khi cả 2 điều kiện đều true */}
            <div
              className="absolute top-15 left-4 w-0.5 bg-gray-200 transition-all duration-300"
              style={{ height: `${calculatedLineHeight}px` }}
            />
          </div>

          {/* Error Message */}
          {/* {error && (
              <div className="mx-6 mb-4 rounded-lg border border-red-500/20 bg-red-500/10 p-3">
                <p className="text-sm text-red-500">
                  {error?.data?.message || "Có lỗi xảy ra, vui lòng thử lại"}
                </p>
              </div>
            )} */}
          {extraPosts.map((item) => {
            return (
              <MorePost
                key={item.id}
                onRemove={() => {
                  handleRemovePost(item.id);
                }}
              />
            );
          })}
          <div className="flex items-center gap-4 px-2 mt-2">
            <div>
              <Avatar>
                <AvatarImage
                  src="./placeholder.avif"
                  className="w-4 h-4  rounded-full border"
                />
                <AvatarFallback className="w-9 rounded-full h-9 border p-1.5">
                  Avt
                </AvatarFallback>
              </Avatar>
            </div>
            <span
              className="cursor-pointer text-gray-500"
              onClick={() => {
                handleAddPost();
              }}
            >
              Thêm vào thread
            </span>
          </div>
          {/* Modal Footer */}
          <footer className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-2 text-(--color-time) ">
              <SlidersVertical
                size={20}
                className="border text-gray-500 rounded-sm"
              />
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
