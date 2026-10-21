import { RouterProvider } from "react-router-dom";
import { routes } from "./shared/routing/Routes"

import { Toast } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContextProvider from "./shared/context/AuthContextProvider";
import MyProfileContextProvider from "./shared/context/MyProfileContextProvider";

export const queryClient = new QueryClient()

function App() {

  return (

    <>
      <QueryClientProvider client={queryClient}>

        <AuthContextProvider>
          <MyProfileContextProvider>

            <Toast.Provider placement="top" gap={12} className="mt-6"></Toast.Provider>
            <RouterProvider router={routes} ></RouterProvider>

          </MyProfileContextProvider>

        </AuthContextProvider>
      </QueryClientProvider>


    </>


  );

}

export default App
