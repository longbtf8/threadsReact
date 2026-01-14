import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { MdGifBox } from "react-icons/md";
import {
  FileText,
  Images,
  MapPin,
  Smile,
  TextAlignStart,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { measureHeight } from "@/utils/measureHeight";
import { useGetUserInfoQuery } from "@/services/Auth/authApi";
export const MorePost = ({
  onRemove,
  disableDelete,
  onChange,
  error,
  value,
}) => {
  const actionStyle = "cursor-pointer p-1.5 text-(--color-time)";
  // get Ìnfo me
  const { data: currentUser } = useGetUserInfoQuery();
  // logic kẻ đường thẳng
  const [postHeight, setPostHeight] = useState(0);
  const postDiv = useRef();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (postDiv.current) {
        measureHeight({
          variable: postDiv.current,
          setHeight: setPostHeight,
        });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  const calculatedLineHeight = postHeight > 36 ? postHeight - 36 : 0;
  return (
    <div className="flex gap-3  pt-4 pb-1.25 relative" ref={postDiv}>
      <Avatar>
        <AvatarImage
          src="./placeholder.avif"
          className="w-9 h-9  rounded-full border"
        />
        <AvatarFallback className="w-9 rounded-full h-9 border p-1.5">
          Avt
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-1.5">
          <p className="font-semibold">{currentUser.username}</p>
          {disableDelete ? (
            <></>
          ) : (
            <span
              className="flex-1 flex justify-end cursor-pointer"
              onClick={onRemove}
            >
              <X size={20} />
            </span>
          )}
        </div>
        <main>
          <textarea
            placeholder={`Bạn nói thêm gì đi`}
            className="w-full resize-none overflow-auto focus:outline-0"
            value={value} //  gía trị từ cha
            onChange={onChange}
          ></textarea>
          {/* Hiển thị dòng thông báo lỗi ngay dưới */}
          <div className="h-3 -mt-2">
            {error && (
              <p className="text-red-500 text-xs mt-1 ">{error.message}</p>
            )}
          </div>
        </main>
        {/* Action */}
        <div className="flex gap-1.5">
          <Images size={30} className={`${actionStyle}`} />
          <MdGifBox size={30} className={`${actionStyle} `} />
          <Smile size={30} className={`${actionStyle}`} />
          <TextAlignStart size={30} className={`${actionStyle}`} />
          <FileText size={30} className={`${actionStyle}`} />
          <MapPin size={30} className={`${actionStyle}`} />
        </div>
      </div>
      {/* Đường kẻ - CHỈ hiện khi cả 2 điều kiện đều true */}
      <div
        className="absolute top-15 left-4 w-0.5 bg-gray-200 transition-all duration-300"
        style={{ height: `${calculatedLineHeight}px` }}
      />
    </div>
  );
};
