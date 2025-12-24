import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Outlet } from "react-router";

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <Navigation />
      <div className="w-screen h-screen">
        <Outlet />
      </div>
    </>
  );
};
export default DefaultLayout;
