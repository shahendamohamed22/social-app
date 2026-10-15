import { RouterProvider } from "react-router-dom";
import { routes } from "./routing/Routes"

import { Toast } from "@heroui/react";
import AuthContext from "./context/AuthContext";

function App() {

  return (

    <>
      <AuthContext>

        <RouterProvider router={routes} />

        <Toast.Provider placement="top" gap={12} className="mt-6 text-6xl"  >
        </Toast.Provider>

      </AuthContext>


    </>


  );

}

export default App
