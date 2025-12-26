import { ArrowUpIcon, CircleEllipsis, Menu } from "lucide-react";
import { Button } from "../ui/button";

const Header = ({ title }) => {
  return (
    <div className="sticky top-0 w-full bg-white">
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
          {/* <div className="w-12.5 h-12.5 bg-transparent position absolute top-9 -left-6.25 overflow-hidden">
            <div className="w-12.5 h-12.5 rounded-full bg-transparent relative left-6.25 border-2 top-6"></div>
          </div>
          <div className="absolute w-[calc(100%-50px)] h-2.5  top-[65%] border-b-2 -bottom-1 left-6.25"></div> */}

          {/* right */}
          {/* <div className="w-12.5 h-12.5 bg-transparent position absolute top-9 -right-6.25 overflow-hidden">
            <div className="w-12.5 h-12.5 rounded-full bg-transparent relative right-6.25 border-2 top-6"></div>
          </div> */}

          {/* <div className="hidden md:block absolute bottom-0 top-full h-[1px] bg-gray-200 md:w-[632px]"></div> */}
          <div className="hidden md:block h-screen w-full border-[1px] border-gray-300 absolute top-15 rounded-2xl"></div>
        </div>
      </div>
      {/* <div className="absolute top-5 right-4">
        <Button className="h-9">Đăng Nhập</Button>
      </div> */}
      <div className="absolute top-5 right-4 md:hidden">
        <Menu />
      </div>
      {/* <div className="bg-background w-full h-5"> </div> */}
    </div>
  );
};
export default Header;
