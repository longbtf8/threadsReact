import Header from "@/components/Header";

import { useGetUserInfoQuery } from "@/services/Auth/authApi";

const User = () => {
  const currentUser = useGetUserInfoQuery();
  return (
    <div className="w-full mx-auto ">
      <Header title={"Trang cá nhân"} />
      <div className="md:border">
        <div className=" p-4 overflow-hidden rounded-2xl min-h-screen">
          <div>Hello {currentUser?.data?.name}</div>
        </div>
      </div>
    </div>
  );
};

export default User;
