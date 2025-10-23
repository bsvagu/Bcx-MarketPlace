import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import * as db from "../db";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  // For simple authentication, we'll allow all requests
  // The client-side authentication handles the UI logic
  // Server-side we'll just return a mock user for authenticated routes
  const mockUser: User = {
    id: "1",
    name: "Santhosh",
    email: "santhosh@bcx.co.za",
    role: "admin",
    password: "bcx123", // This is just for type safety, not used
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    req: opts.req,
    res: opts.res,
    user: mockUser, // Always return a user for now
  };
}
