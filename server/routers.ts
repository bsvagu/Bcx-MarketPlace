import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { nanoid } from "nanoid";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => {
      console.log("[Auth] me query called, user:", opts.ctx.user ? `${opts.ctx.user.name} (${opts.ctx.user.id})` : "null");
      return opts.ctx.user;
    }),
    login: publicProcedure
      .input(z.object({ email: z.string().email(), password: z.string() }))
      .mutation(async ({ input, ctx }) => {
        const user = await db.getUserByEmail(input.email);
        
        if (!user || user.password !== input.password) {
          throw new Error("Invalid email or password");
        }

        // Update last signed in
        await db.updateUserLastSignedIn(user.id);

        // Return user data for localStorage
        const userData = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };

        return { success: true, user: userData };
      }),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  categories: router({
    list: publicProcedure.query(async () => {
      return await db.getAllCategories();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        return await db.getCategoryById(input.id);
      }),
  }),

  apis: router({
    list: publicProcedure.query(async () => {
      return await db.getAllApis();
    }),
    featured: publicProcedure.query(async () => {
      return await db.getFeaturedApis();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        return await db.getApiById(input.id);
      }),
    getByCategory: publicProcedure
      .input(z.object({ categoryId: z.string() }))
      .query(async ({ input }) => {
        return await db.getApisByCategory(input.categoryId);
      }),
  }),

  subscriptions: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserSubscriptions(ctx.user.id);
    }),
    mySubscriptions: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserSubscriptions(ctx.user.id);
    }),
    subscribe: protectedProcedure
      .input(z.object({ apiId: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const existing = await db.getSubscription(ctx.user.id, input.apiId);
        if (existing) {
          throw new Error("Already subscribed to this API");
        }
        
        const apiKey = `bcx_${nanoid(32)}`;
        await db.createSubscription({
          id: nanoid(),
          userId: ctx.user.id,
          apiId: input.apiId,
          apiKey,
          status: "active",
        });
        
        return { success: true, apiKey };
      }),
    checkSubscription: protectedProcedure
      .input(z.object({ apiId: z.string() }))
      .query(async ({ ctx, input }) => {
        const subscription = await db.getSubscription(ctx.user.id, input.apiId);
        return { subscribed: !!subscription, subscription };
      }),
  }),
});

export type AppRouter = typeof appRouter;

