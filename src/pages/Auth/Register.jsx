import { Loader, Minus } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import { useEffect } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { useRegisterMutation } from "@/services/Auth/authApi";

const schema = zod
  .object({
    username: zod.string().trim().min(1, "Vui lòng nhập tên hiển thị"),
    email: zod.email("Email không hợp lệ").min(1, "Vui lòng nhập email"),
    password: zod.string().min(8, "Mật khẩu tối thiểu 8 ký tự"),
    password_confirmation: zod.string().min(1, "Vui lòng xác nhận mật khẩu"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Mật khẩu không khớp",
    path: ["password_confirmation"],
  });

function Register() {
  const {
    register,
    control,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [registerUser, { isLoading, isSuccess, error: apiError }] =
    useRegisterMutation();

  const watchUsername = useWatch({
    control,
    name: "username",
  });
  const watchEmail = useWatch({
    control,
    name: "email",
  });
  // watch username
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (watchUsername) {
        trigger("username");
      }
    }, 800);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [trigger, watchUsername]);

  // watch email
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (watchEmail) {
        trigger("email");
      }
    }, 800);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [trigger, watchEmail]);
  // gửi Api
  const SubmitForm = async (fromData) => {
    try {
      await registerUser(fromData);
    } catch (error) {
      console.log("Lỗi đăng kí", error);
      if (!error.data?.errors) {
        toast.error("Vui lòng thử lại sau!");
      }
    }
  };
  console.log(apiError);
  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess, reset]);
  return (
    <div className="w-104.5 min-h-113.75 p-6 mb-13 mt-20 bg-transparent text-[16px]   ">
      <h1 className="text-center font-semibold  text-xl mb-0.5">
        Đăng kí tài khoản Threads
      </h1>
      {/* Nếu thành công  */}
      <div className="h-5 mb-2">
        {isSuccess && (
          <div>
            <p className="text-green-700 text-sm ">
              Chúng tôi đã gửi một liên kết xác thực tới email của bạn. Vui lòng
              kiểm tra email để xác thực tài khoản.
            </p>
          </div>
        )}
      </div>
      <div className="mt-5.5">
        <form onSubmit={handleSubmit(SubmitForm)}>
          {/* username */}
          <div className="mb-2">
            <input
              type="text"
              {...register("username")}
              className={`border p-4  w-full rounded-2xl h-13.75 bg-gray-100 mb-2 ${
                errors.username ? "border-red-500" : "focus:border-black"
              }`}
              placeholder="Tên hiển thị"
            />
            <div className="flex h-3 ml-2 items-center">
              {errors.username && (
                <p className="text-red-500 text-sm ml-2">
                  {errors.username.message}
                </p>
              )}
              {apiError?.data?.errors?.username?.[0] ===
                "The username has already been taken." && (
                <p className="text-red-500 text-sm ml-2">
                  Tên hiển thị đã tồn tại
                </p>
              )}
            </div>
          </div>

          {/* email */}
          <div className="mb-2">
            <input
              type="text"
              {...register("email")}
              className={`border p-4  w-full rounded-2xl h-13.75 bg-gray-100 mb-2 ${
                errors.email ? "border-red-500" : "focus:border-black"
              }`}
              placeholder="Nhập Email của bạn"
            />
            <div className="ml-2 h-3 items-center flex">
              {errors.email && (
                <p className="text-red-500 text-sm ml-2">
                  {errors.email.message}
                </p>
              )}
              {apiError?.data?.errors?.email?.[0] ===
                "The email has already been taken." && (
                <p className="text-red-500 text-sm ml-2">Email đã tồn tại</p>
              )}
            </div>
          </div>

          {/* password */}
          <div className="mb-2">
            {" "}
            <input
              type="text"
              {...register("password")}
              className={`border p-4  w-full rounded-2xl h-13.75 bg-gray-100 mb-2 ${
                errors.password ? "border-red-500" : "focus:border-black"
              }`}
              placeholder="Nhập mật khẩu của bạn"
            />
            <div className="ml-2 h-3 flex items-center">
              {errors.password && (
                <p className="text-red-500 text-sm ml-2">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          {/* confirmPassword */}
          <div className="mb-2">
            <input
              type="text"
              {...register("password_confirmation")}
              className={`border p-4  w-full rounded-2xl h-13.75 bg-gray-100 mb-2 ${
                errors.password_confirmation
                  ? "border-red-500"
                  : "focus:border-black"
              }`}
              placeholder="Xác nhận mật khẩu của bạn"
            />

            <div className="ml-2 h-3 flex items-center">
              {errors.password_confirmation && (
                <p className="text-red-500 text-sm ml-2">
                  {errors.password_confirmation.message}
                </p>
              )}
            </div>
          </div>

          {/* submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="border p-4  w-full rounded-2xl h-13.75 bg-black mb-2s text-white cursor-pointer flex justify-center"
          >
            {isLoading ? (
              <Loader className="animate-spin" />
            ) : (
              <span>Đăng ký</span>
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
          <Link to="/login" className="text-black cursor-pointer">
            Bạn đã có tài khoản?
            <span className="font-semibold"> Đăng Nhập</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Register;
