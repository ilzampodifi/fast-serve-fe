import { z } from "zod";

export const configSchema = z.object({
  VITE_API_URL: z
    .string()
    .min(1, "API URL cannot be empty")
    .describe("Base URL for API endpoints"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development")
    .describe("Application environment"),
  VITE_ENABLE_DEBUG: z
    .string()
    .optional()
    .transform((val) => val === "true")
    .describe("Enable debug mode"),
});

export type Config = z.infer<typeof configSchema>;

export const getConfigSchema = () => {
  return configSchema;
};
