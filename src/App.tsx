import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Register, Home } from "./pages";
import ErrorPage from "./pages/error-page";
import { Dashboard } from "./pages/dashboard";

const App = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Home />, errorElement: <ErrorPage /> },
    { path: "/home", element: <Home />, errorElement: <ErrorPage /> },
    {
      path: "/register",
      element: <Register />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} /> <Toaster />
    </>
  );
};

export default App;
