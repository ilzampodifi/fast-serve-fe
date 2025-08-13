import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "@/pages/Index";
import Detail from "@/pages/Detail";
import Order from "@/pages/Order";
import { MainLayout } from "@/layouts/main-layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "order",
        element: <Order />,
      },
      {
        path: ":id",
        element: <Detail />,
      },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
