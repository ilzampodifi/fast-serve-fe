import { Outlet } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/query-client";
import { getConfig } from "@/config";

export const MainLayout = () => {
  

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
      
        <Outlet />
      </div>
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
};
