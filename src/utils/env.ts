import dotenv from "dotenv";
dotenv.config();

export function getEnvVarString(name: string): string {
  const value = process.env[name];

  if (value !== undefined && value !== null && value.trim() !== "") {
    return value;
  }

  throw new Error(
    `Variable ${name} is empty or not defined. Current value: ${value}`,
  );
}
