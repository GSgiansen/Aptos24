import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Mint } from "@/pages/Mint";
import { CreateCollection } from "@/pages/CreateCollection";
import { MyCollections } from "@/pages/MyCollections";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { VITE_MASTER_ACCOUNT } from "./constants";
import { Events } from "./pages/Events";
import EventDetail from "./pages/Events/EventDetail";

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
      <RouterProvider
        router={createBrowserRouter([
          {
            element: <Layout />,
            children: [
              {
                path: "/",
                element:<Events />,
              },
              {
                path: "create-collection",
                element: <CreateCollection />

              },
              {
                path: "my-collections",
                element: <MyCollections />,
              },
              {
                path: "events",
                element: <Mint />,
              },
              {
                path: "events/:eventId",
                element: <EventDetail />,
              },
            ],
          },
        ])}
      />
    </>
  );
}

export default App;
