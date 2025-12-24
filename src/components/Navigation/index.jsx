import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { House, Search, Heart, Plus, User, Menu, Pin } from "lucide-react";
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
  },
  {
    path: "/heart",
    icon: Heart,
  },
  {
    path: "/user",
    icon: User,
  },
];

const itemsSetting = [
  {
    path: "/pin",
    icon: Pin,
  },
  {
    path: "/setting",
    icon: Menu,
  },
];

const Navigation = () => {
  return (
    <div className="fixed left-0 bottom-0 top-0">
      <NavigationMenu className="flex flex-col h-screen w-[76px] justify-between items-center p-4">
        {/* Logo */}
        <NavigationMenuList>
          <NavigationMenuItem>
            <img
              src="./Thread_logo.svg"
              alt="logo"
              className="w-10  cursor-pointer hover:scale-110 transition "
            />
          </NavigationMenuItem>
        </NavigationMenuList>

        {/* nav main */}
        <NavigationMenuList className="flex flex-col">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink
                  asChild
                  className=" flex justify-center items-center"
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `h-13 w-15 my-0.5 ${
                        isActive ? `bg-gray-200 rounded-xl` : "bg-white"
                      }`
                    }
                  >
                    <Icon className="size-6" />
                  </NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>

        {/* nav setting */}
        <NavigationMenuList className="flex flex-col mb-4">
          {itemsSetting.map((item, index) => {
            const Icon = item.icon;
            return (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink
                  asChild
                  className=" flex justify-center items-center"
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `h-13 w-15 my-0.5 ${
                        isActive ? `bg-gray-200 rounded-xl` : "bg-white"
                      }`
                    }
                  >
                    <Icon className="size-6" />
                  </NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
export default Navigation;
