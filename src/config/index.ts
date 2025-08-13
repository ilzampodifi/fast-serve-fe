import { getEnv } from "./runtime";
import { configSchema, type Config } from "./schema";

let cached: Readonly<Config> | null = null;

const DEFAULT_CONFIG: Config = {
  VITE_API_URL: "http://localhost:3001",
  NODE_ENV: "development" as const,
  VITE_ENABLE_DEBUG: false,
};

export const getConfig = (): Config => {
  if (cached) return cached;

  const rawConfig = {
    VITE_API_URL: getEnv("VITE_API_URL") || DEFAULT_CONFIG.VITE_API_URL,
    NODE_ENV: getEnv("NODE_ENV") || DEFAULT_CONFIG.NODE_ENV,
    VITE_ENABLE_DEBUG: getEnv("VITE_ENABLE_DEBUG"),
  };

  const config = configSchema.safeParse(rawConfig);

  if (!config.success) {
    console.error("Invalid environment variables:", config.error.message);
    console.warn("Using default configuration values");

    // Use default config if validation fails
    cached = Object.freeze(DEFAULT_CONFIG);
    return cached;
  }

  cached = Object.freeze(config.data);
  return cached;
};

export const getFreshConfig = (): Config => {
  cached = null;
  return getConfig();
};

export const validateConfig = (): { valid: boolean; errors?: string } => {
  try {
    const rawConfig = {
      VITE_API_URL: getEnv("VITE_API_URL") || DEFAULT_CONFIG.VITE_API_URL,
      NODE_ENV: getEnv("NODE_ENV") || DEFAULT_CONFIG.NODE_ENV,
      VITE_ENABLE_DEBUG: getEnv("VITE_ENABLE_DEBUG"),
    };

    const result = configSchema.safeParse(rawConfig);
    return {
      valid: result.success,
      errors: result.success ? undefined : result.error.message,
    };
  } catch (error) {
    return {
      valid: false,
      errors:
        error instanceof Error ? error.message : "Unknown validation error",
    };
  }
};
