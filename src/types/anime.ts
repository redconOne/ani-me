export type Anime = {
  mal_id: number;
  default_title: string;
  english_title: string;
  trailer: string;
  image: string;
  type: string;
  status: string;
  synopsis: string;
  rating: string;
  score: number;
  rank: number;
};

export type SearchResponse = {
  data: [
    {
      mal_id: number;
      titles: [{ type: string; title: string }];
      trailer: { url: string };
      type: string;
      images: { jpg: { image_url: string } };
      status: string;
      rating: string;
      score: number;
      rank: number;
      synopsis: string;
    },
  ];
};
