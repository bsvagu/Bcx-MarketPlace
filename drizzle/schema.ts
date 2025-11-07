import { pgEnum, pgTable, text, timestamp, varchar, integer, boolean } from "drizzle-orm/pg-core";
export const apiStatusEnum = pgEnum("api_status", ["active", "deprecated", "beta"]);
export const apiMethodEnum = pgEnum("api_method", ["GET", "POST", "PUT", "DELETE", "PATCH"]);
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
  // Excel + XLayer APIs fields
  businessUnit: varchar("businessUnit", { length: 255 }),
  serviceName: varchar("serviceName", { length: 255 }),
  clientsImpacted: text("clientsImpacted"),
  backends: text("backends"),
  complexity: varchar("complexity", { length: 100 }),
  serviceType: varchar("serviceType", { length: 100 }),
  integrationType: varchar("integrationType", { length: 100 }),
  serviceDescription: text("serviceDescription"),
  // XLayer / Swagger-related
  swaggerUrl: varchar("swaggerUrl", { length: 500 }),
  apiVersion: varchar("apiVersion", { length: 50 }),
  authRequired: boolean("authRequired"),
  responseFormat: varchar("responseFormat", { length: 100 }),
  timeout: varchar("timeout", { length: 50 }),
  // 🆕 NEW FIELD - Added to store API parameters from PDF/Swagger
  // Stores JSON array of parameter objects: [{ name, type, required, description }, ...]
  parameters: text("parameters"),
  area: varchar("area", { length: 255 })
});
 
export type Api = typeof apis.$inferSelect;
export type InsertApi = typeof apis.$inferInsert;