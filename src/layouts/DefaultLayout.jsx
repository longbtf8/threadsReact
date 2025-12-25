import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Home from "@/pages/Home";
import { Outlet } from "react-router";

const DefaultLayout = () => {
  return (
    <div className="overflow-x-auto">
      <Navigation />
      <div className="flex justify-center w-full md:ml-[40px]">
        <Outlet />
        {/* <Home /> */}
        <Home />
      </div>
    </div>
  );
};
export default DefaultLayout;
