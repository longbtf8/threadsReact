import { useLikePostMutation } from "@/services/Interactions/postInteractions";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const usePostLike = ({ initialLikes, initialCount, id }) => {
  const [Liked, setLiked] = useState(initialLikes);
  const [likedCount, setLikeCount] = useState(initialCount);
  const [likePostApi] = useLikePostMutation();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLiked(initialLikes);
    setLikeCount(initialCount);
  }, [initialLikes, initialCount]);

  const handleToggleLike = async (e) => {
    e?.stopPropagation();

    const prevIsLike = Liked;
    const prevIsCount = likedCount;

    const newIsLiked = !Liked;
    setLiked(newIsLiked);
    setLikeCount(newIsLiked ? likedCount + 1 : likedCount - 1);
    try {
      await likePostApi({ id: id }).unwrap();
    } catch (error) {
      console.error("Lỗi like:", error);

      setLikeCount(prevIsCount);
      setLiked(prevIsLike);
      toast.error("Không thể thích bài viết này. Vui lòng thử lại sau!", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        theme: "dark",
      });
    }
  };
  return { Liked, likedCount, handleToggleLike };
};
