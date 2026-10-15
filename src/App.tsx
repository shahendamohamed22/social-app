import { RouterProvider } from "react-router-dom";
import { routes } from "./shared/routing/Routes"

import { Toast } from "@heroui/react";
import AuthContext from "./shared/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MyProfileContext from "./shared/context/MyProfileContext";

const queryClient = new QueryClient()

function App() {

  return (

    <>
      <QueryClientProvider client={queryClient}>

        <AuthContext>
          <MyProfileContext>

            <Toast.Provider placement="top" gap={12} className="mt-6"></Toast.Provider>
            <RouterProvider router={routes} ></RouterProvider>

          </MyProfileContext>

        </AuthContext>
      </QueryClientProvider>


    </>


  );

}

export default App
