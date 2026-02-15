import { useToggleSettingMenu } from "@/hooks/settingMenu/useToggleSetting";
import { CircleArrowLeft, CircleEllipsis, Menu } from "lucide-react";
import SettingsMenu from "../setting";
import { useBackPage } from "@/hooks/useBackPage";

const Header = ({ title, back = false }) => {
  // setting
  const { toggleSettingMenu, handleCloseMenu, setToggleSettingMenu } =
    useToggleSettingMenu();

  const handleBackPage = useBackPage();
  return (
    <div className="sticky z-99 top-0 w-full bg-white">
      <div className="flex justify-center items-center h-15 ">
        <div className="flex justify-center h-full items-center w-full">
          <img
            src="/Thread_logo.svg"
            alt="Logo"
            className="h-10 hover:scale-110 md:hidden"
          />
          {/* NavHome Or Title */}
          <div className="hidden md:flex justify-between w-full relative h-full items-center p-4">
            {back && (
              <div className="cursor-pointer" onClick={handleBackPage}>
                <CircleArrowLeft />
              </div>
            )}
            <div></div>
            <div className="flex-1 text-center">{title}</div>
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

      <div
        className="absolute top-5 right-4 md:hidden cursor-pointer select-none"
        onClick={() => {
          setToggleSettingMenu(!toggleSettingMenu);
        }}
      >
        <Menu />
        <SettingsMenu
          isOpen={toggleSettingMenu}
          onClose={() => {
            handleCloseMenu();
          }}
        />
      </div>
    </div>
  );
};
export default Header;
