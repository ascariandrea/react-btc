import { isAxiosError } from "axios";

export class AppError extends Error {
  constructor(
    public readonly name: string,
    public readonly message: string,
    public readonly details: string[]
  ) {
    super(message, {});
    this.name = name;
    this.message = message;
    this.details = details;
  }
}

export const toAppError = (e: unknown): AppError => {
  if (isAxiosError(e)) {
    return new AppError(
      "APIError",
      e.message,
      [e.response?.data, e.stack].filter((d) => d !== undefined)
    );
  }
  if (e instanceof Error) {
    return new AppError(e.name, e.message, []);
  }

  if (typeof e === "string") {
    return new AppError("Unknown", e, []);
  }

  return new AppError("Unknown", e as any, []);
};
