import { RouterProvider } from "react-router-dom";
import { routes } from "./shared/routing/Routes"

import { Toast } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContextProvider from "./shared/context/AuthContextProvider";
import MyProfileContextProvider from "./shared/context/MyProfileContextProvider";
import NotificationContextProvider from "./shared/context/NotificationContextProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000 * 3,
      gcTime: 60000 * 2,
      retry: 1
    }
  }
})

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <NotificationContextProvider>
            <MyProfileContextProvider>

              <Toast.Provider placement="top" gap={12} className="mt-6"></Toast.Provider>
              <RouterProvider router={routes} ></RouterProvider>
            </MyProfileContextProvider>
          </NotificationContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>


    </>


  );

}

export default App
