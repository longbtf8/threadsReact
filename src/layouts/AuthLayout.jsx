import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="flex flex-col w-screen h-screen relative">
      <img
        src="./bgLogin.webp"
        alt="backgroundLogin"
        className="fixed top-0 object-cover h-128.75 w-full mt-[calc(100vh-940px)] -z-10  "
      />
      <div className="flex w-full h-full justify-center items-center mt-45">
        <Outlet />
      </div>
      <div className="fixed right-6 bottom-10 w-32.5 h-38.75 text-[13px]  flex-col text-center items-center hidden md-plus:flex ] transition-all duration-300 xl:w-50 xl:bottom-15">
        <p className="mb-4 text-gray-400">Quét để tải ứng dụng</p>
        <img
          src="./qrThreads.svg"
          alt="qrThreads"
          className="bg-background w-30 h-30 p-1 border rounded-2xl xl:w-35 xl:h-35 2xl:w-40 2xl:h-40 hover:scale-110 transition cursor-pointer "
        />
      </div>
      <ul className="flex w-full justify-center items-center text-gray-400 gap-3 text-[12px] h-17.5 p-4 flex-wrap ">
        <li>
          <span>© 2025</span>
        </li>
        <li>
          <span>
            <a target="_blank">
              <span>Điều khoản của Threads</span>
            </a>
          </span>
        </li>
        <li>
          <span>
            <a target="_blank">
              <span>Chính sách quyền riêng tư</span>
            </a>
          </span>
        </li>
        <li>
          <span>
            <a target="_blank">
              <span>Chính sách cookie</span>
            </a>
          </span>
        </li>
        <li>
          <div>
            <span>Báo cáo sự cố</span>
          </div>
        </li>
      </ul>
    </div>
  );
};
export default AuthLayout;
