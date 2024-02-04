import AnimeList from "@/components/anime/AnimeList";
import { Button } from "@/components/ui/button";
import { api } from "@/utils/api";
import { useState, useEffect } from "react";
import { type Anime } from "@/types/anime";

export default function Page() {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const response = api.anime.random.useQuery();

  useEffect(() => {
    if (response.data)
      setAnimeList((prev) => [...prev, response.data[0]] as Anime[]);
  }, [response.data]);

  const generateRandom = async () => await response.refetch();

  return (
    <div className="mx-auto mt-4 w-10/12">
      <div className="items-cetner mx-auto flex w-full max-w-sm space-x-2 pb-2 pt-6">
        <Button className="mx-auto" onClick={generateRandom}>
          Find me a random anime!
        </Button>
      </div>
      {<AnimeList animeList={animeList} />}
    </div>
  );
}
