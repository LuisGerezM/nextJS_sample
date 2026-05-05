interface EnvVars {
  apiBaseUrl: string;
}

export const envs: EnvVars = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL as string,
};
