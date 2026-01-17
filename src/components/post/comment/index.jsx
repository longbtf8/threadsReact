import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Maximize2 } from "lucide-react";
import { Button } from "../../ui/button";
import { useGetUserInfoQuery } from "@/services/Auth/authApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useCreateReplyMutation } from "@/services/postService.js";
import { toast } from "react-toastify";
import { AddPost } from "../QuoteModal";
import { useSetReplyModal } from "@/hooks/useSetReplyModal";
import { ReplyModal } from "../ReplyModal";

const Comment = ({ username, post, handleToggleComment }) => {
  const { data: currentUser } = useGetUserInfoQuery();

  const schema = zod.object({
    topic_name: zod.string(),
    content: zod.string().min(1, "Vui lòng nhập nội dung"),
  });
  const [createReply] = useCreateReplyMutation();
  const id = post?.id;
  const handleCreateReply = (dataFrom) => {
    const fromCreate = {
      content: dataFrom.content,
    };
    try {
      createReply({ id: id, postData: fromCreate });
      reset();
      handleToggleComment();
      toast("Đã bình luận", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "dark",
        className: "!w-fit",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const { toggleReplyModal, handleToggleReplyModal, setToggleReplyModal } =
    useSetReplyModal(handleToggleComment);
  return (
    <>
      {!toggleReplyModal && (
        <div
          className=" flex pt-2 gap-2.5"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Avatar>
            <AvatarImage
              src="/avt.jpg"
              className="w-9 h-9  rounded-full border"
            />
            <AvatarFallback className="w-9 rounded-full h-9 border p-1.5">
              Avt
            </AvatarFallback>
          </Avatar>

          <form
            className="grow relative"
            onSubmit={handleSubmit(handleCreateReply)}
          >
            <div className="flex gap-2 items-start justify-start">
              <p className="font-semibold cursor-pointer hover:underline">
                {currentUser.name}
              </p>{" "}
              <span className="text-gray-400">&gt;</span>
              <input
                type="text"
                placeholder="Thêm chủ đề"
                className="outline-none focus:border-gray-300 transition duration-300 border-transparent border-b"
                {...register("topic_name")}
              />
            </div>
            <textarea
              type="text"
              placeholder={`Trả lời ${username}...`}
              className="outline-none w-full min-h-5 pr-10 mb-2"
              {...register("content")}
            />
            <div className="h-5 text-red-400">
              {
                <p>
                  <span>{errors?.content?.message}</span>
                </p>
              }
            </div>
            <button
              type="submit"
              className={
                "absolute -right-11 border px-4 rounded-sm bg-black text-white bottom-0 cursor-pointer py-0.5"
              }
            >
              Gửi
            </button>
          </form>
          <Button
            variant="outline"
            size="icon-sm"
            className="rounded-full cursor-pointer hover:scale-110"
            onClick={() => {
              setToggleReplyModal(true);
            }}
          >
            <Maximize2 />
          </Button>
        </div>
      )}

      <ReplyModal
        isOpen={toggleReplyModal}
        onClose={handleToggleReplyModal}
        post={post}
      />
    </>
  );
};
export default Comment;
