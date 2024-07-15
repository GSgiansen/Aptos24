import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Mint } from "@/pages/Mint";
import { CreateCollection } from "@/pages/CreateCollection";
import { MyCollections } from "@/pages/MyCollections";

function Layout() {
  return (
    <>
      <Outlet />
    </>
  );
}

function App() {

  return (
    <>
        <RouterProvider router={createBrowserRouter([
          {
            element: <Layout />,
            children: [
              {
                path: "/",
                element: <Mint />,
              },
              {
                path: "create-collection",
                element: <CreateCollection />
              },
              {
                path: "my-collections",
                element: <MyCollections />,
              },
            ],
          },
        ])} />

    </>
  );
}

export default App;
