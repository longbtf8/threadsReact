import { HeartIcon, MessageCircle, Repeat, Send } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import HandleRepeat from "./interact/HandleRepeat";
import HandleSend from "./interact/HandleSend";
import { usePostLike } from "@/hooks/usePostLike";
import { useGetUserInfoQuery } from "@/services/Auth/authApi";
import ModalSignInUp from "../modalSignInUp/modalSignInSignUp";
import { useDispatch, useSelector } from "react-redux";
import { openSignInUp } from "@/features/modalSignInUp/modalSignInUpSlice";
import {
  closeInteraction,
  toggleInteraction,
} from "@/features/interaction/interactionSlice";
import { useRepeatPost } from "@/hooks/useRepeatPost";

const InteractionBar = ({
  toggleComment,
  setToggleComment,
  postId,
  likesCount,
  isLiked,
  isRepost,
  repostCount,
  post,
}) => {
  const currentUser = useGetUserInfoQuery();
  // sử lý like
  const { Liked, likedCount, handleToggleLike } = usePostLike({
    initialLikes: isLiked,
    initialCount: likesCount,
    id: postId,
  });
  const { repeated, repeatCount, handleToggleRepeat } = useRepeatPost({
    initialCount: repostCount,
    initialRepeat: isRepost,
    id: postId,
  });

  const dispatch = useDispatch();

  const { activePostId, activeType } = useSelector(
    (state) => state.interaction
  );
  const isRepeatOpen = activePostId === postId && activeType === "repeat";
  const isSendOpen = activePostId === postId && activeType === "send";

  const handleInteraction = ({ e, type = "", callback }) => {
    e.stopPropagation();
    if (currentUser.isError || !currentUser.data) {
      dispatch(openSignInUp(type));
      return;
    }
    callback();
  };
  const activeValue = [];
  if (Liked) activeValue.push("heart");
  if (repeated) activeValue.push("repeat");
  return (
    <ToggleGroup
      type="multiple"
      variant="default"
      spacing={1}
      size="sm"
      value={activeValue}
    >
      <ToggleGroupItem
        value="heart"
        aria-label="Toggle heart"
        className=" cursor-pointer data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-red-500 data-[state=on]:*:[svg]:stroke-red-500"
        onClick={(e) => {
          handleInteraction({
            e: e,
            type: "heart",
            callback: () => {
              handleToggleLike(e);
            },
          });
        }}
      >
        <HeartIcon />
        {likedCount}
      </ToggleGroupItem>

      {/* Comment */}
      <ToggleGroupItem
        value="comment"
        aria-label="Toggle comment"
        className={" cursor-pointer data-[state=on]:bg-transparent"}
        onClick={(e) => {
          handleInteraction({
            e: e,
            type: "comment",
            callback: () => {
              setToggleComment(!toggleComment);
            },
          });
        }}
      >
        <MessageCircle />
        20
      </ToggleGroupItem>

      {/* repeat */}
      <div className="relative">
        <ToggleGroupItem
          value="repeat"
          aria-label="Toggle repeat"
          className={
            " cursor-pointer data-[state=on]:bg-transparent data-[state=on]:*:[svg]:stroke-green-500"
          }
          onClick={(e) => {
            handleInteraction({
              e: e,
              type: "repeat",
              callback: () => {
                dispatch(toggleInteraction({ postId, type: "repeat" }));
              },
            });
          }}
        >
          <Repeat />
          {repeatCount}
        </ToggleGroupItem>

        <HandleRepeat
          isOpen={isRepeatOpen}
          onClose={() => {
            dispatch(closeInteraction());
          }}
          handleRepost={handleToggleRepeat}
          post={post}
        />
      </div>

      {/* send */}
      <div className="relative">
        <ToggleGroupItem
          value="send"
          aria-label="Toggle send"
          className={"data-[state=on]:bg-transparent cursor-pointer "}
          onClick={(e) => {
            handleInteraction({
              e: e,
              type: "send",
              callback: () => {
                dispatch(
                  toggleInteraction({
                    postId,
                    type: "send",
                    data: { username: post?.user?.username, post: post },
                  })
                );
              },
            });
          }}
        >
          <Send />
          Send
        </ToggleGroupItem>

        <HandleSend
          isOpen={isSendOpen}
          onClose={() => {
            dispatch(closeInteraction());
          }}
        />
      </div>
    </ToggleGroup>
  );
};
export default InteractionBar;
