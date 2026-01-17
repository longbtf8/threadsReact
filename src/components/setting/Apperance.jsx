import { ArrowLeft } from "lucide-react";

export const Appearance = ({ setCurrentView }) => {
  return (
    <div className="flex flex-col h-full animate-in slide-in-from-right duration-200 bg-background shadow-sm rounded-2xl">
      {/* Header có nút Back */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 ">
        <button
          onClick={() => setCurrentView("main")} // Quay về menu chính
          className="p-1 -ml-2 rounded-full hover:bg-gray-100 cursor-pointer text-black"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-[16px] font-bold text-gray-900">Giao diện</span>
      </div>

      {/* Nội dung chọn giao diện */}
      <div className="p-2">
        <button
          onClick={() => console.log("Chọn giao diện sáng")}
          className="w-full px-4 py-3 text-left hover:bg-gray-50 rounded-lg text-md font-semibold text-gray-900 transition"
        >
          Giao diện sáng
        </button>
        <button
          onClick={() => console.log("Chọn giao diện tối")}
          className="w-full px-4 py-3 text-left hover:bg-gray-50 rounded-lg text-md font-semibold text-gray-900 transition"
        >
          Giao diện tối
        </button>
        <button
          onClick={() => console.log("Chọn hệ thống")}
          className="w-full px-4 py-3 text-left hover:bg-gray-50 rounded-lg text-md font-semibold text-gray-900 transition"
        >
          Hệ thống
        </button>
      </div>
    </div>
  );
};
