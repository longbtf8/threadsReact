const WhatIsNew = () => {
  return (
    <section className="h-17 hidden md:flex border-b p-4 w-full">
      <div className="flex-1 flex justify-start items-center gap-1">
        <img
          src="./placeholder.avif"
          alt="Profile"
          className="h-9 border rounded-full"
        />
        <p className="cursor-pointer flex-1">What's new ?</p>
      </div>
      <button
        className="cursor-pointer"
        //   onClick={(e) => {
        //     e.stopPropagation();
        //     handleOpenPost();
        //   }}
      >
        Post
      </button>

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
