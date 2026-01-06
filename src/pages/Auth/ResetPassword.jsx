import { ChevronRight, Loader, Minus } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useResetPasswordMutation } from "@/services/Auth/authApi";
import { useEffect } from "react";
import { toast } from "react-toastify";

const schema = zod
  .object({
    password: zod.string().min(8, "Mật khẩu tối thiểu 8 ký tự"),
    password_confirmation: zod.string().min(1, "Vui lòng xác nhận mật khẩu"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Mật khẩu không khớp",
    path: ["password_confirmation"],
  });

function ResetPassword() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  // check token
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  const [resetPassword, { isLoading, isSuccess, error }] =
    useResetPasswordMutation();
  const requestForm = (dataSubmit) => {
    const formData = {
      token,
      ...dataSubmit,
    };
    resetPassword(formData);
  };
  console.log(error);
  useEffect(() => {
    if (error?.data?.message === "Invalid or expired token") {
      reset();
      toast("Liên kết đã hết hạn hoặc không hợp lệ", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "dark",
        className: "!w-fit",
      });
    }
  }, [error, reset]);
  useEffect(() => {
    if (isSuccess) {
      reset();
      toast("Tạo mật khẩu mới thành công, vui lòng đăng nhập", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "dark",
        className: "!w-fit",
      });
      navigate("/login");
    }
  }, [isSuccess, navigate, reset]);
  return (
    <div className="w-104.5 h-113.75 p-6 mb-13 mt-12. bg-transparent text-[16px]   ">
      <h1 className="text-center font-semibold mb-4">Tạo mật khẩu mới </h1>
      <div>
        <form onSubmit={handleSubmit(requestForm)}>
          <input
            type="text"
            {...register("password")}
            className="border p-4  w-full rounded-2xl h-13.75 bg-gray-100 mb-2"
            placeholder="Mật khẩu mới"
          />
          <div className="ml-2 h-3 flex items-center mb-2">
            {errors.password && (
              <p className="text-red-500 text-sm ml-2">
                {errors.password.message}
              </p>
            )}
          </div>
          <input
            type="text"
            {...register("password_confirmation")}
            className="border p-4  w-full rounded-2xl h-13.75 bg-gray-100 mb-2"
            placeholder="Xác nhận mật khẩu"
          />
          <div className="ml-2 h-3 flex items-center mb-2">
            {errors.password_confirmation && (
              <p className="text-red-500 text-sm ml-2">
                {errors.password_confirmation.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="border p-4  w-full rounded-2xl h-13.75 bg-black mb-2s text-white cursor-pointer flex justify-center items-center"
          >
            {isLoading ? (
              <Loader className="animate-spin" />
            ) : (
              <span>Xác nhận</span>
            )}
          </button>
        </form>
        <div className="text-center mt-3 text-gray-400">
          {/* <a href="#">Quên Mật Khẩu ?</a> */}
          <div className="flex gap-1 justify-center items-center my-5">
            {" "}
            <Minus />
            hoặc <Minus />
          </div>
          <div className="mb-3">
            <Link to="/login" className="text-black cursor-pointer ">
              <span className="font-semibold underline"> Đăng Nhập</span>
            </Link>
          </div>
        </div>
        <div className=" flex items-center gap-x-2 bg-background rounded-2xl border p-5 cursor-pointer">
          <div className="mr-1">
            {" "}
            <img
              src="./Instagram_logo.svg.webp"
              alt="logoIG"
              className="w-11.25 h-11.25"
            />
          </div>
          <div className="grow">
            <p className="text-gray-400">Tiếp tục bằng Instagram</p>
            <p className="font-semibold"> Bùi Thành Long</p>
          </div>
          <div>
            <ChevronRight
              size={24}
              strokeWidth={1.5}
              className="text-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default ResetPassword;
