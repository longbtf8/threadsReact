import { HeartIcon, MessageCircle, Repeat, Send } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";
import HandleRepeat from "./interact/HandleRepeat";
import HandleSend from "./interact/HandleSend";

const InteractionBar = ({ toggleComment, setToggleComment }) => {
  const [toggleRepeat, setToggleRepeat] = useState(false);
  const [toggleSend, setToggleSend] = useState(false);
  return (
    <ToggleGroup type="multiple" variant="default" spacing={1} size="sm">
      <ToggleGroupItem
        value="heart"
        aria-label="Toggle heart"
        className=" cursor-pointer data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-red-500 data-[state=on]:*:[svg]:stroke-red-500"
      >
        <HeartIcon />
        10
      </ToggleGroupItem>

      {/* Comment */}
      <ToggleGroupItem
        value="comment"
        aria-label="Toggle comment"
        className={" cursor-pointer data-[state=on]:bg-transparent"}
        onClick={() => {
          setToggleComment(!toggleComment);
          if (toggleRepeat) setToggleRepeat(!toggleRepeat);
          if (toggleSend) setToggleSend(!toggleSend);
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
          onClick={() => {
            setToggleRepeat(!toggleRepeat);
            if (toggleSend) setToggleSend(!toggleSend);
            if (toggleComment) setToggleComment(!toggleComment);
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
          onClick={() => {
            setToggleSend(!toggleSend);
            if (toggleRepeat) setToggleRepeat(!toggleRepeat);
            if (toggleComment) setToggleComment(!toggleComment);
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
