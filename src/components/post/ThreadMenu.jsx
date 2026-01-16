import {
  ChevronRight,
  Bookmark,
  EyeOff,
  UserCheck,
  UserX,
  UserMinus,
  MessageSquareWarning,
  Link,
} from "lucide-react";
import { useSelector } from "react-redux";
import { handleCopyPostLink } from "./handleCopyPostLink";
import { useEscapeKey } from "@/hooks/useEscapeKey";

const ThreadMenu = ({ isOpen, onClose }) => {
  // đóng bằng escape
  useEscapeKey(isOpen, onClose);

  // lấy data từ redux
  const { activePostId, activePostData } = useSelector(
    (state) => state.interaction
  );
  const username = activePostData?.username;
  const postId = activePostId;
  // copy
  const handleCopyLink = () => {
    handleCopyPostLink({
      onClose: onClose,
      PostId: postId,
      username: username,
    });
  };
  const menuItems = [
    {
      label: "Thêm vào bảng feed",
      icon: ChevronRight,
      action: () => console.log("Add to feed"),
      border: true,
    },
    {
      label: "Lưu",
      icon: Bookmark,
      action: () => console.log("Save"),
    },
    {
      label: "Không quan tâm",
      icon: EyeOff,
      action: () => console.log("Not interested"),
      border: true,
    },
    {
      label: "Tắt thông báo",
      icon: UserCheck,
      action: () => console.log("Mute notifications"),
    },
    {
      label: "Hạn chế",
      icon: UserX,
      action: () => console.log("Restrict"),
      border: true,
    },
    {
      label: "Chặn",
      icon: UserMinus,
      action: () => console.log("Block"),
      danger: true,
    },
    {
      label: "Báo cáo",
      icon: MessageSquareWarning,
      action: () => console.log("Report"),
      danger: true,
      border: true,
    },
    {
      label: "Sao chép liên kết",
      icon: Link,
      action: () => handleCopyLink(),
    },
  ];
  return (
    <div
      className=" shadow-lg overflow-hidden z-50 fixed  inset-0 bg-black/50 flex items-end md:absolute md:top-8 md:bottom-auto  md:rounded-2xl md:inset-auto md:right-0 md:w-62.5 "
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <div
        className="bg-white flex-1 rounded-2xl overflow-hidden"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <ul className="divide-y divide-gray-100 ">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index}>
                <button
                  onClick={item.action}
                  className={`w-full px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors ${
                    item.border ? "border-b-8 border-gray-100" : ""
                  }`}
                >
                  <span
                    className={`text-base font-medium ${
                      item.danger ? "text-red-500" : "text-gray-900"
                    }`}
                  >
                    {item.label}
                  </span>
                  <Icon
                    className={`w-6 h-6 ${
                      item.danger ? "text-red-500" : "text-gray-900"
                    }`}
                    strokeWidth={2}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ThreadMenu;
