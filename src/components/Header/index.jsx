import { ArrowUpIcon, CircleEllipsis, Menu } from "lucide-react";
import { Button } from "../ui/button";

const Header = ({ title }) => {
  return (
    <div className="fixed z-50 top-0 w-screen bg-white  ">
      <div className="flex justify-center items-center h-15 ">
        <div className="flex justify-center h-full items-center ">
          <img
            src="./Thread_logo.svg"
            alt="Logo"
            className="h-10 hover:scale-110 md:hidden"
          />
          {/* NavHome Or Title */}
          <div className="hidden md:flex justify-between w-[639px]  relative h-full items-center p-4">
            <div></div>
            <div>{title}</div>
            <div className="cursor-pointer ">
              <CircleEllipsis />
            </div>
          </div>
          {/* <div className="hidden md:block absolute bottom-0 top-full h-[1px] bg-gray-200 md:w-[632px]"></div> */}
          <div className="hidden md:block h-screen w-[639px] border-[1px] border-gray-200 absolute top-15 rounded-2xl"></div>
        </div>
      </div>
      {/* <div className="absolute top-5 right-4">
        <Button className="h-9">Đăng Nhập</Button>
      </div> */}
      <div className="absolute top-5 right-4 md:hidden">
        <Menu />
      </div>
    </div>
  );
};
export default Header;
