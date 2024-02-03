import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { type Anime, type SearchResponse } from "@/types/anime";
import { z } from "zod";

export const animeRouter = createTRPCRouter({
  search: protectedProcedure
    .input(z.object({ name: z.string(), sfw: z.boolean() }))
    .query(async ({ input }) => {
      const response: Anime[] = [];
      const { name, sfw } = input;
      if (!name) return response;
      const url = `${process.env.API_URL}anime?q=${name}&sfw=${sfw}`;
      const apiResponse = await fetch(url);

      if (!apiResponse.ok)
        throw new Error(
          `Failed to fetch data from API. Status: ${apiResponse.status}`,
        );

      const apiResults = (await apiResponse.json()) as SearchResponse;

      for (const item of apiResults.data) {
        const anime: Anime = {
          mal_id: item.mal_id,
          default_title: "",
          english_title: "",
          trailer: item.trailer.url || "",
          type: item.type ?? "",
          image: item.images.jpg.image_url || "",
          status: item.status || "",
          rating: item.rating || "",
          score: item.score || 0,
          rank: item.rank || 0,
          synopsis: item.synopsis || "No Synopsis Available",
        };

        for (const obj of item.titles) {
          if (obj.type === "Default" || !anime.default_title)
            anime.default_title = obj.title;
          if (obj.type === "English") anime.english_title = obj.title;
        }

        response.push(anime);
      }

      return response;
    }),
});
