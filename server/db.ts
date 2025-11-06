import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { apis, type InsertApi } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;
let _client: ReturnType<typeof postgres> | null = null;

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

export async function getUserByEmail(_email: string) {
  return undefined;
}

export async function updateUserLastSignedIn(_userId: string) {
  return;
}

export async function getAllCategories() {
  return [] as Array<{ id: string; name: string }>;
}

export async function getCategoryById(_id: string) {
  return undefined as unknown as { id: string; name: string } | undefined;
}

export async function getUserSubscriptions(_userId: string) {
  return [] as Array<unknown>;
}

export async function getSubscription(_userId: string, _apiId: string) {
  return undefined as unknown as { id: string } | undefined;
}

export async function createSubscription(_sub: unknown) {
  return;
}

