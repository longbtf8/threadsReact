import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Home from "@/pages/Home";
import { Outlet } from "react-router";

const DefaultLayout = () => {
  return (
    <>
      <Navigation />
      <div className=" w-full md:ml-[40px]">
        <Outlet />
      </div>
    </>
  );
};
export default DefaultLayout;
