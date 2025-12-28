import { HeartIcon, MessageCircle, Repeat, Send } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Comment from "../comment";
import { useState } from "react";
const InteractionBar = () => {
  const [toggleComment, setToggleComment] = useState(false);
  return (
    <div>
      <ToggleGroup type="multiple" variant="default" spacing={1} size="sm">
        <ToggleGroupItem
          value="heart"
          aria-label="Toggle heart"
          className=" cursor-pointer data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-red-500 data-[state=on]:*:[svg]:stroke-red-500"
        >
          <HeartIcon />
          Heart
        </ToggleGroupItem>
        <ToggleGroupItem
          value="comment"
          aria-label="Toggle comment"
          className={" cursor-pointer data-[state=on]:bg-transparent"}
          onClick={() => {
            setToggleComment(!toggleComment);
          }}
        >
          <MessageCircle />
          Comment
        </ToggleGroupItem>

        <ToggleGroupItem
          value="repeat"
          aria-label="Toggle repeat"
          className={
            " cursor-pointer data-[state=on]:bg-transparent data-[state=on]:*:[svg]:stroke-green-500"
          }
        >
          <Repeat />
          Repeat
        </ToggleGroupItem>

        <ToggleGroupItem
          value="send"
          aria-label="Toggle send"
          className={"data-[state=on]:bg-transparent cursor-pointer "}
        >
          <Send />
          Send
        </ToggleGroupItem>
      </ToggleGroup>
      {toggleComment && (
        <div className="-ml-7">
          <Comment />
        </div>
      )}
    </div>
  );
};
export default InteractionBar;
