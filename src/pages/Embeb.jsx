import PostCard from "@/components/post/PostCard";
import { useGetPostIdQuery } from "@/services/postService.js";
import { useParams } from "react-router";

export const Embed = () => {
  const { postId } = useParams();
  const { data } = useGetPostIdQuery({ id: postId });
  if (!data) {
    return null;
  }
  return (
    <div className="relative mt-2">
      <PostCard
        username={data?.user?.username}
        date={data?.created_at}
        ToggleInteractionBar={true}
        likesCount={data?.likes_count}
        repostCount={data?.reposts_and_quotes_count}
        content={data?.content}
        className={"pointer-events-none select-none"}
      />
      <div className="absolute right-2 bottom-1 flex gap-1 border p-1 rounded-xl bg-gray-200 cursor-pointer">
        View On Threads
        <img src="/Thread_logo.svg" alt="logoThread" className="w-6 h-6" />
      </div>
    </div>
  );
};
