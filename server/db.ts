import { eq, desc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { InsertUser, users, apis, apiCategories, apiSubscriptions, apiRequests, InsertApi, InsertApiCategory, InsertApiSubscription, InsertApiRequest } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;
let _client: ReturnType<typeof postgres> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _client = postgres(process.env.DATABASE_URL);
      _db = drizzle(_client);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.id) {
    throw new Error("User ID is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      id: user.id,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role === undefined) {
      if (user.id === ENV.ownerId) {
        user.role = 'admin';
        values.role = 'admin';
        updateSet.role = 'admin';
      }
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    // PostgreSQL upsert syntax
    await db.insert(users).values(values).onConflictDoUpdate({
      target: users.id,
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUser(id: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUserByEmail(email: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function updateUserLastSignedIn(userId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update user: database not available");
    return;
  }

  await db.update(users).set({ lastSignedIn: new Date() }).where(eq(users.id, userId));
}

// API Categories queries
export async function getAllCategories() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(apiCategories);
}

export async function getCategoryById(id: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(apiCategories).where(eq(apiCategories.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createCategory(category: InsertApiCategory) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(apiCategories).values(category).onConflictDoNothing();
}

// APIs queries
export async function getAllApis() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(apis).orderBy(desc(apis.popularity));
}

export async function getFeaturedApis() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(apis).where(eq(apis.featured, true)).orderBy(desc(apis.popularity)).limit(6);
}

export async function getApiById(id: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(apis).where(eq(apis.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getApisByCategory(categoryId: string) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(apis).where(eq(apis.categoryId, categoryId)).orderBy(desc(apis.popularity));
}

export async function createApi(api: InsertApi) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(apis).values(api).onConflictDoNothing();
}

// API Subscriptions queries
export async function getUserSubscriptions(userId: string) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(apiSubscriptions).where(eq(apiSubscriptions.userId, userId));
}

export async function getSubscription(userId: string, apiId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(apiSubscriptions)
    .where(and(eq(apiSubscriptions.userId, userId), eq(apiSubscriptions.apiId, apiId)))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createSubscription(subscription: InsertApiSubscription) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(apiSubscriptions).values(subscription);
}

export async function cancelSubscription(userId: string, apiId: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(apiSubscriptions)
    .set({ status: "cancelled" })
    .where(and(eq(apiSubscriptions.userId, userId), eq(apiSubscriptions.apiId, apiId)));
}

// API Requests queries
export async function createApiRequest(request: InsertApiRequest) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(apiRequests).values(request);
}

export async function getUserApiRequests(userId: string) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(apiRequests).where(eq(apiRequests.userId, userId)).orderBy(desc(apiRequests.createdAt));
}

