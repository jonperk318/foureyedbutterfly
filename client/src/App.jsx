import {
  createBrowserRouter, Outlet,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Write from "./pages/Write.jsx";
import Single from "./pages/Single.jsx";
import Navbar from "./components/Navbar.jsx";
import NavbarMobile from "./components/NavbarMobile.jsx";
import "./style.scss"

const Layout = ()=> {
  return (
      <>
        <Navbar/>
        <NavbarMobile/>
        <Outlet/>
      </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/post/:id",
        element: <Single/>
      },
      {
        path: "/write",
        element: <Write/>
      }
    ]
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/write",
    element: <Write/>,
  },
  {
    path: "/single",
    element: <Single/>,
  }
]);

function App() {
  return (
      <div className="app">
        <div className="container">
          <RouterProvider router={router}/>
        </div>
      </div>
  );
}

export default App;
