import { openSignInUp } from "@/features/modalSignInUp/modalSignInUpSlice";
import { House, Search, Heart, Plus, Menu, Pin, UserRound } from "lucide-react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router";

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
    path: "/plus",
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

const itemsSetting = [
  {
    path: "/pin",
    icon: Pin,
    protected: true,
  },
  {
    path: "/setting",
    icon: Menu,
  },
];

const Navigation = () => {
  // const modelSignInUp = useSelector((state) => {
  //   return state.modelSignInUp.isModelOpen;
  // });
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
  return (
    <div className="fixed z-99 left-0 bottom-0 md:top-0  bg-white w-full md:w-19">
      <nav className="flex md:flex-col md:h-screen  md:justify-between items-center md:p-4 p-3 w-full h-16">
        {/* Logo */}
        <ul className="hidden md:block">
          <li>
            <img
              src="./Thread_logo.svg"
              alt="logo"
              className="w-10  cursor-pointer hover:scale-110 transition "
            />
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
                    handleNavClick(e, item);
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
          {itemsSetting.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `h-13 w-15 my-0.5  flex justify-center items-center  ${
                      isActive ? `text-black` : "text-gray-400 "
                    }
                    hover:bg-gray-200 rounded-xl transition duration-300`
                  }
                  onClick={(e) => {
                    handleNavClick(e, item);
                  }}
                >
                  <Icon className="size-6" />
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
export default Navigation;
