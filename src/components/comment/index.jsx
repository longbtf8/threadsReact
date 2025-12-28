import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Maximize2 } from "lucide-react";
import { Button } from "../ui/button";

const Comment = () => {
  return (
    <div className=" flex pt-2 gap-2.5">
      <Avatar>
        <AvatarImage
          src="./placeholder.avif"
          className="w-9 h-9  rounded-full border"
        />
        <AvatarFallback className="w-9 rounded-full h-9 border p-1.5">
          Avt
        </AvatarFallback>
      </Avatar>

      <div className="grow">
        <div className="flex gap-2 items-start justify-start">
          <p className="font-semibold cursor-pointer hover:underline">
            Bùi Thành Long
          </p>{" "}
          <span className="text-gray-400">&gt;</span>
          <input
            type="text"
            placeholder="Thêm chủ đề"
            className="outline-none focus:border-gray-300 transition duration-300 border-transparent border-b"
          />
        </div>
        <input
          type="text"
          placeholder="Trả lời builong2000.."
          className="outline-none"
        />
      </div>
      <Button variant="outline" size="icon-sm" className="rounded-full">
        <Maximize2 />
      </Button>
    </div>
  );
};
export default Comment;
