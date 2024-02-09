import { postRouter } from "@/server/api/routers/post";
import { animeRouter } from "@/server/api/routers/anime";
import { userRouter } from "@/server/api/routers/user";
import { createTRPCRouter } from "@/server/api/trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  anime: animeRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
