import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { type Anime, type SearchResponse } from "@/types/anime";
import { z } from "zod";

const generateAnimeFromResponse = (arr: Anime[], animeList: SearchResponse) => {
  for (const item of animeList.data) {
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

    arr.push(anime);
  }
};

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

      const parsedResponse = (await apiResponse.json()) as SearchResponse;

      generateAnimeFromResponse(response, parsedResponse);

      return response;
    }),

  top: protectedProcedure
    .input(z.object({ limit: z.number() }))
    .query(async ({ input }) => {
      const response: Anime[] = [];
      const { limit } = input;
      const url = `${process.env.API_URL}top/anime?limit=${limit}`;
      const apiResponse = await fetch(url);

      if (!apiResponse.ok)
        throw new Error(
          `Failed to fetch data from API. Status: ${apiResponse.status}`,
        );

      const parsedResponse = (await apiResponse.json()) as SearchResponse;

      generateAnimeFromResponse(response, parsedResponse);

      return response;
    }),
});
