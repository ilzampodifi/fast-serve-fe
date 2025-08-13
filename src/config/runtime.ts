type EnvType = Record<string, string | undefined>;

const isBun = typeof (globalThis as any).Bun !== "undefined";

const getEnvironmentVariables = (): EnvType => {
  if (isBun && (globalThis as any).Bun?.env) {
    return (globalThis as any).Bun.env;
  } else if (typeof process !== "undefined" && process.env) {
    return process.env;
  } else {
    console.warn("Environment variables not available in this runtime");
    return {};
  }
};

export const ENV: EnvType = getEnvironmentVariables();

export const getEnv = (
  key: string,
  defaultValue?: string
): string | undefined => {
  const value = ENV[key];

  return value ?? defaultValue;
};
