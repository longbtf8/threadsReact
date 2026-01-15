import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Ellipsis } from "lucide-react";
import InteractionBar from "./InteractionBar";
import Comment from "../comment";
import { useEffect, useRef, useState } from "react";
import { measureHeight } from "@/utils/measureHeight";
import { formatDistanceStrict } from "date-fns";
import { vi } from "date-fns/locale";
import { useDispatch, useSelector } from "react-redux";
import {
  closeInteraction,
  toggleInteraction,
} from "@/features/interaction/interactionSlice";
import ThreadMenu from "./ThreadMenu";

const PostCard = ({
  showCommentLine = true,
  content,
  username,
  date,
  likesCount,
  isLiked,
  id,
  isRepost,
  repostCount,
  ToggleInteractionBar = true,
  post,
  className,
  ToggleMenu = true, //true=on
}) => {
  const [toggleComment, setToggleComment] = useState(false);
  const [cardHeight, setCardHeight] = useState(0);
  const cardRef = useRef(null);

  // đo height
  useEffect(() => {
    if (toggleComment && showCommentLine && cardRef.current) {
      measureHeight({ variable: cardRef.current, setHeight: setCardHeight });
    }
  }, [showCommentLine, toggleComment]);

  // 44px: Là khoảng cách từ đỉnh thẻ xuống dưới avatar (Avatar 36px + gap)
  // 69px: Là khoảng hở muốn chừa lại ở dưới cùng thẻ cho đẹp

  const calculatedLineHeight = cardHeight > 64 ? cardHeight - 44 * 2 - 69 : 0;

  // menu
  const dispatch = useDispatch();
  const { activePostId, activeType } = useSelector(
    (state) => state.interaction
  );
  const isMenuOpen = activePostId === post?.id && activeType === "menuPost";
  return (
    <div ref={cardRef} className={`relative px-4 ${className}`}>
      <div className="flex gap-2 items-start ">
        <div className="shrink-0 ">
          <Avatar>
            <AvatarImage
              src="/placeholder.avif"
              className="w-9 h-9  rounded-full border"
            />
            <AvatarFallback className="w-9 rounded-full h-9 border p-1.5">
              Avt
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-1">
          {/* info */}
          <div className="flex cursor-pointer">
            <div className="grow">
              <span className="hover:underline transition-all font-semibold">
                {username}
              </span>{" "}
              <span className="text-gray-300">
                {formatDistanceStrict(new Date(date), new Date(), {
                  addSuffix: true,
                  locale: vi,
                })}
              </span>{" "}
              {/* {console.log(date)} */}
            </div>

            {/* dot */}
            {ToggleMenu ? (
              <div
                className="flex-1 justify-end flex relative"
                onClick={() => {
                  dispatch(
                    toggleInteraction({
                      activeType: "menuPost",
                      activePostId: post?.id,
                    })
                  );
                  console.log(1);
                }}
              >
                <Ellipsis className="text-gray-400" />
                {isMenuOpen && (
                  <ThreadMenu
                    isOpen={isMenuOpen}
                    onClose={() => {
                      dispatch(closeInteraction());
                    }}
                  />
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
          {/* caption */}
          <p className="cursor-pointer break-all whitespace-pre-wrap">
            {content}
          </p>
        </div>
      </div>

      <div className="ml-7.25 mt-2">
        {" "}
        {ToggleInteractionBar ? (
          <InteractionBar
            toggleComment={toggleComment}
            setToggleComment={setToggleComment}
            postId={id}
            likesCount={likesCount}
            isLiked={isLiked}
            isRepost={isRepost}
            repostCount={repostCount}
            post={post}
          />
        ) : (
          <></>
        )}
      </div>
      {toggleComment && (
        <div>
          <Comment
            username={username}
            post={post}
            handleToggleComment={() => {
              setToggleComment(false);
            }}
          />
        </div>
      )}

      {/* Đường kẻ - CHỈ hiện khi cả 2 điều kiện đều true */}
      {showCommentLine && toggleComment && (
        <div
          className="absolute top-11 left-8 w-0.5 bg-gray-200 transition-all duration-300"
          style={{ height: `${calculatedLineHeight}px` }}
        />
      )}
    </div>
  );
};
export default PostCard;
