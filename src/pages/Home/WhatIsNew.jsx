import { Button } from "@/components/ui/button";

const WhatIsNew = () => {
  return (
    <section className="h-17 hidden md:flex border-b p-4 w-full">
      <div className="flex-1 flex justify-start items-center gap-1">
        <img
          src="./placeholder.avif"
          alt="Profile"
          className="h-9 w-9 border rounded-full"
        />
        <p className="ml-2 cursor-pointer flex-1 text-gray-300">Có gì mới ?</p>
      </div>
      <Button className="cursor-pointer bg-background text-foreground border">
        Đăng
      </Button>

      {/* {openPost && (
      <PostItem
        onClose={() => {
          setOpenPost(false);
        }}
      />
    )} */}
    </section>
  );
};
export default WhatIsNew;
