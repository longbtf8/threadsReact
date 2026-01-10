import {
  CircleEllipsis,
  FileText,
  Folders,
  Images,
  MapPin,
  Smile,
  TextAlignStart,
} from "lucide-react";

export function AddPost({ isOpen, onClose }) {
  const actionStyle = "cursor-pointer p-1.5 text-(--color-time)";
  if (!isOpen) {
    return;
  }

  return (
    <>
      {/* Overlay */}
      {/* <div className="overlay fixed inset-0 z-100" > */}
      {/* Container */}
      <div className="animate-scale-from-bottom-right absolute right-6 bottom-6.5 w-123.5 overflow-auto rounded-2xl border-2 border-(--outline-primary) bg-(--bg-primary)">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-2">
          <button
            className="close-btn cursor-pointer p-1 font-bold"
            onClick={onClose}
          >
            X
          </button>
          <p className="text-[16px] font-bold">Thread mới</p>
          <div className="flex items-center">
            <Folders size={34} className="p-1.5" />
            <CircleEllipsis size={34} className="p-1.5" />
          </div>
        </header>
        <Separator className="outline-[  --outline-primary]" />
        <form>
          {/* Content Post */}
          <div className="flex gap-3 px-6 pt-4 pb-1.25">
            <Avatar className={`size-9`}>
              <AvatarImage src="./placeholder.avif" className={`size-full`} />
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <p className="font-semibold">User name</p>
                <ChevronRight className="mr-1 -ml-0.5 size-4" />
                <input
                  type="text"
                  placeholder="Thêm chủ đề"
                  className="px-0.5 py-px focus:outline-0"
                  //   value={formData.topic_name}
                  //   onChange={(e) =>
                  //     handleInputChange("topic_name", e.target.value)
                  //   }
                />
              </div>
              <main>
                <textarea
                  placeholder={`Có gì mới...?`}
                  className="w-full resize-none overflow-hidden focus:outline-0"
                  //   disabled={isLoading}
                  //   value={formData.content}
                  //   onChange={(e) => handleInputChange("content", e.target.value)}
                ></textarea>
              </main>
              {/* Action */}
              <div className="flex gap-1.5">
                <Images size={30} className={`${actionStyle}`} />
                <Smile size={30} className={`${actionStyle}`} />
                <TextAlignStart size={30} className={`${actionStyle}`} />
                <FileText size={30} className={`${actionStyle}`} />
                <MapPin size={30} className={`${actionStyle}`} />
              </div>
            </div>
          </div>

          {/* Error Message */}
          {/* {error && (
              <div className="mx-6 mb-4 rounded-lg border border-red-500/20 bg-red-500/10 p-3">
                <p className="text-sm text-red-500">
                  {error?.data?.message || "Có lỗi xảy ra, vui lòng thử lại"}
                </p>
              </div>
            )} */}

          {/* Modal Footer */}
          <footer className="flex items-center justify-between p-6">
            <div className="flex items-center gap-2 text-(--color-time)">
              <SlidersVertical size={20} />
              <span className="font-semibold">
                Các lựa chọn để kiểm soát câu trả lời
              </span>
            </div>
            <Button
              className={`cursor-pointer border border-(--outline-primary) bg-(--bg-primary) px-4 text-(--text-color) select-none`}
            >
              "Đang đăng..." : "Đăng"
            </Button>
          </footer>
        </form>
      </div>
      {/* </div> */}
    </>
  );
}
