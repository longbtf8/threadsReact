import copy from "copy-to-clipboard";
import { toast } from "react-toastify";

export const handleCopyPostLink = ({ onClose, PostId, username }) => {
  const url = window.location.origin + "/" + username + "/post/" + PostId;
  copy(url);
  toast("Đã sao chép", {
    position: "bottom-center",
    autoClose: 3000,
    theme: "dark",
    className: "!w-fit",
  });

  onClose();
};
