import { HeartIcon, MessageCircle, Repeat, Send } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";
import HandleRepeat from "./interact/HandleRepeat";
import HandleSend from "./interact/HandleSend";
import { usePostLike } from "@/hooks/usePostLike";
import { useGetUserInfoQuery } from "@/services/Auth/authApi";
import ModalSignInUp from "../modalSignInUp/modalSignInSignUp";
import { useDispatch } from "react-redux";
import { openSignInUp } from "@/features/modalSignInUp/modalSignInUpSlice";

const InteractionBar = ({
  toggleComment,
  setToggleComment,
  postId,
  likesCount,
  isLiked,
}) => {
  const [toggleRepeat, setToggleRepeat] = useState(false);
  const [toggleSend, setToggleSend] = useState(false);
  const currentUser = useGetUserInfoQuery();
  // console.log(currentUser);
  // sử lý like
  const { Liked, likedCount, handleToggleLike } = usePostLike({
    initialLikes: isLiked,
    initialCount: likesCount,
    id: postId,
  });
  const dispatch = useDispatch();
  // const handleOpenModal = (e, value) => {
  //   if (currentUser.isError) {
  //     e.preventDefault();
  //     if (value) {
  //       dispatch(openSignInUp(`${value}`));
  //     } else {
  //       dispatch(openSignInUp());
  //     }
  //   }
  // };
  const handleInteraction = ({ e, type = "", callback }) => {
    e.stopPropagation();
    if (currentUser.isError || !currentUser.data) {
      dispatch(openSignInUp(type));
      return;
    }
    callback();
  };

  return (
    <ToggleGroup
      type="multiple"
      variant="default"
      spacing={1}
      size="sm"
      value={Liked ? ["heart"] : []}
    >
      <ToggleGroupItem
        value="heart"
        aria-label="Toggle heart"
        className=" cursor-pointer data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-red-500 data-[state=on]:*:[svg]:stroke-red-500"
        onClick={(e) => {
          handleInteraction({
            e: e,
            // type: "heart",
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
              if (toggleRepeat) setToggleRepeat(!toggleRepeat);
              if (toggleSend) setToggleSend(!toggleSend);
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
                setToggleRepeat(!toggleRepeat);
                if (toggleSend) setToggleSend(!toggleSend);
                if (toggleComment) setToggleComment(!toggleComment);
              },
            });
          }}
        >
          <Repeat />
          10
        </ToggleGroupItem>

        <HandleRepeat
          isOpen={toggleRepeat}
          onClose={() => {
            setToggleRepeat(false);
          }}
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
              type: "repeat",
              callback: () => {
                setToggleSend(!toggleSend);
                if (toggleRepeat) setToggleRepeat(!toggleRepeat);
                if (toggleComment) setToggleComment(!toggleComment);
              },
            });
          }}
        >
          <Send />
          Send
        </ToggleGroupItem>

        <HandleSend
          isOpen={toggleSend}
          onClose={() => {
            setToggleSend(false);
          }}
        />
      </div>
    </ToggleGroup>
  );
};
export default InteractionBar;
