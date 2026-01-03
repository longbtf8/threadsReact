import AuthCard from "@/components/Auth/AuthCard";
import ModalSignInUp from "@/components/modalSignInUp/modalSignInSignUp";
import ModelSignInUp from "@/components/modalSignInUp/modalSignInSignUp";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { closeSignInUp } from "@/features/modalSignInUp/modalSignInUpSlice";

import { useDispatch, useSelector } from "react-redux";

import { Link, Outlet } from "react-router";

const DefaultLayout = () => {
  const isOpenModalSignInUp = useSelector(
    (state) => state.modalSignInUp.isModalOpen
  );
  const dispatch = useDispatch();
  const handleCloseModalSignInUp = () => {
    dispatch(closeSignInUp());
  };
  return (
    <>
      <Navigation />
      <div className="h-screen overflow-hidden w-screen">
        <div className="md:flex flex-row  w-full h-full md:px-5 overflow-auto gap-2.5">
          {/* Cột trái */}
          <div className="min-w-19 shrink-0  hidden md:block"></div>

          <div className="md:grow md:flex justify-center">
            {/* chưa login */}
            <div className="min-w-19 shrink-0  hidden lg:block"></div>

            {/* Page 1 */}
            <div className="md:min-w-125 md:max-w-166 w-full shrink-0 h-full  md:overflow-y-auto md:overflow-x-hidden">
              <Outlet />
            </div>
            {/* Login */}
            <div className="hidden lg:block ">
              <AuthCard />
            </div>
          </div>

          {/* Cột phải - luôn ở cuối */}
          <div className="min-w-19 shrink-0  hidden md:block"></div>
        </div>

        {/* button login */}
        <div className="fixed z-99 top-5 right-4 ">
          <Link to={"/login"}>
            <Button className="h-9 cursor-pointer">Đăng Nhập</Button>
          </Link>
        </div>

        <ModalSignInUp
          modalIsOpen={isOpenModalSignInUp}
          closeModal={() => {
            handleCloseModalSignInUp();
          }}
        />
      </div>
    </>
  );
};

export default DefaultLayout;
