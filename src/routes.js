import paths from "./config/paths";
import DefaultLayout from "./layouts/DefaultLayout";
import NoLayout from "./layouts/NoLayout";
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
];
export default routes;
