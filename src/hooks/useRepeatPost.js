import { useRepeatPostMutation } from "@/services/Interactions/postInteractions";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useRepeatPost = ({ initialRepeat, initialCount, id }) => {
  const [repeated, setRepeated] = useState(initialRepeat);
  const [repeatCount, setRepeatCount] = useState(initialCount);
  const [repeatPost] = useRepeatPostMutation();
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRepeated(initialRepeat);
    setRepeatCount(initialCount);
  }, [initialRepeat, initialCount]);

  const handleToggleRepeat = async (e) => {
    e?.stopPropagation();

    const prevIsRepeated = repeated;
    const prevIsCount = repeatCount;

    const newIsRepeated = !repeated;
    setRepeated(newIsRepeated);
    setRepeatCount(newIsRepeated ? repeatCount + 1 : repeatCount - 1);
    try {
      await repeatPost({ id: id }).unwrap();
    } catch (error) {
      console.error("Lỗi Repost:", error);

      setRepeatCount(prevIsCount);
      setRepeated(prevIsRepeated);
      toast.error("Không đăng lại bài viết này. Vui lòng thử lại sau!", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        theme: "dark",
      });
    }
  };
  return { repeated, repeatCount, handleToggleRepeat };
};
