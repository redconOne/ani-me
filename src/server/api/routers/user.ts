import { type ListResponse } from "@/types/anime";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  getList: protectedProcedure
    .input(z.object({ type: z.string() }))
    .query(async ({ ctx, input }) => {
      const id = ctx.session.user.id;
      const { type } = input;

      if (type === "wishlist") {
        const dbResponse = (await ctx.db.user.findUnique({
          where: { id },
          include: { wishlist: true },
        })) as ListResponse;

        return dbResponse;
      }
      const dbResponse = (await ctx.db.user.findUnique({
        where: { id },
        include: { watchlist: true },
      })) as ListResponse;

      return dbResponse;
    }),

  toggleWishlist: protectedProcedure
    .input(
      z.object({
        mal_id: z.number(),
        default_title: z.string(),
        english_title: z.string(),
        trailer: z.string(),
        image: z.string(),
        type: z.string(),
        status: z.string(),
        synopsis: z.string(),
        rating: z.string(),
        score: z.number(),
        rank: z.number(),
        add: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const {
        mal_id,
        default_title,
        english_title,
        trailer,
        image,
        type,
        status,
        synopsis,
        rating,
        score,
        rank,
        add,
      } = input;
      const id = ctx.session.user.id;
      await ctx.db.anime.upsert({
        where: { mal_id },
        create: {
          mal_id,
          default_title,
          english_title,
          trailer,
          image,
          type,
          status,
          rating,
          score,
          rank,
          synopsis,
        },
        update: {
          mal_id,
          default_title,
          english_title,
          trailer,
          image,
          type,
          status,
          rating,
          score,
          rank,
          synopsis,
        },
      });

      if (add)
        await ctx.db.user.update({
          where: { id },
          data: {
            wishlist: {
              connect: [{ mal_id }],
            },
          },
        });
      else
        await ctx.db.user.update({
          where: { id },
          data: {
            wishlist: {
              disconnect: [{ mal_id }],
            },
          },
        });
    }),
});
