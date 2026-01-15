import paths from "./config/paths";
import AuthLayout from "./layouts/AuthLayout";
import DefaultLayout from "./layouts/DefaultLayout";
import { EmbedLayout } from "./layouts/EmbedLayout";
import NoLayout from "./layouts/NoLayout";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register";
import ResetPassword from "./pages/Auth/ResetPassword";
import { Embed } from "./pages/Embeb";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Heart from "./pages/Search";
import Search from "./pages/Search";
import User from "./pages/User";

const routes = [
  {
    layout: DefaultLayout,
    children: [
      { path: paths.home, component: Home },
      { path: paths.search, component: Search },
      { path: paths.heart, component: Heart },
      { path: paths.user, component: User },
    ],
  },
  {
    layout: NoLayout,
    children: [{ path: paths.notFound, component: NotFound }],
  },

  { layout: EmbedLayout, children: [{ path: paths.embed, component: Embed }] },

  {
    layout: AuthLayout,
    children: [
      { path: paths.login, component: Login },
      { path: paths.register, component: Register },
      { path: paths.forgotPassword, component: ForgotPassword },
      { path: paths.resetPassword, component: ResetPassword },
    ],
  },
];
export default routes;
