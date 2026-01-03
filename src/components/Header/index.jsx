import { CircleEllipsis, Menu } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../ui/button";

const Header = ({ title }) => {
  return (
    <div className="sticky z-50 top-0 w-full bg-white">
      <div className="flex justify-center items-center h-15 ">
        <div className="flex justify-center h-full items-center w-full">
          <img
            src="./Thread_logo.svg"
            alt="Logo"
            className="h-10 hover:scale-110 md:hidden"
          />
          {/* NavHome Or Title */}
          <div className="hidden md:flex justify-between w-full relative h-full items-center p-4">
            <div></div>
            <div>{title}</div>
            <div className="cursor-pointer ">
              <CircleEllipsis />
            </div>
          </div>
          {/* left */}
          <div className=" hidden md:block w-12.5 h-12.5 bg-transparent position absolute top-9 -left-6.25 overflow-hidden">
            <div className="w-12.5 h-12.5 rounded-full bg-transparent relative left-6.25 border top-6 outline-10 outline-background"></div>
          </div>
          {/* mid */}
          <div className="hidden md:block absolute w-[calc(100%-50px)] h-2.5  top-[85%] border-b -bottom-1 left-6.25"></div>
          {/* right */}
          <div className=" hidden md:block w-12.5 h-12.5 position absolute top-9 -right-6.25 overflow-hidden">
            <div className="w-12.5 h-12.5 rounded-full  relative right-6.25 border top-6 outline-10 outline-background"></div>
          </div>
        </div>
      </div>

      <div className="absolute top-5 right-4 md:hidden">
        <Menu />
      </div>
    </div>
  );
};
export default Header;
