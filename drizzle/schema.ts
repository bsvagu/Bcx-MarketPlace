import { pgEnum, pgTable, text, timestamp, varchar, integer, boolean } from "drizzle-orm/pg-core";

/**
 * Enums for PostgreSQL
 */
export const userRoleEnum = pgEnum("user_role", ["user", "admin"]);
export const apiStatusEnum = pgEnum("api_status", ["active", "deprecated", "beta"]);
export const apiMethodEnum = pgEnum("api_method", ["GET", "POST", "PUT", "DELETE", "PATCH"]);
export const subscriptionStatusEnum = pgEnum("subscription_status", ["active", "suspended", "cancelled"]);

/**
 * Core user table backing auth flow.
 */
export const users = pgTable("users", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  password: varchar("password", { length: 255 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: userRoleEnum("role").default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * API Categories table
 */
export const apiCategories = pgTable("api_categories", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  icon: varchar("icon", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type ApiCategory = typeof apiCategories.$inferSelect;
export type InsertApiCategory = typeof apiCategories.$inferInsert;

/**
 * APIs table - stores all available APIs in the marketplace
 */
export const apis = pgTable("apis", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  categoryId: varchar("categoryId", { length: 64 }).notNull(),
  version: varchar("version", { length: 50 }).notNull(),
  status: apiStatusEnum("status").default("active").notNull(),
  endpoint: varchar("endpoint", { length: 500 }).notNull(),
  method: apiMethodEnum("method").notNull(),
  pricing: varchar("pricing", { length: 100 }),
  rateLimit: varchar("rateLimit", { length: 100 }),
  documentation: text("documentation"),
  featured: boolean("featured").default(false),
  popularity: integer("popularity").default(0),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type Api = typeof apis.$inferSelect;
export type InsertApi = typeof apis.$inferInsert;

/**
 * API Subscriptions - tracks user subscriptions to APIs
 */
export const apiSubscriptions = pgTable("api_subscriptions", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: varchar("userId", { length: 64 }).notNull(),
  apiId: varchar("apiId", { length: 64 }).notNull(),
  apiKey: varchar("apiKey", { length: 255 }).notNull(),
  status: subscriptionStatusEnum("status").default("active").notNull(),
  subscribedAt: timestamp("subscribedAt").defaultNow(),
  expiresAt: timestamp("expiresAt"),
});

export type ApiSubscription = typeof apiSubscriptions.$inferSelect;
export type InsertApiSubscription = typeof apiSubscriptions.$inferInsert;

/**
 * API Requests - tracks user requests for API access, enhancements, and support
 */
export const apiRequests = pgTable("api_requests", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: varchar("userId", { length: 64 }).notNull(),
  apiId: varchar("apiId", { length: 64 }),
  requestType: varchar("requestType", { length: 50 }).notNull(), // 'access', 'enhancement', 'support'
  details: text("details").notNull(),
  status: varchar("status", { length: 50 }).default("pending").notNull(), // 'pending', 'approved', 'rejected'
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type ApiRequest = typeof apiRequests.$inferSelect;
export type InsertApiRequest = typeof apiRequests.$inferInsert;

