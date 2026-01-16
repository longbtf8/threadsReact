import React from "react";
import { ChevronRight } from "lucide-react";
import { useEscapeKey } from "@/hooks/useEscapeKey";
const menuItems = [
  {
    id: 1,
    label: "Giao diện",
    hasArrow: true,
    action: () => console.log("Giao diện clicked"),
  },
  {
    id: 2,
    label: "Thông tin chi tiết",
    hasArrow: false,
    action: () => console.log("Thông tin chi tiết clicked"),
  },
  {
    id: 3,
    label: "Cài đặt",
    hasArrow: false,
    highlight: true,
    action: () => console.log("Cài đặt clicked"),
  },
  {
    id: 4,
    label: "Bảng feed",
    hasArrow: true,
    action: () => console.log("Bảng feed clicked"),
  },
  {
    id: 5,
    label: "Đã lưu",
    hasArrow: false,
    action: () => console.log("Đã lưu clicked"),
  },
  {
    id: 6,
    label: "Đã thích",
    highlight: true,
    hasArrow: false,
    action: () => console.log("Đã thích clicked"),
  },
  {
    id: 7,
    label: "Báo cáo sự cố",
    hasArrow: false,
    action: () => console.log("Báo cáo sự cố clicked"),
  },
  {
    id: 8,
    label: "Đăng xuất",
    hasArrow: false,
    isLogout: true,
    action: () => console.log("Đăng xuất clicked"),
  },
];

const SettingsMenu = ({ isOpen, onClose }) => {
  // đóng bằng escape
  useEscapeKey(isOpen, onClose);
  if (!isOpen) return null;
  return (
    <div className="absolute md:bottom-20 md:top-auto md:left-6 md:w-61.25 w-60 top-8 -right-1">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">
        {menuItems.map((item) => (
          <React.Fragment key={item.id}>
            <button
              onClick={item.action}
              className={`
                w-full px-6 md:py-4 py-2 flex items-center justify-between
                transition-colors duration-200 hover:bg-gray-50
                ${item.highlight ? " border-b" : ""}
                ${item.isLogout ? "text-red-500" : "text-gray-900"}
              `}
            >
              <span className="md:text-lg font-medium">{item.label}</span>
              {item.hasArrow && (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SettingsMenu;
