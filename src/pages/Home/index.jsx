import Header from "@/components/Header";
import WhatIsNew from "./WhatIsNew";
import PostCard from "@/components/post/PostCard";
import NavFirstHome from "./NavFirstHome";

const Home = () => {
  return (
    <div className=" w-full mx-auto justify-center">
      <Header title={"Home"} />
      <div className="md:border ">
        <WhatIsNew />
        <NavFirstHome />

        <div className=" p-4 overflow-hidden rounded-2xl min-h-screen">
          <div>
            <PostCard />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
