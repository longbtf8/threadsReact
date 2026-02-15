import { ChevronRight, Loader, Minus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useGetUserInfoQuery, useLoginMutation } from "@/services/Auth/authApi";
import { Link, Navigate, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { closeSignInUp } from "@/features/modalSignInUp/modalSignInUpSlice";

const schema = zod.object({
  login: zod.string().trim().min(1, "Vui lòng nhập tên tài khoản"), // Nên thêm min(1) để bắt buộc nhập
  password: zod
    .string()
    .trim()
    .min(1, "Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu phải có từ 6 ký tự"),
});

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // validate
  useEffect(() => {
    const isError = Object.values(errors);

    if (isError.length > 0 && isSubmitted) {
      const firstError = isError[0]?.message;
      toast(firstError, {
        position: "bottom-center",
        autoClose: 3000,
        theme: "dark",
        className: "!w-fit",
      });
    }
  }, [errors, isSubmitted]);
  const [login, { isLoading, isSuccess, error, data }] = useLoginMutation();
  // check login backend
  useEffect(() => {
    if (error?.data?.message === "Invalid credentials") {
      toast("Tài khoản không tồn tại", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "dark",
        className: "!w-fit",
      });
    }
  }, [error?.data?.message]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // lưu vào localstorage
  useEffect(() => {
    if (isSuccess) {
      toast("Đăng nhập thành công", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "dark",
        className: "!w-fit",
      });
      const { access_token, refresh_token } = data;
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
      dispatch(closeSignInUp());
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSuccess, dispatch]);

  const submit = (fromData) => {
    console.log(fromData);
    login(fromData);
  };
  const currentUser = useGetUserInfoQuery();
  useEffect(() => {
    if (currentUser.isSuccess) {
      navigate("/");
    }
  }, [currentUser.isSuccess, navigate]);

  return (
    <div className="w-104.5 h-113.75 p-6 mb-13 mt-12.5 bg-transparent text-[16px]   ">
      <h1 className="text-center font-semibold mb-4">
        Đăng nhập bằng tài khoản của bạn
      </h1>
      <div>
        <form onSubmit={handleSubmit(submit)}>
          <input
            {...register("login")}
            className="border p-4  w-full rounded-2xl h-13.75 bg-gray-100 mb-2"
            placeholder="Tên người dùng, số điện thoại hoặc email"
          />
          <input
            type="password"
            {...register("password")}
            className="border p-4  w-full rounded-2xl h-13.75 bg-gray-100 mb-2"
            placeholder="Mật khẩu"
          />

          <button
            type="submit"
            className="border p-4  w-full rounded-2xl h-13.75 bg-black mb-2s text-white cursor-pointer flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="animate-spin" />
            ) : (
              <span>Đăng nhập</span>
            )}
          </button>
        </form>
        <div className="text-center mt-3 text-gray-400">
          <Link to="/forgotPassword">Quên Mật Khẩu ?</Link>
          <div className="flex gap-1 justify-center items-center my-2">
            {" "}
            <Minus />
            hoặc <Minus />
          </div>
          <Link to="/register" className="text-black">
            Bạn chưa có tài khoản?
            <span className="font-semibold"> Đăng ký</span>
          </Link>
        </div>
        <div className=" flex items-center gap-x-2 bg-background rounded-2xl border p-5 cursor-pointer mt-5">
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
export default Login;
