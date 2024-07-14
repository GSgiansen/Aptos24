import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Mint } from "@/pages/Mint";
import { CreateCollection } from "@/pages/CreateCollection";
import { MyCollections } from "@/pages/MyCollections";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { VITE_MASTER_ACCOUNT } from "./constants";

function Layout() {
  return (
    <>
      <Outlet />
    </>
  );
}

function App() {
  const aptosWallet = useWallet();
  const isWalletAccountEqual = aptosWallet.account === VITE_MASTER_ACCOUNT;

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
                element: isWalletAccountEqual ? <CreateCollection /> :  <div>Unauthorized access</div>
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
