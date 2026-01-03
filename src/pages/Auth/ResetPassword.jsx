import { ChevronRight, Minus } from "lucide-react";
import { useForm } from "react-hook-form";

function ResetPassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  return (
    <div className="w-104.5 h-113.75 p-6 mb-13 mt-12. bg-transparent text-[16px]   ">
      <h1 className="text-center font-semibold mb-4">Tạo mật khẩu mới </h1>
      <div>
        <form>
          <input
            type="text"
            {...register("password")}
            className="border p-4  w-full rounded-2xl h-13.75 bg-gray-100 mb-2"
            placeholder="Mật khẩu mới"
          />{" "}
          <input
            type="text"
            {...register("confirmPassword")}
            className="border p-4  w-full rounded-2xl h-13.75 bg-gray-100 mb-2"
            placeholder="Xác nhận mật khẩu"
          />
          <input
            type="submit"
            className="border p-4  w-full rounded-2xl h-13.75 bg-black mb-2s text-white"
            value="Xác nhận"
          />
        </form>
        <div className="text-center mt-3 text-gray-400">
          {/* <a href="#">Quên Mật Khẩu ?</a> */}
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
export default ResetPassword;
