import { Route, BrowserRouter as Router, Routes } from "react-router";
import routes from "./routes";

function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => {
          const Layout = route.layout;
          return (
            <Route key={index} element={<Layout />}>
              {route.children.map((child, index) => {
                const Component = child.component;
                return (
                  <Route
                    key={index}
                    path={child.path}
                    element={<Component />}
                  />
                );
              })}
            </Route>
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
