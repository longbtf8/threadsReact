import Navigation from "@/components/Navigation";
import Home from "@/pages/Home";
import Search from "@/pages/Search"; // Giả sử bạn có trang này
import { HeartOff } from "lucide-react";
// import Profile from "@/pages/Profile"; // Giả sử bạn có trang này
import { Outlet } from "react-router";

const DefaultLayout = () => {
  return (
    <>
      <Navigation />
      <div className="h-screen overflow-hidden w-screen">
        <div className="md:flex flex-row overflow-x-auto w-full h-full md:px-5 ">
          {/* Cột trái */}
          <div className="min-w-[76px] shrink-0  hidden md:block"></div>

          <div className="md:flex-grow-1 md:flex justify-center gap-3">
            {/* Page 1 */}
            <div className="md:min-w-[500px] md:max-w-[664px] w-full shrink-0 h-full  overflow-y-auto">
              <Outlet />
            </div>
          </div>

          {/* Cột phải - luôn ở cuối */}
          <div className="min-w-[76px] shrink-0  hidden md:block"></div>
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
