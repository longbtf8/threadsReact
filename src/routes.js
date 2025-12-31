import paths from "./config/paths";
import AuthLayout from "./layouts/AuthLayout";
import DefaultLayout from "./layouts/DefaultLayout";
import NoLayout from "./layouts/NoLayout";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";

const routes = [
  {
    layout: DefaultLayout,
    children: [
      { path: paths.home, component: Home },
      { path: paths.search, component: Search },
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
    ],
  },
];
export default routes;
