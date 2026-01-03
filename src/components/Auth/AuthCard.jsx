import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { Link } from "react-router";

const AuthCard = () => {
  return (
    <div className="mt-15 w-84  h-75.75 py-8 px-6 border rounded-2xl bg-gray-50 mx-3">
      <h2 className="font-bold text-xl text-center ">
        Đăng nhập hoặc đăng ký Threads
      </h2>
      <p className="mt-3 text-gray-400 text-center">
        Xem mọi người đang nói về điều gì và tham gia cuộc trò chuyện.
      </p>

      <div className="mt-6 flex items-center gap-x-2 bg-background rounded-2xl">
        <div className="py-5 px-7 ">
          {" "}
          <InstagramLogoIcon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-gray-400">Tiếp tục bằng Instagram</p>
          <p className="font-semibold"> Bùi Thành Long</p>
        </div>
      </div>
      <p className="mt-6 text-center text-gray-400">
        <Link to={"/login"}>Đăng nhập bằng tên người dùng</Link>
      </p>
    </div>
  );
};
export default AuthCard;
