import AnimeList from "@/components/anime/AnimeList";
import { api } from "@/utils/api";

export default function Page() {
  const response = api.anime.recommended.useQuery({ limit: 10 });

  return (
    <div className="mx-auto mt-4 w-10/12">
      {response.data && <AnimeList animeList={response.data} />}
    </div>
  );
}
