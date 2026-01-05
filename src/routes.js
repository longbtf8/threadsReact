import paths from "./config/paths";
import AuthLayout from "./layouts/AuthLayout";
import DefaultLayout from "./layouts/DefaultLayout";
import NoLayout from "./layouts/NoLayout";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register";
import ResetPassword from "./pages/Auth/ResetPassword";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";
import User from "./pages/User";

const routes = [
  {
    layout: DefaultLayout,
    children: [
      { path: paths.home, component: Home },
      { path: paths.search, component: Search },
      { path: paths.user, component: User },
    ],
  },
  {
    layout: NoLayout,
    children: [{ path: paths.notFound, component: NotFound }],
  },
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
