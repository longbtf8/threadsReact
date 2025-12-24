import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Home from "@/pages/Home";
import { Outlet } from "react-router";

const DefaultLayout = () => {
  return (
    <>
      <Navigation />
      <div className=" w-full h-full justify-center items-center md:ml-[76px] md:mr-[76px]">
        <Home />
      </div>
    </>
  );
};
export default DefaultLayout;
