import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import PostsPage from "./pages/PostsPage"
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Write from "./pages/Write.jsx";
import Single from "./pages/Single.jsx";
import Navbar from "./components/Navbar.jsx";
import NavbarMobile from "./components/NavbarMobile.jsx";
import PageNotfound404 from "./pages/PageNotfound404.jsx";
import "./style.scss";

const Layout = () => {
  return (
    <>
      <Navbar />
      <NavbarMobile />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/2025",
        element: <PostsPage year={"2025"} />,
      },
      {
        path: "/2026",
        element: <PostsPage year={"2026"} />,
      },
      {
        path: "/post/:id",
        element: <Single />,
      },
      {
        path: "/write",
        element: <Write />,
      },
      {
        path: "*",
        element: <PageNotfound404 />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider
          router={router}
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        />
      </div>
    </div>
  );
}

export default App;
