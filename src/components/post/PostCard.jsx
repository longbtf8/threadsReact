import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Ellipsis } from "lucide-react";
import InteractionBar from "./InteractionBar";
import Comment from "../comment";
import { useEffect, useRef, useState } from "react";
import { measureHeight } from "@/utils/measureHeight";

const PostCard = ({ showCommentLine = true }) => {
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
  // 15px: Là khoảng hở muốn chừa lại ở dưới cùng thẻ cho đẹp

  const calculatedLineHeight = cardHeight > 64 ? cardHeight - 44 * 2 - 15 : 0;

  return (
    <div ref={cardRef} className="relative">
      <div className="flex gap-2 items-start ">
        <div className="shrink-0 ">
          <Avatar>
            <AvatarImage
              src="./placeholder.avif"
              className="w-9 h-9  rounded-full border"
            />
            <AvatarFallback className="w-9 rounded-full h-9 border p-1.5">
              Avt
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          {/* info */}
          <div className="flex cursor-pointer">
            <div className="grow">
              <span className="hover:underline transition-all font-semibold">
                Bùi Thành Long
              </span>{" "}
              <span className="text-gray-300">2 giờ</span>{" "}
            </div>

            {/* dot */}
            <span>
              <Ellipsis className="text-gray-400" />
            </span>
          </div>
          {/* caption */}
          <p className="cursor-pointer">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
            assumenda ipsam voluptates consequatur, blanditiis ea ipsum quisquam
            cupiditate ducimus officiis pariatur magni vel fugit dignissimos
            repudiandae perspiciatis quia magnam impedit?consequatur, blanditiis
            ea ipsum quisquam cupiditate ducimus officiis pariatur magni vel
            fugit dignissimos repudiandae perspiciatis quia magnam impedit?
          </p>
        </div>
      </div>
      {/* Ảnh and video */}
      <div className=" -mr-4 ">
        <div className=" -ml-4 rounded-xl mt-3 flex justify-start overflow-x-auto gap-1 pr-4 cursor-grab [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="w-13.75 h-auto max-h-70 shrink-0 "></div>
          <img
            src="https://vn1.vdrive.vn/alohamedia.vn/2025/02/9-712x1024.jpg"
            alt="content"
            className=" h-auto max-h-70 rounded-2xl align-middle object-cover "
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnI1VPlKyFrCh35t98X5tJC1vm6U7Ami-Muw&s"
            alt="content"
            className=" h-auto max-h-70 rounded-2xl align-middle object-cover"
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnI1VPlKyFrCh35t98X5tJC1vm6U7Ami-Muw&s"
            alt="content"
            className=" h-auto max-h-70 rounded-2xl align-middle object-cover"
          />
          {/* <iframe
            src="https://www.youtube.com/embed/Jpg7yQuyjZY"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-70 rounded-2xl aspect-video" // Thêm aspect-video để giữ tỉ lệ khung hình
          ></iframe> */}
        </div>
      </div>
      <div className="ml-7.25 mt-2">
        {" "}
        <InteractionBar
          toggleComment={toggleComment}
          setToggleComment={setToggleComment}
        />
      </div>
      {toggleComment && (
        <div>
          <Comment />
        </div>
      )}

      {/* Đường kẻ - CHỈ hiện khi cả 2 điều kiện đều true */}
      {showCommentLine && toggleComment && (
        <div
          className="absolute top-11 left-4 w-0.5 bg-gray-200 transition-all duration-300"
          style={{ height: `${calculatedLineHeight}px` }}
        />
      )}
    </div>
  );
};
export default PostCard;
