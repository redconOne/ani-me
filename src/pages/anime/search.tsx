import Search from "@/components/anime/Search";
import AnimeList from "@/components/anime/AnimeList";
import { type Anime } from "@/types/anime";
import { api } from "@/utils/api";
import { useState, useEffect } from "react";

export default function Page() {
  const [animeList, setAnimeList] = useState<Anime[] | undefined>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const response = api.anime.search.useQuery({
    name: searchTerm,
    sfw: false,
  });
  const handleSearch = async (name: string) => setSearchTerm(name);

  useEffect(() => {
    setAnimeList(response.data);
  }, [response.data]);

  return (
    <div className="mx-auto w-10/12">
      <Search search={handleSearch} />
      {animeList?.length ? <AnimeList animeList={animeList} /> : <div></div>}
    </div>
  );
}
