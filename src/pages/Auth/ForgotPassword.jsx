import { ChevronRight, Loader, Minus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useForgotPasswordMutation } from "@/services/Auth/authApi";
import { useEffect } from "react";
import { toast } from "react-toastify";

const schema = zod.object({
  email: zod.email("Email không đúng định dạng").trim(),
});
function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const requestForm = (email) => {
    console.log(email);
    forgotPassword(email);
  };

  const [forgotPassword, obj] = useForgotPasswordMutation();
  console.log(obj);
  useEffect(() => {
    if (obj.isSuccess) {
      toast("Đã gửi tới email ", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "dark",
        className: "!w-fit",
      });
    }
  }, [obj.isSuccess]);
  useEffect(() => {
    if (obj.isError) {
      toast("Địa chỉ email đã chọn không hợp lệ", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "dark",
        className: "!w-fit",
      });
    }
  }, [obj.isError]);
  return (
    <div className="w-104.5 h-113.75 p-6 mb-13 mt-12. bg-transparent text-[16px]   ">
      <h1 className="text-center font-semibold mb-2">
        Nhập email của bạn để nhận liên kết đặt lại mật khẩu
      </h1>
      {/* Nếu thành công  */}
      <div className="h-5 mb-2">
        {obj.isSuccess && (
          <div>
            <p className="text-green-700 text-sm ">
              Liên kết đặt lại mật khẩu đã được gửi tới email của bạn
            </p>
          </div>
        )}
      </div>
      <div>
        <form onSubmit={handleSubmit(requestForm)}>
          <input
            type="text"
            {...register("email")}
            className="border p-4  w-full rounded-2xl h-13.75 bg-gray-100 mb-2"
            placeholder="Nhập email"
          />
          <div className="ml-2 h-3 flex items-center mb-2">
            {errors.email && (
              <p className="text-red-500 text-sm ml-2">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="border p-4  w-full rounded-2xl h-13.75 bg-black mb-2s text-white cursor-pointer flex justify-center items-center"
            disabled={obj.isLoading}
          >
            {obj.isLoading ? (
              <Loader className="animate-spin" />
            ) : (
              <span>Đặt lại mật khẩu</span>
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
export default ForgotPassword;
