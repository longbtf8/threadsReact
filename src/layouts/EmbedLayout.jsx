import { Outlet } from "react-router";

export const EmbedLayout = () => {
  return (
    <main className="w-screen ">
      <Outlet />
    </main>
  );
};
