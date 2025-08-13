import { QueryClient, MutationCache, QueryCache } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time - how long data is considered fresh (5 minutes)
      staleTime: 5 * 60 * 1000,

      // Cache time - how long data stays in cache when unused (10 minutes)
      gcTime: 10 * 60 * 1000,

      // Retry configuration
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors (client errors)
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },

      // Retry delay with exponential backoff
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

      // Disable automatic refetching to prevent spam
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: true,

      // Network mode - only fetch when online
      networkMode: "online",

      // Refetch interval (disabled by default, can be enabled per query)
      refetchInterval: false,
      refetchIntervalInBackground: false,
    },
    mutations: {
      // Retry mutations only once on network errors
      retry: (failureCount, error: any) => {
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        return failureCount < 1;
      },

      // Network mode for mutations
      networkMode: "online",
    },
  },

  // Global error handlers
  mutationCache: new MutationCache({
    onError: (error: any, variables: any, context: any, mutation: any) => {
      console.error("Mutation error:", error);
      // You can add global error handling here (e.g., toast notifications)
    },
  }),

  queryCache: new QueryCache({
    onError: (error: any, query: any) => {
      console.error("Query error:", error);
      // You can add global error handling here (e.g., toast notifications)
    },
  }),
});
