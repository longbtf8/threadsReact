import { Button } from "@/components/ui/button";
import { openModalPost } from "@/features/post/modalPostSlice";
import { useDispatch } from "react-redux";
const WhatIsNew = () => {
  const dispatch = useDispatch();
  return (
    <section
      className="h-17 hidden md:flex border-b p-4 w-full"
      onClick={() => {
        dispatch(openModalPost());
      }}
    >
      <div className="flex-1 flex justify-start items-center gap-1">
        <img
          src="/avatarProfile.jpg"
          alt="Profile"
          className="h-9 w-9 border rounded-full"
        />
        <p className="ml-2 cursor-text flex-1 text-gray-300">Có gì mới ?</p>
      </div>
      <Button className="cursor-pointer bg-background text-foreground border hover:bg-background">
        Đăng
      </Button>
    </section>
  );
};
export default WhatIsNew;
