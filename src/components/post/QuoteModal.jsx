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

import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import {
  useCreatePostMutation,
  useCreateReplyMutation,
} from "@/services/postService";
import { toast } from "react-toastify";

const schema = zod
  .object({
    quotes: zod.array(
      zod.object({
        content: zod.string().min(1, "Nội dung không được để trống"),
        topic: zod.string().optional(),
      })
    ),
  })
  .required();

export function AddPost({ isOpen, onClose, post }) {
  const actionStyle = "cursor-pointer p-1.5 text-(--color-time)";
  //info Me
  const { data: currentUser } = useGetUserInfoQuery();

  const { username, date, content } = {
    username: post?.user.username,
    date: post?.created_at,
    content: post?.content,
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

  // form
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      quotes: [{ content: "", topic: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "quotes",
  });
  const [createPost, { isLoading: isLoading1 }] = useCreatePostMutation();
  const [createReply, { isLoading: isLoading2 }] = useCreateReplyMutation();
  const onSubmit = async (formData) => {
    try {
      let id = null;
      for (const [index, quoteItem] of formData.quotes.entries()) {
        console.log(formData);
        const payLoad = {
          content: quoteItem.content,
        };
        if (index === 0) {
          const result = await createPost(payLoad).unwrap();
          if (result && result?.id) {
            id = result.id;
          }
        } else {
          const payLoadReply = {
            id: id,
            postData: payLoad,
          };
          const result2 = createReply(payLoadReply);
          if (result2 && result2?.id) {
            id = result2.id;
          }
        }
      }
      toast("Đăng thành công", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "dark",
        className: "!w-fit",
      });
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
  // Reset form mỗi khi mở modal
  useEffect(() => {
    if (isOpen) {
      reset({ quotes: [{ content: "", topic: "" }] });
    }
  }, [isOpen, reset]);
  //logic bật add
  // Kiểm tra điều kiện xem phần tử cuối có được gõ không thì add thêm
  const repliesValue = useWatch({ name: "quotes", control });
  const lastQuotesIndex = repliesValue.length - 1;
  const lastQuotesContent = repliesValue[lastQuotesIndex]?.content || "";
  const canAddMore = lastQuotesContent.trim().length > 0;
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
            <p className="text-[16px] font-bold">Thread mới</p>
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
          <div className="overflow-y-auto flex-1 flex-col flex  min-h-0">
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
                  <p className="font-semibold">{currentUser?.username}</p>
                  <ChevronRight className="mr-1 -ml-0.5 size-4" />
                  <input
                    type="text"
                    placeholder="Thêm chủ đề"
                    className="px-0.5 py-px focus:outline-0"
                    {...register("quotes.0.topic")}
                  />
                </div>
                <main>
                  <textarea
                    placeholder={`Có gì mới...?`}
                    className="w-full resize-none overflow-hidden focus:outline-0"
                    {...register("quotes.0.content")}
                  ></textarea>
                  <div className="h-5 text-red-400 -mt-2">
                    {
                      <p>
                        {errors.quotes?.[0]?.content && (
                          <span className="text-red-500 text-xs">
                            {errors.quotes[0].content.message}
                          </span>
                        )}
                      </p>
                    }
                  </div>
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

            {fields.map((item, index) => {
              if (index === 0) return null;
              return (
                <Controller
                  key={item.id}
                  control={control}
                  name={`quotes.${index}.content`}
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
              type="submit"
              className={`cursor-pointer border border-(--outline-primary) bg-(--bg-primary) px-4 text-(--text-color) select-none hover:bg-background`}
            >
              {isLoading1 || isLoading2 ? (
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
