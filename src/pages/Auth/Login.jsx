import { ChevronRight, Minus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Bounce, toast } from "react-toastify";
import { useEffect } from "react";
import { useLoginMutation } from "@/services/Auth/loginApi";

const schema = zod.object({
  login: zod.string().min(11, "Vui lòng nhập tên người dùng"), // Nên thêm min(1) để bắt buộc nhập
  password: zod.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm({
    resolver: zodResolver(schema),
  });
  useEffect(() => {
    const isError = Object.values(errors);

    if (isError.length > 0 && isSubmitted) {
      const firstError = isError[0]?.message;
      toast(firstError, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        className: "!w-fit",
      });
    }
  }, [errors, isSubmitted]);

  console.log(errors);
  const [login, data] = useLoginMutation();
  const submit = (data) => {
    console.log(data);
    login(data);
  };
  console.log(data);
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
            {...register("password")}
            className="border p-4  w-full rounded-2xl h-13.75 bg-gray-100 mb-2"
            placeholder="Mật khẩu"
          />
          <input
            type="submit"
            className="border p-4  w-full rounded-2xl h-13.75 bg-black mb-2s text-white cursor-pointer"
            value="Đăng nhập"
          />
        </form>
        <div className="text-center mt-3 text-gray-400">
          <a href="#">Quên Mật Khẩu ?</a>
          <div className="flex gap-1 justify-center items-center my-5">
            {" "}
            <Minus />
            hoặc <Minus />
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
export default Login;
