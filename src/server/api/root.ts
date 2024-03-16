import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { markdownRouter } from "./routers/markdown";

export const appRouter = createTRPCRouter({
  markdown: markdownRouter,
});

export type AppRouter = typeof appRouter;

// server-side caller for the tRPC API.
export const createCaller = createCallerFactory(appRouter);
