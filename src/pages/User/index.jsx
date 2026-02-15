import Header from "@/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { useGetUserInfoQuery } from "@/services/Auth/authApi";

import { ArrowLeft, Bell, CircleEllipsis } from "lucide-react";
import avt from "@/assets/avatarProfile.jpg";

const User = () => {
  const { data: userInfo } = useGetUserInfoQuery();
  return (
    <div className="w-full mx-auto ">
      <Header title={"Search"} />
      <div className="md:border">
        <div className=" px-4 rounded-2xl min-h-screen">
          <div>
            {/* Phần thông tin User */}
            <div className="p-4">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-xl font-bold ">
                    {userInfo?.name || "Bùi Thành Long "}
                  </p>
                  <p> {userInfo?.username || "Longnd312"}</p>
                </div>
                <div>
                  <Avatar className="h-21 w-21">
                    <AvatarImage src={avt}></AvatarImage>
                    <AvatarFallback>Avatar</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <div className="flex pt-4 ">
                <p className="flex-1">2005 followers</p>
                <div className="flex gap-2 items-center pr-3">
                  <Bell className="text-xl" />
                  <CircleEllipsis className="text-xl" />
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button className="flex-1">Follow</Button>
                <Button className="bg-white text-black border-gray-200 border flex-1">
                  Mention
                </Button>
              </div>
            </div>
            {/* Phần dũ liệu */}
            <div>
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger className="flex-1 bg-gray-200">
                    Threads
                  </MenubarTrigger>
                </MenubarMenu>

                <MenubarMenu>
                  <MenubarTrigger className="flex-1">Replies</MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger className="flex-1">Media</MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger className="flex-1">Reposts</MenubarTrigger>
                </MenubarMenu>
              </Menubar>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default User;
