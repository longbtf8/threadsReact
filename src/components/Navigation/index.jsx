import { openSignInUp } from "@/features/modalSignInUp/modalSignInUpSlice";
import { openModalPost } from "@/features/post/modalPostSlice";
import { useGetUserInfoQuery } from "@/services/Auth/authApi";
import {
  House,
  Search,
  Heart,
  Plus,
  Menu,
  Pin,
  UserRound,
  Icon,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router";
import SettingsMenu from "../setting";
import { useToggleSettingMenu } from "@/hooks/settingMenu/useToggleSetting";

const items = [
  {
    path: "/",
    icon: House,
  },
  {
    path: "/search",
    icon: Search,
  },
  {
    // path: "/plus",
    icon: Plus,
    background: true,
    protected: true,
  },
  {
    path: "/heart",
    icon: Heart,
    protected: true,
  },
  {
    path: "/user",
    icon: UserRound,
    protected: true,
  },
];

// const itemsSetting = [
//   {
//     path: "/pin",
//     icon: Pin,
//     protected: true,
//   },
//   {
//     path: "/setting",
//     icon: Menu,
//   },
// ];

const Navigation = () => {
  // info user
  const currentUser = useGetUserInfoQuery();
  const dispatch = useDispatch();
  const handleNavClick = (e, item) => {
    if (item.protected) {
      // ngăn chuyển trang
      e.preventDefault();
      if (item.path === "/plus") {
        dispatch(openSignInUp("post"));
      } else {
        dispatch(openSignInUp());
      }
    }
  };

  // setting
  const { toggleSettingMenu, handleCloseMenu, setToggleSettingMenu } =
    useToggleSettingMenu();
  return (
    <div className="fixed z-99 left-0 bottom-0 md:top-0  bg-white w-full md:w-19">
      <nav className="flex md:flex-col md:h-screen  md:justify-between items-center md:p-4 p-3 w-full h-16">
        {/* Logo */}
        <ul className="hidden md:block">
          <li>
            <Link to={"/"}>
              <img
                src="/Thread_logo.svg"
                alt="logo"
                className="w-10  cursor-pointer hover:scale-110 transition "
              />
            </Link>
          </li>
        </ul>

        {/* nav main */}
        <ul className="flex md:flex-col  justify-around md:w-auto items-center w-full h-full md:h-auto md:gap-y-2">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index} className="w-full h-full ">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `h-full md:h-13 md:w-15 my-0.5  flex justify-center items-center rounded-xl ${
                      item.icon === Plus
                        ? "bg-gray-200 rounded-xl hover:text-black"
                        : " "
                    } ${isActive ? `text-black` : "text-gray-400 "}
                    hover:bg-gray-200 transition duration-300`
                  }
                  onClick={(e) => {
                    if (!currentUser.isSuccess) {
                      handleNavClick(e, item);
                    }
                    if (item.icon === Plus) {
                      e.preventDefault();
                      if (currentUser.isSuccess) {
                        dispatch(openModalPost());
                      }
                    }
                  }}
                >
                  <Icon className="size-6 " strokeWidth={3} />
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* nav setting */}
        <ul className="hidden md:flex md:flex-col mb-1.5">
          {!currentUser.isSuccess && (
            <li>
              <NavLink
                className={`h-13 w-15 my-0.5  flex justify-center items-center text-gray-400 hover:bg-gray-200 rounded-xl transition duration-300`}
                onClick={() => {
                  if (!currentUser.isSuccess) {
                    dispatch(openSignInUp());
                  }
                }}
              >
                <Pin className="size-6" />
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              className={`h-13 w-15 my-0.5  flex justify-center items-center text-gray-400 hover:bg-gray-200 rounded-xl transition duration-300 relative`}
              onClick={() => {
                if (!currentUser.isSuccess) {
                  dispatch(openSignInUp());
                  return;
                }
                setToggleSettingMenu(!toggleSettingMenu);
              }}
            >
              <Menu className="size-6" />
            </NavLink>
            <SettingsMenu
              isOpen={toggleSettingMenu}
              onClose={() => {
                handleCloseMenu();
              }}
            />
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Navigation;
