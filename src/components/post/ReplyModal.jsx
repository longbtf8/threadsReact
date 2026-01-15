import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

import {
  ChevronRight,
  CircleEllipsis,
  FileText,
  Folders,
  Images,
  Loader,
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
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useCreateReplyMutation } from "@/services/postService";
import { toast } from "react-toastify";

const schema = zod.object({
  replies: zod.array(
    zod.object({
      content: zod.string().min(1, "Nội dung không được để trống"), // Validate bắt buộc
      topic: zod.string().optional(),
    })
  ),
});

export function ReplyModal({ isOpen, onClose, post }) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      replies: [{ content: "", topic: "" }], // Luôn có 1 bài mặc định (bài chính)
    },
  });

  // quan ly dynamic
  const { fields, append, remove } = useFieldArray({
    control,
    name: "replies",
  });
  const [createReply, { isLoading }] = useCreateReplyMutation();
  const onSubmit = async (formData) => {
    try {
      let currentParentId = post.id; // id của post hiện tại
      for (const replyItem of formData.replies) {
        const payload = {
          content: replyItem.content,
        };
        const result = await createReply({
          id: currentParentId,
          postData: payload,
        }).unwrap();

        if (result && result?.id) {
          currentParentId = result.id;
        }
        toast("Đăng thành công", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "dark",
          className: "!w-fit",
        });
      }
    } catch (error) {
      console.error("Lỗi khi đăng bài:", error);
      toast("Đã có Lỗi", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "dark",
        className: "!w-fit",
      });
    } finally {
      onClose();
    }
  };

  // Kiểm tra điều kiện xem phần tử cuối có được gõ không thì add thêm
  const repliesValue = useWatch({ name: "replies", control });
  const lastReplyIndex = repliesValue.length - 1;
  const lastReplyContent = repliesValue[lastReplyIndex]?.content || "";
  const canAddMore = lastReplyContent.trim().length > 0;

  //info Me
  const { data: currentUser } = useGetUserInfoQuery();

  const { username, date, content } = {
    username: post?.user.username,
    date: post?.created_at,
    content: post?.content,
  };
  // logic kẻ nối avatar từ post
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
  //   kẻ avatar từ post1 xuống post 1,2,3
  const [PostHeight, setPostHeight] = useState(0);
  const postDiv = useRef();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (postDiv.current) {
        measureHeight({
          variable: postDiv.current,
          setHeight: setPostHeight,
        });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [isOpen]);
  const calculatedLinePostHeight = PostHeight > 36 ? PostHeight - 36 : 0;

  // Reset form mỗi khi mở modal
  useEffect(() => {
    if (isOpen) {
      reset({ replies: [{ content: "", topic: "" }] });
    }
  }, [isOpen, reset]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        overlayClassName="fixed inset-0 flex md:justify-center md:items-center z-100 md:bg-black/40  "
        className=" flex flex-col outline-none bg-background md:p-4 md:rounded-2xl md:w-155  md:h-auto md:max-h-150 h-screen rounded-none p-6  w-full "
      >
        <div className="border-b -mx-4">
          <header className="flex items-center justify-between  py-2  px-6">
            <button
              className="close-btn cursor-pointer p-1 font-bold"
              onClick={onClose}
            >
              <X />
            </button>
            <p className="text-[16px] font-bold">Reply</p>
            <div className="flex items-center">
              <Folders size={34} className="p-1.5" />
              <CircleEllipsis size={34} className="p-1.5" />
            </div>
          </header>
        </div>

        <form
          className="flex-1 flex-col flex  min-h-0"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="overflow-y-auto flex-1 flex-col flex  min-h-0 overflow-x-hidden">
            {/* Content Post */}
            {/* Post Gốc (Của người khác) */}
            <div className="flex gap-3  pt-4 pb-1.25 relative">
              <div className="flex-1">
                <div
                  className="min-h-10 flex-1 mt-2 rounded-md mb-5 -mx-4 "
                  ref={replyDiv}
                >
                  <PostCard
                    content={content}
                    username={username}
                    date={date}
                    ToggleInteractionBar={false}
                    ToggleMenu={false}
                  />
                </div>
              </div>
              {/* Đường kẻ  */}
              <div
                className="absolute top-16 left-4 w-0.5 bg-gray-200 transition-all duration-300"
                style={{ height: `${calculatedLineHeight}px` }}
              ></div>
            </div>

            {/* --- BÀI REPLY CHÍNH (INDEX 0) --- */}
            <div className="-mt-4 flex relative" ref={postDiv}>
              <Avatar>
                <AvatarImage
                  src="./placeholder.avif"
                  className="w-9 h-9  rounded-full border"
                />
                <AvatarFallback className="w-9 rounded-full h-9 border p-1.5">
                  Avt
                </AvatarFallback>
              </Avatar>

              <div className="grow relative">
                <div className="flex gap-2 items-start justify-start">
                  <p className="font-semibold cursor-pointer hover:underline">
                    {currentUser.name}
                  </p>{" "}
                  <span className="text-gray-400">&gt;</span>
                  <input
                    type="text"
                    placeholder="Thêm chủ đề"
                    className="outline-none focus:border-gray-300 transition duration-300 border-transparent border-b"
                    {...register("replies.0.topic")}
                  />
                </div>
                <textarea
                  type="text"
                  placeholder={`Trả lời ${username}...`}
                  className="outline-none w-full min-h-5 pr-10 mb-2"
                  {...register("replies.0.content")}
                />
                <div className="h-5 text-red-400">
                  {
                    <p>
                      {errors.replies?.[0]?.content && (
                        <span className="text-red-500 text-xs">
                          {errors.replies[0].content.message}
                        </span>
                      )}
                    </p>
                  }
                </div>
              </div>
              {/* line */}
              <div
                className="absolute top-10.5 left-4 w-0.5 bg-gray-200 transition-all duration-300"
                style={{ height: `${calculatedLinePostHeight}px` }}
              ></div>
            </div>

            {/* --- CÁC BÀI WRITE MORE POST (DYNAMIC) --- */}

            {fields.map((item, index) => {
              if (index === 0) return null;
              return (
                <Controller
                  key={item.id}
                  control={control}
                  name={`replies.${index}.content`}
                  render={({ field, fieldState }) => (
                    <MorePost
                      value={field.value}
                      onChange={field.onChange}
                      error={fieldState.error}
                      onRemove={() => {
                        remove(index);
                      }}
                    />
                  )}
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
                className={`select-none ${
                  canAddMore
                    ? "cursor-pointer hover:text-black"
                    : "cursor-not-allowed opacity-50"
                }`}
                onClick={() => {
                  if (canAddMore) {
                    append({ content: "", topic: "" });
                  }
                }}
              >
                Thêm vào thread
              </span>
            </div>
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
              className={`cursor-pointer border border-(--outline-primary) bg-(--bg-primary) px-4 text-(--text-color) select-none hover:bg-background`}
            >
              {isLoading ? (
                <Loader className="animate-spin" />
              ) : (
                <span>Đăng</span>
              )}
            </Button>
          </footer>
        </form>
      </Modal>
    </>
  );
}
