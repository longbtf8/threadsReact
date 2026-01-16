import { useState } from "react";

export const useToggleSettingMenu = () => {
  const [toggleSettingMenu, setToggleSettingMenu] = useState(false);
  const handleCloseMenu = () => {
    setToggleSettingMenu(false);
  };
  return { toggleSettingMenu, handleCloseMenu, setToggleSettingMenu };
};
