import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Write from "./pages/Write.jsx";
import Single from "./pages/Single.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Home Page</div>,
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
  return <div>
    <RouterProvider router={router}/>
  </div>;
}

export default App;
